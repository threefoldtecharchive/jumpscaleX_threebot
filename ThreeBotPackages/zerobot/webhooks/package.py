from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def start(self):
        """
        called when the 3bot starts
        :return:
        """

        server = self.openresty
        server.configure()
        from threebot_packages.zerobot.webhooks.bottle.main import app

        self.gevent_rack.bottle_server_add(name="github_webhooks", port=8530, app=app)
        for port in (443, 80):
            website = server.get_from_port(port=port)
            locations = website.locations.get(f"github_webhooks_{port}")

            proxy_location = locations.get_location_proxy(f"github_webhooks")
            proxy_location.path_url = "/webhooks/github"
            proxy_location.ipaddr_dest = "127.0.0.1"
            proxy_location.port_dest = 8530
            proxy_location.scheme = "http"
            proxy_location.type = "http"
            proxy_location.is_auth = False

            locations.configure()
            website.configure()

    def stop(self):
        server = self.openresty
        server.configure()
        for port in (443, 80):
            website = server.get_from_port(port=port)
            locations = website.locations.get(f"github_webhooks_{port}")
            locations.delete()
            website.configure()
        super().stop()
