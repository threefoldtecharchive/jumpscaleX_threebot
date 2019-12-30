## Central Oauth2 server

The central oauth2 server is responsable for handling all the authentication of the threebots

### Create your own oauth server
to be able to host a central oauth server on your threebot you need to do the following step.
- Configuare the oauth2 provider such as (Google, Facebook, Github) using ```oauth_provider``` client
```python
# configure github
cl = j.clients.oauth_provider.get(
    name='github',
    client_id='<client id>',
    client_secret= '<client secret>',
    access_token_url= 'https://github.com/login/oauth/access_token',
    authorize_url= 'https://github.com/login/oauth/authorize',
    redirect_url= '<your threebot url>/oauth/callback',
    user_info_url= 'https://api.github.com/user',
    scope= '',
    user_info_fields=["email", "login"]
)
cl.save()
```

- Configure the oauth proxy using ```oauth_proxy``` client
```python
cl = j.clients.oauth_proxy.get(name='main')
cl.url = "<your threebot url>/oauth"
# add all the configured providers in our case only github provider
cl.provider_add("github")
cl.save()
```

- Create an Oauth2 application on the provider website and configure the callback url to your threebot oauth callback ```<your threebot url>/oauth/callback>```

Now you are ready to add the ```oauth2``` package to your threebot and start to serve the authentication requests from the other threebots

### Add middleware to the threebot package endpoints
- In order to protect your package endpoints you can easily choose any central oauth server to use, you need just to configure the ```oauth_proxy``` client in your threebot
```python
cl = j.clients.oauth_proxy.get(
    name='main',
    url="<authorize url of the central oauth server>",
    verify_key="<oauth proxy public key>" # you can get it from <oauth2 proxy url>/oauth/key
    providers=["github"]
)
```
- Import the oauth_proxy lib and use its apis as follow:
```python
from Jumpscale import j
from bottle import Bottle, request, redirect, HTTPResponse

app = Bottle()
client = j.clients.oauth_proxy.get("main")
oauth_app = j.tools.oauth_proxy.get(app, client, "/test/login")


@app.route("/test")
@oauth_app.login_required
def hello():
    return HTTPResponse(status=200, body=str(oauth_app.session.get("user_info")))


@app.route("/test/login")
def login():
    provider = request.query.get("provider")
    if provider:
        return oauth_app.login(provider, "http://172.17.0.2/test/callback")
    return "<a href='/test/login?provider=github'>Github</a>"


@app.route("/test/callback")
def callback():
    user_info = oauth_app.callback()
    oauth_app.session["user_info"] = user_info
    return redirect(oauth_app.next_url)


app = oauth_app.app




```
