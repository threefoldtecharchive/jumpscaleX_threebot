import socketio
from Jumpscale import j

import os
from bottle import request, response, Bottle, abort, static_file, template

root = os.path.dirname(os.path.abspath(__file__))


app = Bottle()
app.debug = True


sio = socketio.Server(async_mode='gevent', cors_allowed_origins='*')
appws = socketio.WSGIApp(sio)


@sio.event
def connect(sid, environ):
    print('connect ', sid)


@sio.on('fruum:auth')
def auth(sid, data):
    return sio.emit("fruum:auth", {"user":{"id":"123","anonymous":False,"admin":True,"blocked":False,"username":"hamdy","displayname":"Hamdy","email":"","avatar":"","created":0,"last_login":0,"last_logout":0,"onboard":0,"karma":0,"logout_karma":0,"watch":[],"tags":[],"notifications":[],"meta":{},"last_visit":1569166490774,"server_now":1569166490774}})


@sio.on('fruum:view')
def view(sid, data):
    sio.emit ("fruum:view", {"id":"home","breadcrumb":[{"id":"home","breadcrumb":[],"parent":None,"parent_type":"","type":"category","created":0,"updated":0,"initials":"HOM","header":"Home","body":"","thumbnail":"","sticky":False,"locked":False,"visible":True,"inappropriate":False,"permission":0,"usage":0,"user_id":"","user_username":"","user_displayname":"","user_avatar":"","react_up":[],"react_down":[],"order":0,"children_count":0,"archived":False,"archived_ts":0,"tags":[],"attachments":[],"meta":{}}],"documents":[],"online":{}})


@sio.on('fruum:profile')
def profile(sid, data):
    return 'ok'

@sio.on('fruum:delete')
def delete(sid, data):
    return 'ok'

@sio.on('fruum:archive')
def archive(sid, data):
    return 'ok'

@sio.on('fruum:restore')
def restore(sid, data):
    return 'ok'


@sio.on('fruum:add')
def add(sid, data):
    return 'ok'


@sio.on('fruum:update')
def update(sid, data):
    return 'ok'


@sio.on('fruum:field')
def field(sid, data):
    return 'ok'


@sio.on('fruum:watch')
def watch(sid, data):
    return 'ok'

@sio.on('fruum:unwatch')
def unwatch(sid, data):
    return 'ok'

@sio.on('fruum:notifications')
def notifications(sid, data):
    return 'ok'

@sio.on('fruum:notify')
def notify(sid, data):
    return 'ok'

@sio.on('fruum:unnotify')
def unnotify(sid, data):
    return 'ok'

@sio.on('fruum:report')
def report(sid, data):
    return 'ok'


@sio.on('fruum:react')
def react(sid, data):
    return 'ok'


@sio.on('fruum:search')
def search(sid, data):
    return 'ok'

@sio.on('fruum:autocomplete')
def autocomplete(sid, data):
    return 'ok'

@sio.on('fruum:move')
def move(sid, data):
    return 'ok'


@sio.on('fruum:categories')
def categories(sid, data):
    return 'ok'

@sio.on('fruum:typing')
def typing(sid, data):
    return 'ok'


@sio.on('fruum:onboard')
def onboard(sid, data):
    return 'ok'


@sio.on('fruum:optimize')
def optimize(sid, data):
    return 'ok'


@sio.on('fruum:user:block')
def block(sid, data):
    return 'ok'


@sio.on('fruum:user:unblock')
def unblock(sid, data):
    return 'ok'


@sio.on('fruum:user:remove')
def user_remove(sid, data):
    return 'ok'


@sio.on('fruum:user:feed')
def feed(sid, data):
    return 'ok'


@sio.on('fruum:user:list')
def user_list(sid, data):
    return 'ok'





@sio.event
def disconnect(sid):
    print('disconnect ', sid)

@app.route('/static/<filepath:path>')
def server_static(filepath):
    return static_file(filepath, root=os.path.join(root, 'static'))


def get_host():
    parts = request.urlparts
    return '{}://{}'.format(parts.scheme, parts.netloc)


@app.route("/go/<app_name>")
def home(app_name):
    res =  template("%s/templates/app.js" % root, {'app_id':app_name})
    response.headers['Accept-Ranges'] = 'bytes'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Cache-Control'] = 'public, max-age=0'
    response.headers['Content-Type'] = 'application/javascript'
    response.headers['Vary'] = 'Accept-Encoding'
    return res.encode()


@app.route("/_/get/js/<app_name>")
def js(app_name):
    res = template("%s/templates/script.js" % root, {})
    response.headers['Accept-Ranges'] = 'bytes'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Cache-Control'] = 'public, max-age=0'
    response.headers['Content-Type'] = 'application/javascript; charset=utf-8'
    response.headers['Vary'] = 'Accept-Encoding'
    return res.encode()


@app.route("/_/get/style/<app_name>")
def css(app_name):
    res = static_file("/static/style.css" , root=root)
    res.headers['Accept-Ranges'] = 'bytes'
    res.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'
    res.headers['Access-Control-Allow-Origin'] = '*'
    res.headers['Cache-Control'] = 'public, max-age=0'
    res.headers['Content-Type'] = 'text/css; charset=utf-8'
    res.headers['Vary'] = 'Accept-Encoding'
    return res


@app.route("/_/get/html/<app_name>")
def html(app_name):
    res = static_file("/static/app.html" , root=root)
    res.headers['Accept-Ranges'] = 'bytes'
    res.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'
    res.headers['Access-Control-Allow-Origin'] = '*'
    res.headers['Cache-Control'] = 'public, max-age=0'
    res.headers['Content-Type'] = 'text/html; charset=utf-8'
    res.headers['Vary'] = 'Accept-Encoding'
    return res
