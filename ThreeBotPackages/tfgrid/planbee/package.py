import re
from Jumpscale import j


DOMAIN = "explorer.testnet.grid.tf"


class Package(j.baseclasses.threebot_package):
    def start(self):
        for port in (443, 80):
            website = self.openresty.websites.get(f"planbee_{port}")
            website.port = port
            website.ssl = port == 443
            website.domain = DOMAIN
            locations = website.locations.get(name=f"planbee_{port}_locations")

            explorer_location = locations.get_location_proxy("explorer")

            explorer_location.path_url = "/explorer/"
            explorer_location.ipaddr_dest = "127.0.0.1"
            explorer_location.port_dest = 8080
            explorer_location.path_dest = "/"
            explorer_location.scheme = "http"
