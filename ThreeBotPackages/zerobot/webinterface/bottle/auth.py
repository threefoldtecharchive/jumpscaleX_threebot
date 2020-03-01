from Jumpscale import j

from .rooter import app, abort, env, redirect, request

client = j.clients.oauth_proxy.get("main")
oauth_app = j.tools.oauth_proxy.get(app, client, "/auth/login")
bot_app = j.tools.threebotlogin_proxy.get(app)
PROVIDERS = list(client.providers_list())


@app.route("/auth/login")
def login():
    provider = request.query.get("provider")

    if provider:
        if provider == "3bot":
            return bot_app.login(request.headers["HOST"], "/auth/3bot_callback")

        redirect_url = f"https://{request.headers['HOST']}/auth/oauth_callback"
        return oauth_app.login(provider, redirect_url=redirect_url)

    return env.get_template("auth/login.html").render(providers=PROVIDERS)


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


@app.route("/auth/authenticated")
def is_authenticated():
    session = request.environ.get("beaker.session", {})
    if session.get("authorized"):
        return
    return abort(401)
