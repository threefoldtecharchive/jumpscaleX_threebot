from bottle import Bottle, abort, post, request, response, run, redirect


try:
    from beaker.middleware import SessionMiddleware
except (ModuleNotFoundError, ImportError):
    j.builders.runtimes.python3.pip_package_install("beaker")
    from beaker.middleware import SessionMiddleware

from jinja2 import Environment, FileSystemLoader, select_autoescape


from Jumpscale import j
from Jumpscale.servers.gedis_http.GedisHTTPFactory import enable_cors

app = Bottle()

# to check beaker session
session_opts = {"session.type": "file", "session.data_dir": "./data", "session.auto": True}
app_with_session = SessionMiddleware(app, session_opts)

templates_path = j.sal.fs.joinPaths(j.sal.fs.getDirName(__file__), "..", "templates")
env = Environment(loader=FileSystemLoader(templates_path), autoescape=select_autoescape(["html", "xml"]))

PACKAGE_BASE_URL = "/<threebot_name>/<package_name>"


def get_package(threebot_name, package_name):
    name = f"{threebot_name}.{package_name}".strip()

    if not j.tools.threebot_packages.exists(name):
        # try with lower case name
        name = name.lower()

    try:
        return j.tools.threebot_packages.get(name=name)
    except j.exceptions.Base:
        # loading will fail if package directory is not found
        # cannot have a package object without an actual package
        # with e.g. package.toml...
        raise j.exceptions.NotFound


def package_route(handler):
    """a decorator for package route

    it can decorate handlers which takes threebot_name and package_name
    then, pass the package, or abort with 404 if not found

    :param handler: handler function
    :type handler: function
    :return: decorated function
    :rtype: function
    """

    def inner(*args, **kwargs):
        threebot_name = kwargs.pop("threebot_name")
        package_name = kwargs.pop("package_name")

        try:
            kwargs["package"] = get_package(threebot_name, package_name)
        except j.exceptions.NotFound as ex:
            return abort(404, f"could not find package {package_name} of {threebot_name}")

        try:
            return handler(*args, **kwargs)
        except j.exceptions.Base as ex:
            return abort(400, ex.message)

    return inner


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
