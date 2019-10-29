from Jumpscale import j
import requests
from urllib.parse import urlencode
from bottle import Bottle, request, redirect, run, abort

try:
    from beaker.middleware import SessionMiddleware
except (ModuleNotFoundError, ImportError):
    j.builders.runtimes.python3.pip_package_install("beaker")
    from beaker.middleware import SessionMiddleware


class Oauth2Provider(object):
    def __init__(
        self,
        name,
        client_id,
        client_secret,
        access_token_url,
        authorize_url,
        redirect_url,
        scope,
        user_info_url,
        login_field,
    ):
        self.name = name
        self.client_id = client_id
        self.client_secret = client_secret
        self.access_token_url = access_token_url
        self.authorize_url = authorize_url
        self.redirect_url = redirect_url
        self.scope = scope
        self.user_info_url = user_info_url
        self.login_field = login_field
        self.session = requests.Session()

    def authorization_url(self, uid):
        params = dict(response_type="code", client_id=self.client_id, redirect_url=self.redirect_url, state=uid)

        if self.scope:
            params["scope"] = self.scope

        url = "{authorize_url}?{params}".format(authorize_url=self.authorize_url, params=urlencode(params))
        return url

    def get_access_token(self, code, state):
        params = dict(
            grant_type="authorization_code",
            client_id=self.client_id,
            client_secret=self.client_secret,
            redirect_url=self.redirect_url,
            code=code,
            state=state,
        )
        headers = {"Accept": "application/json"}
        response = requests.post(self.access_token_url, params=params, headers=headers)
        response.raise_for_status()
        return response.json()

    def authorize(self, code, state):
        access_token_data = self.get_access_token(code, state)
        if "access_token" not in access_token_data:
            return abort(403, "User is not authorized")

        access_token = access_token_data.get("access_token")
        self.session.headers["Authorization"] = f"bearer {access_token}"

        response = self.session.get(self.user_info_url)
        response.raise_for_status()
        return response.json()[self.login_field]


app = Bottle()
providers = j.clients.site_providers.get("oauth2.3bot.grid.tf").providers
providers_objects = {}
for provider_name, data in providers.items():
    providers_objects[provider_name] = Oauth2Provider(provider_name, **data)


@app.route("/auth/authorize/<provider>")
def authorize_handler(provider):
    provider = providers_objects.get(provider)
    if not provider:
        return abort(404, "Not found")

    uid = request.query.get("uid")
    redirect_url = request.query.get("redirect_url")
    session = request.environ.get("beaker.session")
    session["uid"] = uid
    session["redirect_url"] = redirect_url
    return redirect(provider.authorization_url(uid))


@app.route("/auth/callback/<provider>")
def callback_handler(provider):
    provider = providers_objects.get(provider)
    if not provider:
        return abort(404, "Not found")

    session = request.environ.get("beaker.session")
    uid = session.get("uid")
    redirect_url = session.get("redirect_url")
    code = request.query.get("code")
    state = request.query.get("state")

    if state != uid:
        return abort(400, "Invalid state")

    username = provider.authorize(code, state)
    params = urlencode({"uid": uid, "username": username})
    rurl = "{redirect_url}?{params}".format(redirect_url=redirect_url, params=params)
    return redirect(rurl)


session_opts = {"session.type": "file", "session.data_dir": "./data", "session.auto": True}
app = SessionMiddleware(app, session_opts)


class Oauth2Factory(j.baseclasses.threebot_factory):
    __jslocation__ = "j.threebot.package.oauth2"

    def get_app(self):
        return app
