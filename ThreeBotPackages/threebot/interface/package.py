from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def start(self):
        server = self.openresty

        website = server.get_from_port(80)
        locations = website.locations.get("interface_location")

        website_location = locations.locations_spa.new()
        website_location.name = "interface"
        website_location.path_url = "/"

        website_location.path_location = j.clients.git.getContentPathFromURLorPath(
            "https://github.com/jimbertools/3botui_builds.git"
        )

        locations.configure()
        website.configure()
        website.save()
