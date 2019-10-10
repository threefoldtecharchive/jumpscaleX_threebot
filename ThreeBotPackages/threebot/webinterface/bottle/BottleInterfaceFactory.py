from Jumpscale import j

from bottle import post, run, response, request, Bottle, abort
from bottle.ext.websocket import GeventWebSocketServer
from bottle.ext.websocket import websocket
import json
import mimetypes

GEDIS_PORT = 8901
client_gedis = None
app = Bottle()


def enable_cors(fn):
    def _enable_cors(*args, **kwargs):
        # set CORS headers
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, OPTIONS"
        response.headers[
            "Access-Control-Allow-Headers"
        ] = "Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token"

        if request.method != "OPTIONS":
            # actual request; reply with the actual response
            return fn(*args, **kwargs)

    return _enable_cors


#######################################
###### GEDIS WEBSOCKET ROUTES #########
#######################################
@app.route("/gedis/websocket", apply=[websocket])
def gedis_websocket(ws):
    # TODO: getting a gedis client should happen only once
    client_gedis = j.clients.gedis.get("main", port=GEDIS_PORT)
    while True:
        message = ws.receive()
        if message is not None:
            data = json.loads(message)
            commands = data["command"].split(".")
            if data["command"].casefold() == "system.ping":
                ws.send(j.data.serializers.json.dumps(client_gedis.ping()))
                return
            cl = getattr(client_gedis.actors, commands[0])

            for attr in commands[1:]:
                cl = getattr(cl, attr)

            args = data.get("args", {})
            response = cl(**args)
            if isinstance(response, dict):
                ws.send(j.data.serializers.json.dumps(response))
            elif hasattr(response, "_json"):
                ws.send(j.data.serializers.json.dumps(response._ddict_hr))
            elif isinstance(response, bytes):
                ws.send(response.decode())
            elif response is None:
                ws.send("")
            else:
                ws.send(response)
        else:
            break


#######################################
######## GEDIS HTTP ROUTES ############
#######################################
@app.route("/gedis/http/<name>/<cmd>", method="post")
@enable_cors
def gedis_http(name, cmd):
    client = j.clients.gedis.get(name="main_gedis_threebot", port=8901)
    actor = getattr(client.actors, name, None)
    if not actor:
        response.status = 404
        return f"Actor {name} does not exist"
    command = getattr(actor, cmd, None)
    if not command:
        response.status = 400
        return f"Actor {name} does not have command {cmd}"
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
        else: #msgpack
            result = j.data.serializers.msgpack.dumps(result)
    else:
        if content_type:
            result = getattr(result, f"_{content_type}", result)
    return result



#######################################
####### BCDBFS HTTP ROUTES ############
#######################################
@app.route("/bcdbfs/<url:re:.+>")
@enable_cors
def index(url):
    try:
        file = j.sal.bcdbfs.file_read("/" + url)
    except j.exceptions.NotFound:
        abort(404)
    response.headers["Content-Type"] = mimetypes.guess_type(url)[0]
    return file


class BottleInterfaceFactory(j.baseclasses.object, j.baseclasses.testtools):
    __jslocation__ = "j.servers.bottle_web"

    def get_app(self):
        return app

    def test(self):
        """
        kosmos `j.servers.bottle_web.test()'
        :return:
        """
        print("testing bcdbfs")
        j.sal.bcdbfs.file_write("/test", "hello world", create=True, append=False)
        assert j.clients.http.get("http://0.0.0.0:9999/bcdbfs/test") == "hello world"
        print("bcdbfs OK")

        print("testing gedis http")
        j.sal.bcdbfs.file_write("/test", "hello world", create=True)
        # TODO: check also the content
        assert (
            j.clients.http.post(
                "http://0.0.0.0:9999/gedis/http/echo/echo",
                data=b'{"args":{"message":"hello world"}}',
                headers={"Content-Type": "application/json"},
            )
            .read()
            .decode()
            == "hello world"
        )
        print("gedis http OK")
        print("testing gedis websocker")
        from websocket import WebSocket

        ws = WebSocket()
        ws.connect("ws://0.0.0.0:9999/gedis/websocket")

        assert ws.connected
        payload = """{
        "namespace": "default",
        "actor": "echo",
        "command": "echo.echo",
        "args": {"message": "hello world"},
        "headers": {"response_type":"json"}
        }"""
        ws.send(payload)
        assert ws.recv() == "hello world"
        print("gedis websocket OK")
