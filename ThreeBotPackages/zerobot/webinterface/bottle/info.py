from bottle import Bottle, abort, post, request, response, run
from Jumpscale import j
from Jumpscale.servers.gedis_http.GedisHTTPFactory import enable_cors
from .rooter import env, app


@app.route("/<author_name>/<package_name>/info", method=["get"])
def get_all_info(author_name, package_name):
    package = j.threebot.package_get(author_name, package_name)
    return env.get_template("info/info.html").render(package=package)

