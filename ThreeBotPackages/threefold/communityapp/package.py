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


        for port in [80, 443]:
            website = server.get_from_port(port)

            locations = website.locations.get("community_location")
            # adding blogs static assests

            website_location = locations.locations_static.new()
            website_location.name = "community"
            website_location.name = f"/community"
            website_location.path_url = f"/community"
            fullpath = j.sal.fs.joinPaths(self.package_root, "static/")
            website_location.use_jumpscale_weblibs = True
            website_location.path_location = fullpath

            locations.configure()
            website.configure()
