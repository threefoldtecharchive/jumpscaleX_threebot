from Jumpscale import j
from os.path import dirname, abspath, join


class Package(j.baseclasses.threebot_package):
    def start(self):
        """
        called when the 3bot starts the package
        :return:
        """
        server = self.openresty
        server.install(reset=False)
        server.configure()

        for port in (443, 80):
            website = server.get_from_port(port)

            locations = website.locations.get("alerta_locations")

            website_location = locations.locations_spa.new()
            website_location.name = "alerta"
            website_location.path_url = "/alerta"
            website_location.use_jumpscale_weblibs = False
            fullpath = j.sal.fs.joinPaths(self.package_root, "html/")
            website_location.path_location = fullpath

            locations.configure()
            website.configure()

            # setup alert handler to intercept errors
            j.tools.alerthandler.setup()
