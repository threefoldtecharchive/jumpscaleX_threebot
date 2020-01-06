from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def prepare(self):
        """
        Dependencies
        """
        package = j.tools.threebot_packages.get("contacts", path=self._dirpath, threebot_server_name=server.name)
        package.prepare()
        package.save()

    def start(self):

        server = self.openresty
        website = server.get_from_port(443)

        locations = website.locations.get("threebotapp_locations")

        website_location = locations.locations_spa.new()
        website_location.name = "contacts"
        website_location.path_url = "/contacts"
        # website_location.use_jumpscale_weblibs = False
        fullpath = j.sal.fs.joinPaths(self.package_root, "html/")
        website_location.path_location = fullpath

        locations.configure()
        website.configure()
