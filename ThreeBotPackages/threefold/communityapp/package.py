from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def _init(self, **kwargs):
        if "branch" in kwargs.keys():
            self.branch = kwargs["branch"]
        else:
            self.branch = "*"

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
        server.install(reset=False)
        server.configure()

        website = server.get_from_port(80)

        locations = website.locations.get("community_location")

        website_location = locations.locations_spa.new()
        website_location.name = "community"
        website_location.path_url = "/community"
        website_location.use_jumpscale_weblibs = True
        fullpath = j.sal.fs.joinPaths(self.package_root, "static/")
        website_location.path_location = fullpath

        proxy_location = locations.locations_proxy.new()
        proxy_location.name = "connect"
        proxy_location.path_url = "/connect"
        proxy_location.ipaddr_dest = "0.0.0.0"
        proxy_location.port_dest = 80
        proxy_location.path_dest = "/chat/session/community_join"
        proxy_location.scheme = "http"

        proxy_location = locations.locations_proxy.new()
        proxy_location.name = "register"
        proxy_location.path_url = "/register"
        proxy_location.ipaddr_dest = "0.0.0.0"
        proxy_location.port_dest = 80
        proxy_location.path_dest = "/chat/session/community_join"
        proxy_location.scheme = "http"

        proxy_location = locations.locations_proxy.new()
        proxy_location.name = "join"
        proxy_location.path_url = "/join"
        proxy_location.ipaddr_dest = "0.0.0.0"
        proxy_location.port_dest = 80
        proxy_location.path_dest = "/chat/session/community_join"
        proxy_location.scheme = "http"

        locations.configure()
        website.configure()
