import traceback
from Jumpscale import j
from bottle import abort, response, request, Bottle, redirect
from jinja2 import Environment, FileSystemLoader, select_autoescape

templates_path = j.sal.fs.joinPaths(j.sal.fs.getDirName(__file__), "templates")

env = Environment(loader=FileSystemLoader(templates_path), autoescape=select_autoescape(["html", "xml"]))

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


def get_ws_url():
    """get the proper ws url from the request"""
    url_parts = request.urlparts
    ws_scheme = "ws"
    if url_parts.scheme == "https" or request.headers["x-forwarded-proto"] == "https":
        ws_scheme = "wss"

    ws_url = f"{ws_scheme}://{url_parts.hostname}"
    if url_parts.port:
        ws_url = f"{ws_url}:{url_parts.port}"
    return ws_url


@app.route("/chat")
def home_handler():
    return env.get_template("chat/home.html").render()


@app.route("/chat/session/<topic>", method="get")
@enable_cors
def topic_handler(topic):
    ws_url = get_ws_url()

    return env.get_template("chat/index.html").render(topic=topic, url=ws_url)


class ChatFactory(j.baseclasses.threebot_factory):
    __jslocation__ = "j.threebot.package.chat"

    def get_app(self):
        return app
