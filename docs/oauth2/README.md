## Central Oauth2 server

The central oauth2 server is responsable for handling all the authentication of the threebots 

### Create your own oauth server
to be able to host a central oauth server on your threebot you need to do the following step.
- Configuare the oauth2 provider such as (Google, Facebook, Github) using ```oauth_provider``` client 
```python
# configure github 
cl = j.clients.oauth_proxy.get(
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
cl.url = "<your threebot url>/oauth/authorize"
# add all the configured providers in our case only github provider
cl.provider_add("github")
cl.save()
```

- Create an Oauth2 application on the provider website and configure the callback url to your threebot oauth callback ```<your threebot url>/oauth/callback>```

Now you are ready to add the ```oauth2``` package to your threebot and start to serve the authentication requests from the other threebots

### Add middleware to the threebot package endpoints
- In order to protect your package endpoints you can easily choose any central oauth server to use, you need just to configure the ```oauth_proxy``` client in your threebot
```python
cl = j.clients.oauth_proxy.get(name='main', url="<authorize url of the central oauth server>", providers=["github"])
```
- Import the oauth_proxy lib and use its apis as follow:
```python
from Jumpscale import j
from bottle import Bottle, redirect, HTTPResponse

app = Bottle()
client = j.clients.oauth_proxy.get("main")

oauth_app = j.tools.oauth_proxy.get(
    app=app, client=client, login_endpoint="/test/login", redirect_endpoint="/test/callback"
)

@app.route("/test/login")
def index():
    return "<a href='/test/login/github'>Github</a>"

@app.route("/test/callback")
def callback():
    # here you can add the authorization logic
    userinfo = oauth_app.callback()  # get user info
    oauth_app.session["userinfo"] = userinfo  # save user info in the session
    oauth_app.authorize_user() # authorize this user
    return redirect(oauth_app.next_url) # redirect the user to the original url


@app.route("/test/login/<provider>")
def login(provider):
    return oauth_app.login(provider)

@app.route("/test")
@oauth_app.login_required
def hello():
    # this endpoint is protected by the middleware
    return HTTPResponse(status=200, body=str(oauth_app.session.get("userinfo")))


# this line is important to initialize the session object (should be in the end of the file after all router methods)
app = oauth_app.app


class TestFactory(j.baseclasses.threebot_factory):
    __jslocation__ = "j.threebot.package.test"

    def get_app(self):
        return app
```
