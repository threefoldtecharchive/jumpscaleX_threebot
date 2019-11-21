import traceback
from Jumpscale import j

from bottle import abort, response, request, Bottle, redirect
from jinja2 import Environment, FileSystemLoader, select_autoescape
from Jumpscale.servers.gedis_http.GedisHTTPFactory import enable_cors

try:
    from beaker.middleware import SessionMiddleware
except (ModuleNotFoundError, ImportError):
    j.builders.runtimes.python3.pip_package_install("beaker")
    from beaker.middleware import SessionMiddleware


templates_path = j.sal.fs.joinPaths(j.sal.fs.getDirName(__file__), "templates")
env = Environment(loader=FileSystemLoader(templates_path), autoescape=select_autoescape(["html", "xml"]))

app = Bottle()
client = j.clients.oauth_proxy.get("main")
oauth_app = j.tools.oauth_proxy.get(app, client, "/chat/login")
bot_app = j.tools.threebotlogin_proxy.get(app)

PROVIDERS = list(client.providers_list())
OAUTH_SERVER = ""


def auth(fn):
    def _auth(*args, **kwargs):
        session = request.environ.get("beaker.session")
        session["username"] = "Guest"
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
    session_uid = j.data.idgenerator.generateGUID()
    session["uid"] = session_uid
    server_domain = "https://" + request.headers["HOST"]
    query_params = f"uid={session_uid}&redirect_url={server_domain}/chat/authorize"
    return env.get_template("chat/login.html").render(
        oauth_server=OAUTH_SERVER, query=query_params, providers=PROVIDERS
    )


@app.route("/chat/3botlogin")
def chat_botcallback():
    bot_app.callback()


@app.route("/chat/authorize")
def chat_authorize():
    data = request.query
    session = request.environ.get("beaker.session")
    if data.get("uid") and data["uid"] == session.get("uid"):
        session["username"] = data["username"]
        next_url = session.get("next-url", "/chat")
        redirect(next_url)
    else:
        response.status = 401
        error = f"Couldn't authorize user"
        return env.get_template("chat/error.html").render(error=error)


@app.route("/chat")
@auth
def home_handler():
    session = request.environ.get("beaker.session")
    chatflows = _get_chatflows()
    data = [(chatflow, chatflow.capitalize().replace("_", " ")) for chatflow in chatflows]
    return env.get_template("chat/home.html").render(chatflows=data, username=session["username"])


@app.route("/chat/session/<topic>", method="get")
@enable_cors
def topic_handler(topic):
    session = request.environ.get("beaker.session")
    query = request.urlparts.query
    if query:
        query = query.split("&")
        query_params = {}
        for q in query:
            try:
                k, v = q.split("=")
                query_params[k] = v
            except:
                query_params["referral"] = q

        session["kwargs"] = query_params
    else:
        session["kwargs"] = {}
    if topic not in _get_chatflows():
        response.status = 404
        error = f"Specified chatflow {topic} is not registered on the system"
        return env.get_template("chat/error.html").render(error=error, email=session["email"])
    ws_url = get_ws_url()
    return env.get_template("chat/index.html").render(
        topic=topic, url=ws_url, email=session.get("email", ""), qs=session["kwargs"], username=session.get("username")
    )


session_opts = {"session.type": "file", "session.data_dir": "./data", "session.auto": True}
app = SessionMiddleware(app, session_opts)


class ChatFactory(j.baseclasses.threebot_factory):
    __jslocation__ = "j.threebot.package.chat"

    def get_app(self):
        return app
