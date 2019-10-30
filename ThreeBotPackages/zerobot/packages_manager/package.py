from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def start(self):
        """
        called when the 3bot starts
        :return:
        """
        server = self.openresty
        server.install(reset=False)
        server.configure()
        for port in (443, 80):
            website = server.get_from_port(port)
            locations = website.locations.get("packages_locations")
            website_location = locations.locations_spa.new()
            website_location.name = "packages"
            website_location.path_url = "/packages"
            website_location.use_jumpscale_weblibs = True
            fullpath = j.sal.fs.joinPaths(self.package_root, "html/")
            website_location.path_location = fullpath
            locations.configure()
            website.configure()
