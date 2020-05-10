from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def setup_locations(self):
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
            # PROXY for gedis HTTP
            locations = website.locations.get(name=f"webinterface_locations_{port}")
            bottle_proxy_location = locations.get_location_proxy("bottle_proxy")
            bottle_proxy_location.path_url = "~* ^/(3git|gedis|bcdbfs|auth|wiki|info)"
            bottle_proxy_location.ipaddr_dest = "127.0.0.1"
            bottle_proxy_location.port_dest = 9999
            bottle_proxy_location.path_dest = ""
            bottle_proxy_location.type = "http"
            bottle_proxy_location.scheme = "http"

            chat_wiki_proxy_location = locations.get_location_proxy("chat_wiki_actors")
            chat_wiki_proxy_location.path_url = "~* ^/((?!mdbook).)*/(.*)/(chat|wiki|actors|info|model)"
            chat_wiki_proxy_location.ipaddr_dest = "127.0.0.1"
            chat_wiki_proxy_location.port_dest = 9999

            package_info_location = locations.get_location_proxy("package_author_info")
            package_info_location.path_url = "~* ^/(.*)/info$"
            package_info_location.ipaddr_dest = "127.0.0.1"
            package_info_location.port_dest = 9999

            url = "https://github.com/threefoldtech/jumpscaleX_weblibs"
            weblibs_path = j.clients.git.getContentPathFromURLorPath(url, pull=False)
            weblibs_location = locations.get_location_static("weblibs")
            weblibs_location.path_url = "/weblibs"
            weblibs_location.path_location = f"{weblibs_path}/static"

            chat_static_location = locations.get_location_static("chat_static")
            chat_static_location.path_url = "/staticchat"
            chat_static_location.path_location = f"{self._dirpath}/chatflows"

            wiki_static_location = locations.get_location_static("wiki_static")
            wiki_static_location.path_url = "/staticwiki"
            wiki_static_location.path_location = f"{self._dirpath}/static"

            md_book_location = locations.get_location_static("mdbook")
            md_book_location.path_url = "/mdbook"
            md_book_location.path_location = j.tools.mdbook.output_path

            locations.configure()
            website.configure()

    def start(self):

        # add the main webapplication

        self.setup_locations()

        # init proxy instance to use in bottle
        j.clients.oauth_proxy.get("main")

        from threebot_packages.zerobot.webinterface.bottle import app_with_session

        self.gevent_rack.bottle_server_add(name="bottle_web_interface", port=9999, app=app_with_session, websocket=True)
        # self.gevent_rack.webapp_root = webapp
