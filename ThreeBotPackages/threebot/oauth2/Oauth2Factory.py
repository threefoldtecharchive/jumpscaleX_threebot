from Jumpscale import j
from bottle import Bottle, request, response

app = Bottle()

client = j.clients.oauth_proxy.get("main")
oauth_app = j.tools.oauth_proxy.get(app, client)


@app.route("/oauth/authorize/<provider>")
def login(provider):
    uid = request.query.get("uid")
    redirect_url = request.query.get("redirect_url")
    return oauth_app.authorize(provider, uid, redirect_url)


@app.route("/oauth/callback")
def callback():
    return oauth_app.oauth_callback()


@app.route("/oauth/providers")
def providers():
    response.content_type = "application/json"
    return j.data.serializers.json.dumps(client.providers_list())


app = oauth_app.app


class Oauth2Factory(j.baseclasses.threebot_factory):
    __jslocation__ = "j.threebot.package.oauth2"

    def get_app(self):
        return app
