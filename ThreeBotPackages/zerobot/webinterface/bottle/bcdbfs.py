import json
import mimetypes
import traceback

from bottle import Bottle, abort, post, request, response, run
from bottle.ext.websocket import GeventWebSocketServer, websocket
from Jumpscale import j
from Jumpscale.servers.gedis_http.GedisHTTPFactory import enable_cors


# to check beaker session
webapp = Bottle()
# webapp = j.tools.oauth_proxy.get_session_middleware(webapp)


@app.route("/<url:re:.+>")
@enable_cors
def index(url):
    try:
        file = j.sal.bcdbfs.file_read("/" + url)
    except j.exceptions.NotFound:
        abort(404)
    response.headers["Content-Type"] = mimetypes.guess_type(url)[0]
    return file
