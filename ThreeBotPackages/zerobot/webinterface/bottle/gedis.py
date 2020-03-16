import json
import traceback

from Jumpscale import j

from .rooter import app, enable_cors, response, request

GEDIS_PORT = 8901


@app.route("/<threebot_name>/<package_name>/actors/<name>/<cmd>", method=["post", "get", "options"])
@app.route("/gedis/http/<name>/<cmd>", method=["post", "get", "options"])
@enable_cors
def gedis_http(name, cmd, threebot_name=None, package_name=None):
    if not threebot_name:
        response.status = 400
        return f"Need to specify threebotname in command {cmd} for gedis_http"
    if not package_name:
        response.status = 400
        return f"Need to specify package_name in command {cmd} for gedis_http"
    actor = j.threebot.actor_get(author3bot=threebot_name, package_name=package_name, actor_name=name)

    if not actor:
        response.status = 404
        return f"Actor {name} does not exist"
    command = getattr(actor, cmd, None)
    if not command:
        response.status = 400
        return f"Actor {name} does not have command {cmd}"

    if request.method == "GET":
        params = dict(request.params)
        data = {"args": params}
    else:
        data = request.json or {"args": {}}
    content_type = data.get("content_type", "json")
    if content_type not in ["json", "msgpack"]:
        response.status = 400
        return f"content_type needs to be either json or msgpack"
    response.headers["Content-Type"] = f"application/{content_type}"
    try:

        result = command(**data["args"])
    except Exception as ex:
        err = "".join(traceback.format_exception(etype=type(ex), value=ex, tb=ex.__traceback__))
        response.status = 400
        result = {"error": err}
        if content_type == "json":
            result = j.data.serializers.json.dumps(result)
        else:  # msgpack
            result = j.data.serializers.msgpack.dumps(result)
    else:
        if content_type:
            result = getattr(result, f"_{content_type}", result)
    return result
