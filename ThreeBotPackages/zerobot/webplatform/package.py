from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    @property
    def bcdb(self):
        return self.threebot_server.bcdb_get("users")

    def prepare(self):
        """
        """

    def start(self):       
        #This should be cleaned up, but it works for now. 
        self.bcdb.models_add(path=self.package_root + "/models")
        self.gedis_server.actors_add(path=self.package_root + "/actors")

        server = self.openresty
        server.install(reset=False)
        server.configure()
        website = server.get_from_port(443)
        locations = website.locations.get("interface_location")

        website_location = locations.locations_spa.new()
        website_location.name = "interface"
        website_location.path_url = "/"
        fullpath = j.sal.fs.joinPaths(self.package_root, "html/")
        website_location.path_location = fullpath

        locations.configure()
        website.configure()
        website.save()

    def stop(self):
        pass

    def uninstall(self):
        """
        Remove Dependencies
        """