import os

from gevent import pywsgi
from geventwebsocket.handler import WebSocketHandler
from Jumpscale import j


class FruumFactory(j.baseclasses.object, j.baseclasses.testtools):

    __jslocation__ = "j.threebot.package.fruum"

    def install(self):
        server = j.servers.threebot.default
        server.save()

        package = j.tools.threebot_packages.get("fruum", path=self._dirpath, threebot_server_name=server.name)
        package.prepare()
        package.save()
        self._log_info("fruum loaded")

        return "OK"

    def run(self):
        self.install()
        from .app import app, appws

        sio_server = pywsgi.WSGIServer(('', 9999), appws, handler_class=WebSocketHandler)

        root = os.path.dirname(os.path.abspath(__file__))
        rack = j.servers.rack.get()
        rack.bottle_server_add(name="fruum", port=10000, app=app)
        rack.add(name="fruum_socketio", server=sio_server)
        rack.start()

