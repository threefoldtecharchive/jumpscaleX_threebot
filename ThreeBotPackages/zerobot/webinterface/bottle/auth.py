from Jumpscale import j

from .rooter import app, abort, env, redirect, response, request

LOGIN_URL = "/auth/login"

client = j.clients.oauth_proxy.get("main")
oauth_app = j.tools.oauth_proxy.get(app, client, LOGIN_URL)
bot_app = j.tools.threebotlogin_proxy.get(app, LOGIN_URL)
PROVIDERS = list(client.providers_list())


@app.route(LOGIN_URL)
def login():
    provider = request.query.get("provider")
    next_url = request.query.get("next_url") or bot_app.session.get("next_url")
    host = request.get_header("host")

    if provider:
        if provider == "3bot":
            if next_url:
                bot_app.session["next_url"] = next_url
            return bot_app.login(host, "/auth/3bot_callback")

        redirect_url = f"https://{host}/auth/oauth_callback"
        return oauth_app.login(provider, redirect_url=redirect_url)

    return env.get_template("auth/login.html").render(providers=PROVIDERS, next_url=next_url)


@app.route("/auth/3bot_callback")
def threebot_callback():
    bot_app.callback()


@app.route("/auth/oauth_callback")
def oauth_callback():
    user_info = oauth_app.callback()
    oauth_app.session["email"] = user_info["email"]
    return redirect(oauth_app.next_url)


@app.route("/auth/logout")
def logout():
    session = request.environ.get("beaker.session", {})
    try:
        session.invalidate()
    except AttributeError:
        pass

    redirect(request.query.get("next_url", "/"))


def is_admin(tname):
    threebot_me = j.tools.threebot.me.default
    return threebot_me.tname == tname or tname in threebot_me.admins


@app.route("/auth/authenticated")
def is_authenticated():
    session = request.environ.get("beaker.session", {})
    if session.get("authorized"):
        tname = session["username"]
        if is_admin(tname):
            temail = session["email"]
            response.content_type = "application/json"
            return j.data.serializers.json.dumps({"username": tname, "email": temail})
    return abort(403)


def admin_only(handler):
    """a decorator to only allow admin access to specific routes

    :param handler: handler function
    :type handler: function
    :return: function or abort with 405 (forbidden)
    :rtype: function
    """

    def inner(*args, **kwargs):
        if j.tools.threebot.with_threebotconnect:
            username = request.environ.get("beaker.session", {}).get("username")
            if not username or not is_admin(username):
                return abort(403)
        return handler(*args, **kwargs)

    return inner
