from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    @property
    def startupcmd(self):
        cmd_start = "./code-server --auth none --host 127.0.0.1"
        return j.servers.startupcmd.get("codeserver", cmd_start=cmd_start, path="/sandbox/bin", ports=8080)

    def prepare(self):
        if not j.sal.fs.exists("{DIR_BIN}/code-server"):
            # should be included in the image already, but no harm.
            j.builders.apps.codeserver.install()

    def start(self):
        """
        called when the 3bot starts
        :return:
        """
        server = self.openresty
        server.configure()

        for port in (443, 80):
            website = server.get_from_port(port=port)
            locations = website.locations.get(f"codeserver_{port}")

            codeserver_proxy_location = locations.get_location_proxy("codeserver")
            codeserver_proxy_location.path_url = "/codeserver/"
            codeserver_proxy_location.ipaddr_dest = "127.0.0.1"
            codeserver_proxy_location.port_dest = 8080
            codeserver_proxy_location.path_dest = "/"
            codeserver_proxy_location.type = "websocket"
            codeserver_proxy_location.scheme = "http"
            codeserver_proxy_location.is_auth = True

            locations.configure()
            website.configure()

        # Start code server
        if not j.sal.fs.exists("{DIR_BIN}/code-server"):
            raise Exception("Code server is not installed, call install first")
        self.startupcmd.start()

    def stop(self):
        # Stop code server
        if not j.sal.fs.exists("{DIR_BIN}/code-server"):
            j.builders.apps.codeserver.install()
        self.startupcmd.stop()
