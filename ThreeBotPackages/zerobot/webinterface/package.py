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
            locations = website.locations.get(name="webinterface_locations")

            gedis_bcdbfs_proxy_location = locations.locations_proxy.new()
            gedis_bcdbfs_proxy_location.name = "gedis_bcdbfs"
            gedis_bcdbfs_proxy_location.path_url = "~* ^/(gedis|bcdbfs|wiki|docsites|auth)"
            gedis_bcdbfs_proxy_location.ipaddr_dest = "127.0.0.1"
            gedis_bcdbfs_proxy_location.port_dest = 9999
            gedis_bcdbfs_proxy_location.path_dest = ""
            gedis_bcdbfs_proxy_location.type = "http"
            gedis_bcdbfs_proxy_location.scheme = "http"

            chat_wiki_proxy_location = locations.locations_proxy.new()
            chat_wiki_proxy_location.name = "chat_wiki_actors"
            chat_wiki_proxy_location.path_url = "~* ^/(.*)/(.*)/(chat|wiki|actors)"
            chat_wiki_proxy_location.ipaddr_dest = "127.0.0.1"
            chat_wiki_proxy_location.port_dest = 9999

            url = "https://github.com/threefoldtech/jumpscaleX_weblibs"
            weblibs_path = j.clients.git.getContentPathFromURLorPath(url, pull=False)
            weblibs_location = locations.locations_static.new()
            weblibs_location.name = "weblibs"
            weblibs_location.path_url = "/weblibs"
            weblibs_location.path_location = f"{weblibs_path}/static"

            chat_static_location = locations.locations_static.new()
            chat_static_location.name = "chat_static"
            chat_static_location.path_url = "/staticchat"
            chat_static_location.path_location = f"{self._dirpath}/static"

            wiki_static_location = locations.locations_static.new()
            wiki_static_location.name = "wiki_static"
            wiki_static_location.path_url = "/staticwiki"
            wiki_static_location.path_location = f"{self._dirpath}/static"

            website.configure()

    def start(self):

        # add the main webapplication

        self.setup_locations()

        from threebot_packages.zerobot.webinterface.bottle.rooter import app_with_session

        self.gevent_rack.bottle_server_add(name="bottle_web_interface", port=9999, app=app_with_session, websocket=True)
        # self.gevent_rack.webapp_root = webapp

    def test(self, port=None, prefix="web", scheme="https"):
        """
        kosmos `j.servers.bottle_web.test()'
        :return:
        """
        base_url = "0.0.0.0"
        if port:
            base_url = base_url + f":{port}"

        if prefix:
            base_url = base_url + f"/{prefix}"

        url = f"{scheme}://{base_url}"

        gedis_client = j.servers.threebot.local_start_default()
        gedis_client.actors.package_manager.package_add(
            j.core.tools.text_replace(
                "{DIR_BASE}/code/github/threefoldtech/jumpscaleX_core/JumpscaleCore/servers/gedis/pytests/test_package"
            )
        )
        gedis_client.reload()

        print("testing bcdbfs")
        j.sal.bcdbfs.file_write("/test", "hello world", create=True, append=False)
        assert j.clients.http.get(f"{url}/bcdbfs/test", verify=False) == "hello world"
        print("bcdbfs OK")

        print("testing gedis http")
        j.sal.bcdbfs.file_write("/test", "hello world", create=True)
        # TODO: check also the content
        assert (
            j.clients.http.post(
                f"{url}/gedis/http/actor/echo",
                data=b'{"args":{"_input":"hello world"}}',
                headers={"Content-Type": "application/json"},
                verify=False,
            )
            .read()
            .decode()
            == "hello world"
        )
        print("gedis http OK")

        print("testing gedis websocker")
        from websocket import WebSocket
        import ssl

        ws = WebSocket(sslopt={"cert_reqs": ssl.CERT_NONE})
        ws.connect(f"wss://{base_url}/gedis/websocket")
        assert ws.connected

        payload = """{
        "namespace": "default",
        "actor": "echo",
        "command": "actor.echo",
        "args": {"_input": "hello world"},
        "headers": {"response_type":"json"}
        }"""
        ws.send(payload)
        assert ws.recv() == "hello world"
        print("gedis websocket OK")

        print("tearDown")
        gedis_client.actors.package_manager.package_delete("test_package")
        j.servers.threebot.default.stop()
