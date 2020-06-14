from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    @property
    def startupcmd(self):
        cmd_start = "grafana-server --config /sandbox/grafana/conf/grafana_cfg.ini --homepath=/sandbox/grafana"
        return j.servers.startupcmd.get("grafana", cmd_start=cmd_start, path="/sandbox/bin", ports=3005)

    def prepare(self):
        if not j.sal.fs.exists("{DIR_BIN}/grafana-server"):
            # should be included in the image already, but no harm.
            j.builders.monitoring.grafana_admin.install()

    def start(self):
        """
        called when the 3bot starts
        :return:
        """
        server = self.openresty
        server.configure()

        for port in (443, 80):
            website = server.get_from_port(port=port)
            locations = website.locations.get(f"grafana_{port}")

            grafana_proxy_location = locations.get_location_proxy("grafana")
            grafana_proxy_location.path_url = "/grafana/"
            grafana_proxy_location.ipaddr_dest = "127.0.0.1"
            grafana_proxy_location.port_dest = 3005
            grafana_proxy_location.path_dest = "/"
            # grafana_proxy_location.type = "websocket"
            grafana_proxy_location.scheme = "http"
            grafana_proxy_location.is_admin = True

            locations.configure()
            website.configure()

        # Start code server
        if not j.sal.fs.exists("{DIR_BIN}/grafana-server"):
            raise Exception("Grafana is not installed, call install first")
        self.startupcmd.start()

    def stop(self):
        # Stop code server
        if not j.sal.fs.exists("{DIR_BIN}/grafana-server"):
            # j.builders.apps.grafana.install()
            pass
        self.startupcmd.stop()
        server = self.openresty
        server.configure()

        for port in (443, 80):
            website = server.get_from_port(port=port)
            locations = website.locations.get(f"grafana_{port}")

            locations.delete()
            website.configure()
