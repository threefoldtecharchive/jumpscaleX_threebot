import subprocess
import re
import time

from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def start(self):
        for port in (443, 80):
            website = self.openresty.get_from_port(port)
            website.ssl = port == 443
            # website.domain = DOMAIN

            locations = website.locations.get(name=f"stellarcorslocations_{port}")

            include_location = locations.get_location_custom(f"stellarcors_{port}")
            include_location.config = """
                location /.well-known/stellar.toml {
                add_header 'Access-Control-Allow-Origin' '*';
                }
            """

            locations.configure()
            website.configure()

        self.openresty.reload()
