from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def _init(self, **kwargs):
        if "branch" in kwargs.keys():
            self.branch = kwargs["branch"]
        else:
            self.branch = "master"

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

    def prepare(self):
        """
        is called at install time
        :return:
        """
        pass

    def start(self):
        server = self.openresty
        server.install(reset=False)
        server.configure()
        website = server.get_from_port(443)
        locations = website.locations.get("interface_location")

        website_location = locations.locations_spa.new()
        website_location.name = "interface"
        website_location.path_url = "/"
        fullpath = j.sal.fs.joinPaths(self.package_root, "frontend/")
        website_location.path_location = fullpath

        locations.configure()
        website.configure()
        website.save()
