from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def prepare(self):
        """

        ports & paths used for threebotserver
        see: /sandbox/code/github/threefoldtech/jumpscaleX_core/docs/3Bot/web_environment.md

        """
        j.builders.runtimes.python3.pip_package_install("filetype")

        self.openresty.configure()

        # get our main webserver
        website = self.openresty.get_from_port(443)

        # start gedis websocket
        gedis_websocket_server = j.servers.gedis_websocket.default.app
        self.rack_server.websocket_server_add("websocket", 8902, gedis_websocket_server)

        # get gedis http server
        app = j.servers.gedishttp.get_app()
        self.rack_server.bottle_server_add(name="gedishttp", port=8903, app=app)

        # PROXY for gedis HTTP
        proxy_location = website.locations.locations_proxy.new()
        proxy_location.name = "gedishttp"
        proxy_location.path_url = "/api/actors"
        proxy_location.ipaddr_dest = "127.0.0.1"
        proxy_location.port_dest = 8903
        proxy_location.scheme = "http"

        # PROXY for gedis WEBSOCKET
        proxy_location = website.locations.locations_proxy.new()
        proxy_location.name = "gediswebsocket"
        proxy_location.path_url = "/api/actors_websocket"
        proxy_location.ipaddr_dest = "127.0.0.1"
        proxy_location.port_dest = 8902
        proxy_location.scheme = "http"

        # static
        website_location = website.locations.locations_static.new()
        website_location.name = "static"
        website_location.path_url = "/static"
        website_location.path_location = (
            "/sandbox/code/github/threefoldtech/jumpscaleX_core/JumpscaleCore/servers/openresty/web_resources/static"
        )

        # to let port 80 work
        self._proxy_create("openresty", 80, 443)

        website.configure()

    def start(self):
        pass

    def stop(self):
        pass

    def uninstall(self):
        """
        Remove Dependencies
        """
        j.builders.runtimes.python3.pip_package_uninstall("filetype")
