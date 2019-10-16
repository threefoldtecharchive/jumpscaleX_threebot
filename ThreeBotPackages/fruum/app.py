import time
import uuid

import socketio
from Jumpscale import j

import os
from bottle import request, response, Bottle, abort, static_file, template

root = os.path.dirname(os.path.abspath(__file__))


app = Bottle()
app.debug = True


sio = socketio.Server(async_mode="gevent", cors_allowed_origins="*")
appws = socketio.WSGIApp(sio)


bcdb = j.data.bcdb.get("fruum")
app_model = bcdb.model_get(url="jumpscale.fruum.application")
doc_model = bcdb.model_get(url="jumpscale.fruum.document")


def get_view(doc):
    doc = doc._ddict
    app_name = doc.pop("app_name")

    doc["id"] = doc.pop("doc_id")

    doc_breadcrumb = doc["breadcrumb"]

    breadcrumb = []

    for bc in doc_breadcrumb:
        d = doc_model.find(app_name=app_name, doc_id=bc)[0]
        d = d._ddict
        d["id"] = d.pop("doc_id")
        d.pop("app_name")
        breadcrumb.append(d)
    breadcrumb.append(doc)

    children = []
    for d in doc_model.find(app_name=app_name, parent=doc["id"]):
        d = d._ddict
        d["id"] = d.pop("doc_id")
        d.pop("app_name")
        children.append(d)

    return {"id": doc["id"], "breadcrumb": breadcrumb, "documents": children, "online": {}}


def get_user(username=None):
    user = {
        "id": username,
        "anonymous": False,
        "admin": True,
        "blocked": False,
        "username": username,
        "displayname": username,
        "email": "",
        "avatar": "",
        "created": 0,
        "last_login": "online",
        "last_logout": 0,
        "onboard": 0,
        "karma": 0,
        "logout_karma": 0,
        "watch": [],
        "tags": [],
        "notifications": [],
        "meta": {},
        "last_visit": 1569166490774,
        "server_now": 1569166490774,
    }
    return user


def list_users(start, size):

    return [
        {
            "id": "hamdy",
            "anonymous": False,
            "admin": False,
            "blocked": False,
            "username": "hamdy",
            "displayname": "hamdy",
            "email": "",
            "avatar": "",
            "created": 0,
            "last_login": 0,
            "last_logout": 0,
            "onboard": 0,
            "karma": 0,
            "logout_karma": 0,
            "watch": [],
            "tags": [],
            "notifications": [],
            "meta": {},
            "last_visit": 1569166490774,
            "server_now": 1569166490774,
        },
        {
            "id": "aly",
            "anonymous": False,
            "admin": False,
            "blocked": False,
            "username": "aly",
            "displayname": "aly",
            "email": "",
            "avatar": "",
            "created": 0,
            "last_login": 0,
            "last_logout": 0,
            "onboard": 0,
            "karma": 0,
            "logout_karma": 0,
            "watch": [],
            "tags": [],
            "notifications": [],
            "meta": {},
            "last_visit": 1569166490774,
            "server_now": 1569166490774,
        },
    ]


def connect(sid, environ):
    print("connect ", sid)


@sio.on("fruum:auth")
def auth(sid, data):
    with sio.session(sid) as session:
        session["app_name"] = data["app_id"]
        try:
            app = app_model.get_by_name(data["app_id"])
        except j.exceptions.NotFound:
            # Auto Add APP
            app = app_model.new()
            app.name = data["app_id"]
            app.save()

            # Auto Add home
            doc = doc_model.new()
            doc.app_name = data["app_id"]
            doc.doc_id = "home"
            doc.breadcrumb = []
            doc.parent = ""
            doc.parent_type = ""
            doc.type = "category"
            doc.initials = "HOM"
            doc.header = "Home"
            doc.body = ""
            doc.thumbnail = ""
            doc.user_id = ""
            doc.user_username = ""
            doc.user_displayname = ""
            doc.user_avatar = ""
            doc.tags = []
            doc.attachments = []
            doc.permission = 0
            doc.usage = 0
            doc.order = 0
            doc.save()

        user = get_user(username=data["user"]["id"])

        session["user"] = user
        return sio.emit("fruum:auth", {"user": user}, room=sid)


@sio.on("fruum:view")
def view(sid, data):
    doc_id = data.get("id")
    with sio.session(sid) as session:
        docs = doc_model.find(app_name=session["app_name"], doc_id=doc_id)
        if not docs:
            pass
        doc = docs[0]
        if doc.type == "channel":
            sio.enter_room(sid, doc.doc_id)
    sio.emit("fruum:view", get_view(doc), room=sid)


@sio.on("fruum:add")
def add(sid, data):
    with sio.session(sid) as session:
        now = int(time.time())

        doc = doc_model.new()
        doc.app_name = session["app_name"]
        doc.doc_id = "%s-%s" % (data["header"], str(uuid.uuid4()))
        doc.header = data["header"]
        doc.body = data["body"]
        doc.usage = data["usage"]
        doc.created = now
        doc.updated = now
        doc.parent = data["parent"]
        doc.type = data["type"]
        doc.initials = data["initials"]
        doc.thumbnail = data["thumbnail"]
        doc.attachments = data["attachments"]
        doc.tags = data["tags"]
        doc.usage = data["usage"]
        doc.permission = data["permission"]
        doc.order = data["order"]
        parent = doc_model.find(app_name=session["app_name"], doc_id=data["parent"])[0]
        doc.parent_type = parent.type

        doc.breadcrumb = list(parent.breadcrumb) + [parent.doc_id]
        doc.user_id = session["user"]["id"]
        doc.user_username = session["user"]["username"]
        doc.user_displayname = session["user"]["displayname"]
        doc.user_avatar = session["user"]["avatar"]
        doc.save()

        doc = doc._ddict
        doc["id"] = doc.pop("doc_id")
        doc.pop("app_name")

        if doc["type"] == "post" and doc["parent_type"] == "channel":
            room = parent.doc_id
            sio.emit("fruum:add", doc, room=room)
        else:
            sio.emit("fruum:add", doc)


@sio.on("fruum:profile")
def profile(sid, data):
    with sio.session(sid) as session:
        sio.emit("fruum:profile", session["user"], room=sid)


@sio.on("fruum:delete")
def delete(sid, data):
    return "ok"


@sio.on("fruum:archive")
def archive(sid, data):
    return "ok"


@sio.on("fruum:restore")
def restore(sid, data):
    return "ok"


@sio.on("fruum:update")
def update(sid, data):
    return "ok"


@sio.on("fruum:field")
def field(sid, data):
    return "ok"


@sio.on("fruum:watch")
def watch(sid, data):
    return "ok"


@sio.on("fruum:unwatch")
def unwatch(sid, data):
    return "ok"


@sio.on("fruum:notifications")
def notifications(sid, data):
    return "ok"


@sio.on("fruum:notify")
def notify(sid, data):
    return "ok"


@sio.on("fruum:unnotify")
def unnotify(sid, data):
    return "ok"


@sio.on("fruum:report")
def report(sid, data):
    return "ok"


@sio.on("fruum:react")
def react(sid, data):
    return "ok"


@sio.on("fruum:search")
def search(sid, data):
    return "ok"


@sio.on("fruum:autocomplete")
def autocomplete(sid, data):
    return "ok"


@sio.on("fruum:move")
def move(sid, data):
    return "ok"


@sio.on("fruum:categories")
def categories(sid, data):
    return "ok"


@sio.on("fruum:typing")
def typing(sid, data):
    sio.emit("fruum:typing", {})


@sio.on("fruum:onboard")
def onboard(sid, data):
    sio.emit("fruum:onboard", data)


@sio.on("fruum:optimize")
def optimize(sid, data):
    return "ok"


@sio.on("fruum:user:block")
def block(sid, data):
    return "ok"


@sio.on("fruum:user:unblock")
def unblock(sid, data):
    return "ok"


@sio.on("fruum:user:remove")
def user_remove(sid, data):
    return "ok"


@sio.on("fruum:user:feed")
def feed(sid, data):
    return "ok"


@sio.on("fruum:user:list")
def user_list(sid, data):
    sio.emit("fruum:user:list", {"users": list_users(data["from"], data["size"])}, room=sid)


@sio.event
def disconnect(sid):
    print("disconnect ", sid)


@app.route("/static/<filepath:path>")
def server_static(filepath):
    return static_file(filepath, root=os.path.join(root, "static"))


def get_host():
    parts = request.urlparts
    return "{}://{}".format(parts.scheme, parts.netloc)


@app.route("/go/<app_name>")
def home(app_name):
    res = template("%s/templates/app.js" % root, {"app_id": app_name})
    response.headers["Accept-Ranges"] = "bytes"
    response.headers["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept"
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Cache-Control"] = "public, max-age=0"
    response.headers["Content-Type"] = "application/javascript"
    response.headers["Vary"] = "Accept-Encoding"
    return res.encode()


@app.route("/_/get/js/<app_name>")
def js(app_name):
    res = template("%s/templates/script.js" % root, {})
    response.headers["Accept-Ranges"] = "bytes"
    response.headers["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept"
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Cache-Control"] = "public, max-age=0"
    response.headers["Content-Type"] = "application/javascript; charset=utf-8"
    response.headers["Vary"] = "Accept-Encoding"
    return res.encode()


@app.route("/_/get/style/<app_name>")
def css(app_name):
    res = static_file("/static/style.css", root=root)
    res.headers["Accept-Ranges"] = "bytes"
    res.headers["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept"
    res.headers["Access-Control-Allow-Origin"] = "*"
    res.headers["Cache-Control"] = "public, max-age=0"
    res.headers["Content-Type"] = "text/css; charset=utf-8"
    res.headers["Vary"] = "Accept-Encoding"
    return res


@app.route("/_/get/html/<app_name>")
def html(app_name):
    res = static_file("/static/app.html", root=root)
    res.headers["Accept-Ranges"] = "bytes"
    res.headers["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept"
    res.headers["Access-Control-Allow-Origin"] = "*"
    res.headers["Cache-Control"] = "public, max-age=0"
    res.headers["Content-Type"] = "text/html; charset=utf-8"
    res.headers["Vary"] = "Accept-Encoding"
    return res
