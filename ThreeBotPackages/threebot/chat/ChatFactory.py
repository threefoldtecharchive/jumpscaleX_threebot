import traceback
import uuid
from Jumpscale import j
from bottle import abort, response, request, Bottle, redirect
from jinja2 import Environment, FileSystemLoader, select_autoescape
from beaker.middleware import SessionMiddleware


OAUTH_SERVER = "https://oauth2.3bot.grid.tf/auth"


templates_path = j.sal.fs.joinPaths(j.sal.fs.getDirName(__file__), "templates")

env = Environment(loader=FileSystemLoader(templates_path), autoescape=select_autoescape(["html", "xml"]))

app = Bottle()

PROVIERS = ["github"]


def _get_domain():
    certs_dir = "/etc/resty-auto-ssl/letsencrypt/certs/"
    if j.sal.fs.exists(certs_dir):
        domains = list(map(j.sal.fs.getBaseName, j.sal.fs.listDirsInDir(certs_dir)))
        if domains:
            return f"https://{domains[0]}"
    return "https://localhost"


SERVER_DOMAIN = _get_domain()


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


def auth(fn):
    def _auth(*args, **kwargs):
        session = request.environ.get("beaker.session")
        if not session.get("username"):
            session["next-url"] = request.path
            session.save()
            redirect("/chat/login")
        return fn(*args, **kwargs)

    return _auth


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


def _get_chatflows():
    gedis_client = j.clients.gedis.get(port=8901)
    chatflows = gedis_client.actors.chatbot.chatflows_list()
    return [chatflow.decode() for chatflow in chatflows]


@app.route("/chat/login")
def login():
    session = request.environ.get("beaker.session")
    session_uid = str(uuid.uuid4())
    session["uid"] = session_uid
    session.save()
    query_params = f"uid={session_uid}&redirect_url={SERVER_DOMAIN}/chat/authorize"
    return env.get_template("chat/login.html").render(oauth_server=OAUTH_SERVER, query=query_params, providers=PROVIERS)


@app.route("/chat/authorize")
def chat_authorize():
    data = request.query
    session = request.environ.get("beaker.session")
    if data.get("uid") and data["uid"] == session.get("uid"):
        session["username"] = data["username"]
        session.save()
        next_url = session.get("next-url", "/chat")
        redirect(next_url)
    else:
        response.status = 401
        error = f"Couldn't authorize user"
        return env.get_template("chat/error.html").render(error=error)


@app.route("/chat")
@auth
def home_handler():
    chatflows = _get_chatflows()
    data = [(chatflow, chatflow.capitalize().replace("_", " ")) for chatflow in chatflows]
    return env.get_template("chat/home.html").render(chatflows=data)


@app.route("/chat/session/<topic>", method="get")
@enable_cors
@auth
def topic_handler(topic):
    if topic not in _get_chatflows():
        response.status = 404
        error = f"Specified chatflow {topic} is not registered on the system"
        return env.get_template("chat/error.html").render(error=error)
    ws_url = get_ws_url()
    return env.get_template("chat/index.html").render(topic=topic, url=ws_url)


session_opts = {"session.type": "file", "session.data_dir": "./data", "session.auto": True}
app = SessionMiddleware(app, session_opts)


class ChatFactory(j.baseclasses.threebot_factory):
    __jslocation__ = "j.threebot.package.chat"

    def get_app(self):
        return app

    def install(self):
        j.builders.runtimes.python3.pip_package_install("beaker")
