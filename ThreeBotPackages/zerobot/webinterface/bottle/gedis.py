import json
import mimetypes
import traceback

from bottle import Bottle, abort, post, request, response, run
from bottle.ext.websocket import GeventWebSocketServer, websocket
from Jumpscale import j
from Jumpscale.servers.gedis_http.GedisHTTPFactory import enable_cors
from jinja2 import Environment, FileSystemLoader, select_autoescape

GEDIS_PORT = 8901
from .rooter import app

#######################################
###### GEDIS WEBSOCKET ROUTES #########
#######################################
@app.route("/gedis/websocket", apply=[websocket])
def gedis_websocket(ws):
    # TODO: getting a gedis client should happen only once
    client_gedis = j.clients.gedis.get("main", port=GEDIS_PORT)
    while True:
        message = ws.receive()
        if message is not None:
            data = json.loads(message)
            commands = data["command"].split(".")
            if data["command"].casefold() == "system.ping":
                ws.send(j.data.serializers.json.dumps(client_gedis.ping()))
                return
            cl = getattr(client_gedis.actors, commands[0])

            for attr in commands[1:]:
                cl = getattr(cl, attr)

            args = data.get("args", {})
            response = cl(**args)
            if isinstance(response, dict):
                ws.send(j.data.serializers.json.dumps(response))
            elif hasattr(response, "_json"):
                ws.send(j.data.serializers.json.dumps(response._ddict_hr))
            elif isinstance(response, bytes):
                ws.send(response.decode())
            elif response is None:
                ws.send("")
            else:
                ws.send(response)
        else:
            break


#######################################
######## GEDIS HTTP ROUTES ############
#######################################


def get_actor(client, name, retry=True):
    """try to get an actor from a gedis client

    will reload the client and try again if the actor is not available

    :param client: gedis client
    :type client: GedisClient
    :param name: actor name
    :type name: str
    :param retry: if set, will try to reload if actor is not found
    :type retyr: bool
    """
    actor = getattr(client.actors, name, None)
    if not actor and retry:
        client.reload()
        return get_actor(client, name, retry=False)
    return actor


@app.route("/gedis/http/<name>/<cmd>", method=["post", "get", "options"])
@enable_cors
def gedis_http(name, cmd):
    client = j.clients.gedis.get(name="main_gedis_threebot", port=8901)
    actor = get_actor(client, name)
    if not actor:
        response.status = 404
        return f"Actor {name} does not exist"
    command = getattr(actor, cmd, None)
    if not command:
        response.status = 400
        return f"Actor {name} does not have command {cmd}"

    if request.method == "GET":
        params = dict(request.params)
        data = {"args": params}
    else:
        data = request.json or {"args": {}}
    content_type = data.get("content_type", "json")
    if content_type not in ["json", "msgpack"]:
        response.status = 400
        return f"content_type needs to be either json or msgpack"
    response.headers["Content-Type"] = f"application/{content_type}"
    try:

        result = command(**data["args"])
    except Exception as ex:
        err = "".join(traceback.format_exception(etype=type(ex), value=ex, tb=ex.__traceback__))
        response.status = 400
        result = {"error": err}
        if content_type == "json":
            result = j.data.serializers.json.dumps(result)
        else:  # msgpack
            result = j.data.serializers.msgpack.dumps(result)
    else:
        if content_type:
            result = getattr(result, f"_{content_type}", result)
    return result


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


def get_metadata(docsite):
    try:
        with open(f"/docsites/{docsite}/.data") as f:
            return f.read()
    except FileNotFoundError:
        return "{}"


@app.route("/<threebot_name>/<package_name>/chat", method=["get"])
def gedis_http_chat(threebot_name, package_name):
    try:
        package = j.tools.threebot_packages.get(name=f"{threebot_name}.{package_name}")
    except AssertionError:
        print("Couldn't")
        abort(404)

    data = [(chatflow, chatflow.capitalize().replace("_", " ")) for chatflow in package.chat_names]
    return env.get_template("chat/home.html").render(
        chatflows=data, threebot_name=threebot_name, package_name=package_name
    )


@app.route("/<threebot_name>/<package_name>/chat/<chat_name>", method=["get"])
def gedis_http_chat(threebot_name, package_name, chat_name):
    session = request.environ.get("beaker.session", {})
    try:
        package = j.tools.threebot_packages.get(name=f"{threebot_name}.{package_name}")
    except AssertionError:
        print("Couldn't")
        abort(404)
    query = request.urlparts.query
    if query:
        query = query.split("&")
        query_params = {}
        for q in query:
            try:
                k, v = q.split("=")
                query_params[k] = v
            except:
                query_params["referral"] = q

        session["kwargs"] = query_params
    else:
        session["kwargs"] = {}
    if chat_name not in package.chat_names:
        response.status = 404
        error = f"Specified chatflow {chat_name} is not registered on the system"
        return env.get_template("chat/error.html").render(error=error, email=session["email"])
    ws_url = get_ws_url()
    return env.get_template("chat/index.html").render(
        topic=chat_name,
        url=ws_url,
        email=session.get("email", ""),
        qs=session["kwargs"],
        username=session.get("username"),
    )


@app.route("/<threebot_name>/<package_name>/wiki", method=["get"])
def gedis_http_wiki(threebot_name, package_name):
    try:
        package = j.tools.threebot_packages.get(name=f"{threebot_name}.{package_name}")
    except AssertionError:
        print("Couldn't")
        abort(404)
    wiki_names = package.wiki_names
    return env.get_template("wiki/home.html").render(
        wiki_names=wiki_names, threebot_name=threebot_name, package_name=package_name
    )


@app.route("/<threebot_name>/<package_name>/wiki/<wiki_name>", method=["get"])
def gedis_http_wiki(threebot_name, package_name, wiki_name):
    try:
        package = j.tools.threebot_packages.get(name=f"{threebot_name}.{package_name}")
    except AssertionError:
        print("Couldn't")
        abort(404)
    docsite_path = j.sal.fs.joinPaths("/docsites", wiki_name)
    if not j.sal.bcdbfs.exists(docsite_path):
        return abort(404)

    ws_url = get_ws_url()
    return env.get_template("wiki/wiki/index.html").render(name=wiki_name, metadata=get_metadata(wiki_name), url=ws_url)


# @app.route("/<3bot_name>/<package_name>/crud/<schema_name>", method=["post", "get", "options"])
# def gedis_http_crud(threebot_name, package_name, schema_name):
#     pass
#
#
# @app.route("/<3bot_name>/<package_name>/actors/<actor_name>/<method_name>", method=["post"])
# def gedis_http_actor(threebot_name, package_name, actor_name, method_name):
#     pass


@app.route("/bcdbfs/<url:re:.+>")
@enable_cors
def index(url):
    try:
        file = j.sal.bcdbfs.file_read("/" + url)
    except j.exceptions.NotFound:
        abort(404)
    response.headers["Content-Type"] = mimetypes.guess_type(url)[0]
    return file
