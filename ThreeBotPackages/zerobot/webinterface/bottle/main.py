import json
import mimetypes
import traceback

from bottle import Bottle, abort, post, request, response, run
from bottle.ext.websocket import GeventWebSocketServer, websocket
from Jumpscale import j
from Jumpscale.servers.gedis_http.GedisHTTPFactory import enable_cors


# to check beaker session
webapp = Bottle()
# webapp = j.tools.oauth_proxy.get_session_middleware(app)


@app.route("/app/<url:re:.+>")
def index(url):
    return f"<p>app {url}.</p>"


@app.route("/<url:re:.+>")
def index(url):
    return f"<p>all {url}.</p>"
    # j.shell()
