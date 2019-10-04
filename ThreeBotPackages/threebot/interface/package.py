from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def start(self):
        server = self.openresty
        server.install(reset=False)
        server.configure()
        website = server.get_from_port(443)
        locations = website.locations.get()

        website_location = locations.locations_spa.new()
        website_location.name = "interface"
        website_location.path_url = "/"
        fullpath = j.sal.fs.joinPaths(self.package_root, "html")
        website_location.path_location = fullpath

        locations.configure()
        website.configure()
        website.save()
