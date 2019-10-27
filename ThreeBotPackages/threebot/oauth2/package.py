from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def prepare(self):
        """
        is called at install time
        :return:
        """
        pass

    def start(self):
        """
        called when the 3bot starts
        :return:
        """
        server = self.openresty
        server.configure()

        app = j.threebot.package.oauth2.get_app()
        rack = j.servers.rack.get()
        rack.bottle_server_add(name="oauth2", port=8523, app=app)
        for port in (443, 80):
            website = server.get_from_port(port=port)
            locations = website.locations.get("main_oauth2")

            proxy_location = locations.locations_proxy.new()
            proxy_location.name = "oauth2"
            proxy_location.path_url = "/auth"
            proxy_location.ipaddr_dest = "0.0.0.0"
            proxy_location.port_dest = 8523
            proxy_location.scheme = "http"
            locations.configure()
            website.configure()

    def stop(self):
        """
        called when the 3bot stops
        :return:
        """
        pass

    def uninstall(self):
        """
        called when the package is no longer needed and will be removed from the threebot
        :return:
        """
        # TODO: clean up bcdb ?
        pass