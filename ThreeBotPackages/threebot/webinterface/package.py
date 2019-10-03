from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def prepare(self):
        """

        ports & paths used for threebotserver
        see: /sandbox/code/github/threefoldtech/jumpscaleX_core/docs/3Bot/web_environment.md

        gedis websocket                                         (port:8902)  #used for search in wiki
        bottle server for webinterface (gedis to http)          (port:8903)
        bottle server for bcdfs (filemanager)                   (port:8904) serves the bcdbfs content
        """

        bottle_port_original = 4442
        bottle_server_new = 8904
        websocket_port_original = 4444
        websocket_port_new = 4445
        gedis_port_http = 8903
        self.openresty.configure()

        # get our main webserver
        website = self.openresty.get_from_port(443)

        # start bottle server
        self.rack_server.bottle_server_add(port=bottle_server_new)
        # start gedis websocket
        gedis_websocket_server = j.servers.gedis_websocket.default.app
        # TODO: this will be changed BUT ONLY AFTER updating all wikis and all packages using the old port
        #  you should always use "/api/actors_websocket" instead of the port
        self.rack_server.websocket_server_add("websocket", websocket_port_new, gedis_websocket_server)

        # get gedis http server
        app = j.servers.gedishttp.get_app()
        self.rack_server.bottle_server_add(name="gedishttp", port=gedis_port_http, app=app)

        # PROXY for gedis HTTP
        proxy_location = website.locations.get().locations_proxy.new()
        proxy_location.name = "gedishttp"
        proxy_location.path_url = "/api/actors/"
        proxy_location.ipaddr_dest = "127.0.0.1"
        proxy_location.port_dest = gedis_port_http
        proxy_location.path_dest = "/"
        proxy_location.type = "http"
        proxy_location.scheme = "http"

        # PROXY for bcdbfs HTTP
        proxy_location = website.locations.get().locations_proxy.new()
        proxy_location.name = "bcdbfs"
        proxy_location.path_url = "/api/bcdbfs/"
        proxy_location.ipaddr_dest = "127.0.0.1"
        proxy_location.port_dest = bottle_server_new
        proxy_location.path_dest = "/"
        proxy_location.type = "http"
        proxy_location.scheme = "http"

        # PROXY for gedis WEBSOCKET
        proxy_location = website.locations.get().locations_proxy.new()
        proxy_location.name = "gediswebsocket"
        proxy_location.path_url = "/api/actors_websocket"
        proxy_location.ipaddr_dest = "127.0.0.1"
        proxy_location.port_dest = websocket_port_original
        proxy_location.type = "websocket"
        proxy_location.scheme = "http"

        website.configure()

        bcdbfs_website = self.openresty.get_from_port(bottle_port_original)
        # PROXY for bcdbfs HTTP
        proxy_location = bcdbfs_website.locations.get().locations_proxy.new()
        proxy_location.name = "bcdbfs"
        proxy_location.path_url = "/"
        proxy_location.ipaddr_dest = "127.0.0.1"
        proxy_location.port_dest = bottle_server_new
        proxy_location.path_dest = "/"
        proxy_location.type = "http"
        proxy_location.scheme = "http"
        bcdbfs_website.configure()

        websocket_gedis_website = self.openresty.get_from_port(websocket_port_original)
        # PROXY for bcdbfs HTTP
        proxy_location = websocket_gedis_website.locations.get().locations_proxy.new()
        proxy_location.name = "gedis_websocket"
        proxy_location.path_url = "/"
        proxy_location.ipaddr_dest = "127.0.0.1"
        proxy_location.port_dest = websocket_port_new
        proxy_location.path_dest = "/"
        proxy_location.type = "websocket"
        proxy_location.scheme = "http"
        websocket_gedis_website.configure()

    def start(self):
        self.prepare()

    def stop(self):
        pass

    def uninstall(self):
        """
        Remove Dependencies
        """
        j.builders.runtimes.python3.pip_package_uninstall("filetype")
