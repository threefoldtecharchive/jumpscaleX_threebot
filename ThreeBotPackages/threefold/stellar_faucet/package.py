
from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def start(self):
        server = self.openresty
        server.install(reset=False)
        server.configure()

        # for port in (443, 80):
        #     website = server.get_from_port(port)

        #     locations = website.locations.get()

        #     website_location = locations.locations_spa.new()
        #     website_location.name = "stellar_faucet"
        #     website_location.path_url = "/stellar_faucet"


        #     locations.configure()
        #     website.configure()

    