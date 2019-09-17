from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def _init(self, **kwargs):
        if "branch" in kwargs.keys():
            self.branch = kwargs["branch"]
        else:
            self.branch = "development"

        self.threefold_io_repo = "https://github.com/threefoldfoundation/www_threefold.io_new"

    def prepare(self):
        """
        called when the 3bot starts
        :return:
        """

        server = j.servers.openresty.get("websites")
        server.install(reset=False)
        server.configure()
        website = server.websites.get("threefold.io")
        website.ssl = False
        website.port = 80
        locations = website.locations.get("threefold.io")

        website_location = locations.locations_static.new()
        website_location.name = "threefold"
        website_location.path_url = "/"
        website_location.use_jumpscale_weblibs = True

        path = j.clients.git.getContentPathFromURLorPath(self.threefold_io_repo, branch=self.branch, pull=True)
        j.sal.fs.chown(path, "www", "www")
        website_location.path_location = path

        self.gedis_server.actors_add(j.sal.fs.joinPaths(self.package_root, "actors"))

        rack = j.servers.rack.get()
        app = j.servers.gedishttp.get_app()
        rack.bottle_server_add(name="gedishttp", port=7780, app=app)

        proxy_location = locations.locations_proxy.new()
        proxy_location.name = "gedishttp"
        proxy_location.path_url = "/actors"
        proxy_location.ipaddr_dest = "0.0.0.0"
        proxy_location.port_dest = 7780
        proxy_location.scheme = "http"

        locations.configure()
        website.configure()

    def start(self):
        """
        called when the 3bot starts
        :return:
        """
        server = j.servers.openresty.get("websites")
        server.start()

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
        pass
