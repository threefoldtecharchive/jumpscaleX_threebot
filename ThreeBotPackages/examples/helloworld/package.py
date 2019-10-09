from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    @property
    def bcdb(self):
        return self._package.threebot_server.bcdb_get("helloworld")

    def prepare(self):
        """
        Dependencies
        """
        j.builders.runtimes.python3.pip_package_install("filetype")

        website = self.openresty.websites.get("helloworld")
        website.ssl = True
        website.port = 8081

        locations = website.locations.get("helloworld")

        website_location = locations.locations_static.new()
        website_location.name = "static"
        website_location.path_url = "/"
        fullpath = j.sal.fs.joinPaths(self.package_root, "static/")
        website_location.path_location = fullpath

        locations.configure()
        website.configure()

    def uninstall(self):
        """
        Remove Dependencies
        """
        j.builders.runtimes.python3.pip_package_uninstall("filetype")
