import sys
import os
import time
from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def _init(self, **kwargs):
        pass

    def start_file_ui(self):
        """
        called when the 3bot starts
        :return:
        """
        # TODO: ADD REVERSE PROXY

        # Couldn't import file app.py directly!
        from fileserver.filemanager_UI.app import App

        root = os.path.dirname(os.path.abspath(__file__)) + "/filemanager_UI"
        rack = j.servers.rack.get()
        app = App(root=root)()
        rack.bottle_server_add(name="fileman", port=6999, app=app)

        server = self.openresty
        server.install(reset=False)
        server.configure()
        website = server.get_from_port(443)
        locations = website.locations.get("fileserver")

        website_location = locations.locations_spa.new()
        website_location.name = "fileserver"
        website_location.path_url = "/fileserver"
        website_location.path_location = j.sal.fs.joinPaths(self.package_root, "filemanager_UI/static/")

        website_location = locations.locations_spa.new()
        website_location.name = "static"
        website_location.path_url = "/fileserver/threetransfer"
        website_location.path_location = j.sal.fs.joinPaths(self.package_root, "threetransfer")

        proxy_location = locations.locations_proxy.new()
        proxy_location.name = "filemanager"
        proxy_location.path_url = "/fileserver/api"
        proxy_location.ipaddr_dest = "0.0.0.0"
        proxy_location.port_dest = 6999
        proxy_location.scheme = "http"

        locations.configure()
        website.configure()
        website.save()

    def prepare(self):
        """
        is called at install time
        :return:
        """
        pass
        # j.builders.runtimes.python3.pip_package_install("filetype")

    def start(self):
        self.start_webdav()
        time.sleep(3)
        self.start_file_ui()

    def start_webdav(self):
        """
        called when the 3bot starts
        :return:
        """
        # TODO: ADD REVERSE PROXY

        # Couldn't import file directly!
        from fileserver.webdav.app import App

        rack = j.servers.rack.get()
        app = App(path="/", port=7501).app
        rack.bottle_server_add(name="webdav", port=7501, app=app)
        website = self.openresty.websites.get("webdav")
        website.ssl = False
        website.port = 80

        locations = website.locations.get("webdav")
        proxy_location = locations.locations_proxy.new()
        proxy_location.name = "webdav"
        proxy_location.path_url = "/"
        proxy_location.ipaddr_dest = "0.0.0.0"
        proxy_location.port_dest = 7501
        proxy_location.scheme = "http"

        website_location = locations.locations_static.new()
        website_location.name = "static"
        website_location.path_url = "/static/"
        website_location.path_location = f"{self._dirpath}/webdav/static"
        # website_location.use_jumpscale_weblibs = True

        locations.configure()
        website.configure()

    def stop(self):
        """
        called when the 3bot stops
        :return:
        """
        pass

    def uninstall(self):
        """
        called when the package is no longer needed and will be removed from the threebot
        :return:
        """
        j.builders.runtimes.python3.pip_package_uninstall("filetype")
