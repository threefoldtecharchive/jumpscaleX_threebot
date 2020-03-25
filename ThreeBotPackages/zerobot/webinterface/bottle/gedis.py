import json
import traceback

from Jumpscale import j

from .rooter import app, enable_cors, response, request

GEDIS_PORT = 8901


def _log(msg, level=20):
    j.core.tools.log(msg=msg, level=level, context="bottle", replace=True)


def format_err(ex):
    return "".join(traceback.format_exception(etype=type(ex), value=ex, tb=ex.__traceback__))


@app.route("/<threebot_name>/<package_name>/actors/<name>/<cmd>", method=["post", "get", "options"])
@app.route("/gedis/http/<name>/<cmd>", method=["post", "get", "options"])
@enable_cors
def gedis_http(name, cmd, threebot_name=None, package_name=None):

    j.application.start("bottle_server")
    _log(f"Incoming Request name: {name}, cmd: {cmd}, threebot_name: {threebot_name}, package_name: {package_name}")

    if not threebot_name:
        response.status = 400
        _log(f"Need to specify threebotname in command {cmd} for gedis_http")

        return f"Need to specify threebotname in command {cmd} for gedis_http"
    if not package_name:
        response.status = 400
        _log(f"Need to specify package_name in command {cmd} for gedis_http")
        return f"Need to specify package_name in command {cmd} for gedis_http"

    actor = j.threebot.actor_get(author3bot=threebot_name, package_name=package_name, actor_name=name)

    if not actor:
        response.status = 404
        _log(f"Actor {name} does not exist")

        return f"Actor {name} does not exist"
    command = getattr(actor, cmd, None)
    if not command:
        response.status = 400

        _log(f"Actor {name} does not have command {cmd}")

        return f"Actor {name} does not have command {cmd}"

    if request.method == "GET":
        params = dict(request.params)
        data = {"args": params}
    else:
        default_args = {"args": {}}
        try:
            data = request.json or default_args
        except Exception as ex:
            response.status = 400
            _log(str(ex))
            return f"invalid request body"

    content_type = data.get("content_type", "json")
    if content_type not in ["json", "msgpack"]:
        response.status = 400
        _log(f"content_type needs to be either json or msgpack")
        return f"content_type needs to be either json or msgpack"
    response.headers["Content-Type"] = f"application/{content_type}"
    try:

        result = command(**data["args"])
    except Exception as ex:
        err = format_err(ex)
        response.status = 400
        result = {"error": err}
        _log(f"{err}")
        if content_type == "json":
            result = j.data.serializers.json.dumps(result)
        else:  # msgpack
            result = j.data.serializers.msgpack.dumps(result)
    else:
        if content_type:
            result = getattr(result, f"_{content_type}", result)
    j.application.reset_context()
    return result
