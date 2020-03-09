from Jumpscale import j


class Package(j.baseclasses.threebot_package):
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

            proxy_location = locations.locations_proxy.new()
            proxy_location.name = "codeserver"
            proxy_location.path_url = "/codeserver/"
            proxy_location.ipaddr_dest = "127.0.0.1"
            proxy_location.port_dest = 8080
            proxy_location.path_dest = "/"
            locations.configure()
            website.configure()

        # Start code server
        self.startupcmd = j.servers.startupcmd.get(
            "codeserver", cmd_start="./code-server --auth none", path="/sandbox/bin", ports=8080
        )
        if not j.sal.fs.exists("/sandbox/bin/code-server"):
            j.builders.apps.codeserver.install()

        self.startupcmd.start()

    def stop(self):
        # Stop code server
        if not j.sal.fs.exists("/sandbox/bin/code-server"):
            j.builders.apps.codeserver.install()
        self.startupcmd.stop()
