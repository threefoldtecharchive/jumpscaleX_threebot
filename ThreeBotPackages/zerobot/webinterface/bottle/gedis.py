import json
import mimetypes
import traceback

from bottle import Bottle, abort, post, request, response, run
from bottle.ext.websocket import GeventWebSocketServer, websocket
from Jumpscale import j
from Jumpscale.servers.gedis_http.GedisHTTPFactory import enable_cors
from Jumpscale.servers.gedis.UserSession import UserSession


GEDIS_PORT = 8901
from .rooter import app

#######################################
###### GEDIS WEBSOCKET ROUTES #########
#######################################
# @app.route("/gedis/websocket", apply=[websocket])
# def gedis_websocket(ws):
#     # TODO: getting a gedis client should happen only once
#     client_gedis = j.clients.gedis.get("main", port=GEDIS_PORT)
#     while True:
#         message = ws.receive()
#         if message is not None:
#             data = json.loads(message)
#             commands = data["command"].split(".")
#             if data["command"].casefold() == "system.ping":
#                 ws.send(j.data.serializers.json.dumps(client_gedis.ping()))
#                 return
#             cl = getattr(client_gedis.actors, commands[0])

#             for attr in commands[1:]:
#                 cl = getattr(cl, attr)

#             args = data.get("args", {})
#             response = cl(**args)
#             if isinstance(response, dict):
#                 ws.send(j.data.serializers.json.dumps(response))
#             elif hasattr(response, "_json"):
#                 ws.send(j.data.serializers.json.dumps(response._ddict_hr))
#             elif isinstance(response, bytes):
#                 ws.send(response.decode())
#             elif response is None:
#                 ws.send("")
#             else:
#                 ws.send(response)
#         else:
#             break


#######################################
######## GEDIS HTTP ROUTES ############
#######################################
# def get_actor(client, name, retry=True):
#     """try to get an actor from a gedis client
#
#     will reload the client and try again if the actor is not available
#
#     :param client: gedis client
#     :type client: GedisClient
#     :param name: actor name
#     :type name: str
#     :param retry: if set, will try to reload if actor is not found
#     :type retyr: bool
#     """
#     actor = getattr(client.actors, name, None)
#     if not actor and retry:
#         client.reload()
#         return get_actor(client, name, retry=False)
#     return actor


@app.route("/<threebot_name>/<package_name>/actors/<name>/<cmd>", method=["post", "get", "options"])
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

    user_session = UserSession()
    user_session.content_type = content_type
    user_session.response_type = content_type

    if "auth" in data:
        auth = data.pop("auth")
        tid, signature = auth.get("tid"), auth.get("signature")
        try:
            user_session.threebot_id, user_session.threebot_name = authenticate(tid, signature)
        except Exception as ex:
            response.status = 403
            result = {"error": "authentication failed"}
            if content_type == "json":
                result = j.data.serializers.json.dumps(result)
            else:  # msgpack
                result = j.data.serializers.msgpack.dumps(result)
            return result

    data["args"]["user_session"] = user_session
    data["args"]["from_gedis_http"] = True  #  needed for JumpscaleCore/core/BASECLASSES/Decorators.py:43
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


def authenticate(tid, signature):
    """
    authenticate the client sending the request

    the handshake flow is very simple
    1. client opens a connection
    2. client sign it's threebot id and execute the command 'auth'
        with the threebot_id and the signature as argument
    3. server receives the threebot_id, fetch the public key associated with the threebot id
        from the phonebook and verify the signature
    4. if signature is verified, answer 'OK' to the client else raise an exception
    5. save threebot id and name in user_session and pass user_session to the method called

    # TODO
    In the future the server must also authenticate to the client
    so both parties can be sure who they are talking to
    """
    tid = int(tid)

    threebot_me = j.tools.threebot.me.default
    payload = j.data.nacl.payload_build(tid)
    # If working on same machine no need to get a client to authenticate
    # otherwise, we'll have infinite loop
    if threebot_me.tid != tid:
        tclient = j.clients.threebot.client_get(threebot=tid)
        verification = tclient.verify_from_threebot(payload, signature)

        # if we get here we know that the user has been authenticated properly
        return tclient.tid, tclient.name
    else:
        # can't reuse verification methods in 3 bot client, otherwise we gonna go into infinite loop
        # so we verify directly using nacl
        if not threebot_me.nacl.verify(data=payload, signature=binascii.unhexlify(signature)):
            raise j.exceptions.Permission("failed to verify signature during handshake")

        return threebot_me.tid, threebot_me.tname


@app.route("/bcdbfs/<url:re:.+>")
@enable_cors
def index(url):
    try:
        file = j.sal.bcdbfs.file_read("/" + url)
    except j.exceptions.NotFound:
        abort(404)
    response.headers["Content-Type"] = mimetypes.guess_type(url)[0]
    return file
