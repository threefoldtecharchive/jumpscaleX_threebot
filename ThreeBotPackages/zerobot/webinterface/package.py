from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    @property
    def bcdb(self):
        return self.threebot_server.bcdb_get("users")

    def prepare(self):
        """
        ports & paths used for threebotserver
        see: {DIR_BASE}/code/github/threefoldtech/jumpscaleX_core/docs/3Bot/web_environment.md
        will start bottle server web interface which include (gedis http interface, gedis websocket interface and
        bcdbfs web server)
        endpoints:
        "/web/gedis/http"       >    gedis htto interface
        "/web/gedis/websocket"  >    gedis websocket interface
        "/web/bcdbfs"           >    bcdbfs web server
        "/weblibs"              >    static jumpscale weblibs files
        """

        self.openresty.configure()

        # get our main webserver
        for port in (443, 80):
            website = self.openresty.get_from_port(port)

            # start bottle server
            app = j.servers.bottle_web.get_app()
            self.rack_server.bottle_server_add(name="bottle_web_interface", port=9999, app=app, websocket=True)

            # PROXY for gedis HTTP
            proxy_location = website.locations.get().locations_proxy.new()
            proxy_location.name = "webinterface"
            proxy_location.path_url = "/web/"
            proxy_location.ipaddr_dest = "127.0.0.1"
            proxy_location.port_dest = 9999
            proxy_location.path_dest = "/"
            proxy_location.type = "http"
            proxy_location.scheme = "http"

            url = "https://github.com/threefoldtech/jumpscaleX_weblibs"
            weblibs_path = j.clients.git.getContentPathFromURLorPath(url, pull=False)
            weblibs_location = website.locations.get().locations_static.new()
            weblibs_location.name = "weblibs"
            weblibs_location.path_url = "/weblibs"
            weblibs_location.path_location = f"{weblibs_path}/static"

            website.configure()

    def start(self):
        self.prepare()
        self.gedis_server.actors_add(path=self.package_root + "/actors")

    def stop(self):
        pass

    def uninstall(self):
        """
        Remove Dependencies
        """
        j.builders.runtimes.python3.pip_package_uninstall("filetype")
