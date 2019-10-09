import sys
import os

from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def prepare(self):
        """
        is called at install time
        :return:
        """
        j.builders.runtimes.python3.pip_package_install("filetype")
        j.builders.runtimes.python3.pip_package_install("vobject")
        j.builders.runtimes.python3.pip_package_install("caldav")
        self.bcdb.models_add(path=self.package_root + "/models")
        self.gedis_server.actors_add(self.package_root + "/actors")

    @property
    def bcdb(self):
        return self._package.threebot_server.bcdb_get("caldav")

    def start(self):
        """
        called when the 3bot starts
        :return:
        """
        # TODO: ADD REVERSE PROXY
        sys.path.append(os.path.dirname(__file__))
        import radicale
        import logging

        # radicale.log.logger.setLevel(logging.DEBUG)
        from radicale import application

        rack = self.rack_server

        rack.bottle_server_add(name="radicale", port=8851, app=application)
        # TODO: cant we do on /name/... for url in stead of port
        website = self.openresty.websites.get("radicale")
        website.ssl = False
        website.port = 8001

        locations = website.locations.get("radicale")
        proxy_location = locations.locations_proxy.new()
        proxy_location.name = "radicale"
        proxy_location.path_url = "/"
        proxy_location.ipaddr_dest = "0.0.0.0"
        proxy_location.port_dest = 8851
        proxy_location.scheme = "http"

        website_location = locations.locations_static.new()
        website_location.name = "static"
        website_location.path_url = "/static/"
        # TODO: i see not static path here
        website_location.path_location = f"{self._dirpath}/static"
        # website_location.use_jumpscale_weblibs = True

        locations.configure()
        website.configure()
