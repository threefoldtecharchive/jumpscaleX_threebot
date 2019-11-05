import traceback
from Jumpscale import j

from bottle import abort, response, request, Bottle, redirect
from jinja2 import Environment, FileSystemLoader, select_autoescape

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


def _get_chatflows():
    gedis_client = j.clients.gedis.get(port=8901)
    chatflows = gedis_client.actors.chatbot.chatflows_list()
    return [chatflow.decode() for chatflow in chatflows]


@app.route("/chat/login")
def login():
    provider = request.query.get("provider")
    if provider:
        if provider == "3bot":
            return bot_app.login(request.headers["HOST"], "/chat/3botlogin")

        redirect_url = f"https://{request.headers['HOST']}/chat/authorize"
        return oauth_app.login(provider, redirect_url=redirect_url)

    return env.get_template("chat/login.html").render(providers=PROVIDERS)


@app.route("/chat/3botlogin")
def chat_botcallback():
    bot_app.callback()


@app.route("/chat/authorize")
def chat_authorize():
    user_info = oauth_app.callback()
    oauth_app.session["email"] = user_info["email"]
    return redirect(oauth_app.next_url)


@app.route("/chat")
@oauth_app.login_required
def home_handler():
    session = oauth_app.session
    chatflows = _get_chatflows()
    data = [(chatflow, chatflow.capitalize().replace("_", " ")) for chatflow in chatflows]
    return env.get_template("chat/home.html").render(chatflows=data, email=session["email"])


@app.route("/chat/session/<topic>", method="get")
@enable_cors
@oauth_app.login_required
def topic_handler(topic):
    session = oauth_app.session
    query = request.urlparts.query
    if query:
        query = query.split("&")
        query_params = {}
        for q in query:
            k, v = q.split("=")
            query_params[k] = v

        session["kwargs"] = query_params
    else:
        session["kwargs"] = {}
    if topic not in _get_chatflows():
        response.status = 404
        error = f"Specified chatflow {topic} is not registered on the system"
        return env.get_template("chat/error.html").render(error=error, email=session["email"])
    ws_url = get_ws_url()
    return env.get_template("chat/index.html").render(
        topic=topic, url=ws_url, email=session["email"], qs=session["kwargs"], username=session.get("username")
    )


app = oauth_app.app


class ChatFactory(j.baseclasses.threebot_factory):
    __jslocation__ = "j.threebot.package.chat"

    def get_app(self):
        return app
