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

        website = server.get_from_port(443)

        locations = website.locations.get("community_location")

        website_location = locations.locations_spa.new()
        website_location.name = "community"
        website_location.path_url = "/community"
        website_location.use_jumpscale_weblibs = False
        fullpath = j.sal.fs.joinPaths(self.package_root, "html/")
        website_location.path_location = fullpath

        locations.configure()
        website.configure()
