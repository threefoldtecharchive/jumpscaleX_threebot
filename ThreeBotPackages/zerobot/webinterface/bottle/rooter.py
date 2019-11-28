from bottle import Bottle, abort, post, request, response, run
from Jumpscale import j
from jinja2 import Environment, FileSystemLoader, select_autoescape

# to check beaker session
app = Bottle()
# app = j.tools.oauth_proxy.get_session_middleware(app)

templates_path = j.sal.fs.joinPaths(j.sal.fs.getDirName(__file__), "..", "templates")
env = Environment(loader=FileSystemLoader(templates_path), autoescape=select_autoescape(["html", "xml"]))


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


from .chat import *
from .gedis import *
from .wiki import *
