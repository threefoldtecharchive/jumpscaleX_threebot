try:
    from beaker.middleware import SessionMiddleware
    from wsgiproxy import HostProxy
except (ModuleNotFoundError, ImportError):
    j.builders.runtimes.python3.pip_package_install("beaker")
    from beaker.middleware import SessionMiddleware

from bottle import Bottle, abort, post, request, response, run, redirect
from jinja2 import Environment, FileSystemLoader, select_autoescape
from urllib.parse import urljoin

from Jumpscale import j


BASE_URL = "admin/codeserver/"
LOGIN_URL = urljoin(BASE_URL, "auth/login")
CALLBACK_URL = urljoin(BASE_URL, "auth/callback")
AUTH_URL = urljoin(BASE_URL, "auth/authorize")

main_app = Bottle()

# to check beaker session
session_opts = {"session.type": "file", "session.data_dir": "./data", "session.auto": True}
app_with_session = SessionMiddleware(main_app, session_opts)

templates_path = j.sal.fs.joinPaths(j.sal.fs.getDirName(__file__), "..", "templates")
env = Environment(loader=FileSystemLoader(templates_path), autoescape=select_autoescape(["html", "xml"]))


client = j.clients.oauth_proxy.get("codeserver")
oauth_app = j.tools.oauth_proxy.get(main_app, client, LOGIN_URL)
bot_app = j.tools.threebotlogin_proxy.get(main_app)
PROVIDERS = list(client.providers_list())


@main_app.route("/auth/login")
def login():
    provider = request.query.get("provider")
    if provider:
        if provider == "3bot":
            return bot_app.login(request.headers["HOST"], CALLBACK_URL)

        redirect_url = urljoin(f"https://{request.headers['HOST']}", AUTH_URL)
        return oauth_app.login(provider, redirect_url=redirect_url)

    return env.get_template("codeserver/login.html").render(providers=PROVIDERS, base_url=BASE_URL)


@main_app.route("/auth/callback")
def codeserver_botcallback():
    bot_app.callback()


@main_app.route("/auth/authorize")
def codeserver_authorize():
    user_info = oauth_app.callback()
    oauth_app.session["email"] = user_info["email"]
    return redirect(oauth_app.next_url)


@main_app.route("/auth")
def auth_codeserver():
    session = request.environ.get("beaker.session", {})
    if session.get("authorized"):
        return
    return abort(401)


@main_app.route("/logout")
def logout():
    session = request.environ.get("beaker.session", {})
    try:
        session.invalidate()
    except AttributeError:
        pass


@main_app.route("/", method=["get"])
@oauth_app.login_required
def codeserver_base():
    return redirect("/codeserver")


# mount main_app on BASE_URL
app = Bottle()
app.mount("/" + BASE_URL, main_app)
