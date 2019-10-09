from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    @property
    def bcdb(self):
        return self.threebot_server.bcdb_get("ffconnect")

    def start(self):
        server = self.openresty

        website = server.get_from_port(443)
        locations = website.locations.get("locations")

        # # Serve static files
        # website_location = locations.locations_static.new()
        # website_location.name = "ffconnect"
        # website_location.path_url = "/ffconnect"
        # fullpath = j.sal.fs.joinPaths(self.package_root, "static", "ffconnect")
        # website_location.path_location = fullpath
        #
        # locations.configure()
        # website.configure()
