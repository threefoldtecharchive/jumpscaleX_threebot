import re
from Jumpscale import j


DOMAIN = "explorer.testnet.grid.tf"


class Package(j.baseclasses.threebot_package):
    def start(self):
        for port in (443, 80):
            website = self.openresty.websites.get(f"tf_directory_{port}")
            website.port = port
            website.ssl = port == 443
            website.domain = DOMAIN
            locations = website.locations.get(name=f"tf_directory_{port}_locations")

            # planbee
            explorer_location = locations.get_location_proxy("tf_directory_explorer_proxy")
            explorer_location.path_url = "/explorer/"
            explorer_location.ipaddr_dest = "127.0.0.1"
            explorer_location.port_dest = 8080
            explorer_location.path_dest = "/"
            explorer_location.scheme = "http"
            # endplanbee

            include_location = locations.get_location_custom(f"tf_directory_includes_{port}")

            # default website locations include wiki related locations
            # so include them
            default_website_name = self.openresty.get_from_port(port).name
            include_location.config = """
            include %s/%s_locations/*.conf;

            location / {
                if ($scheme = http) {
                    rewrite ^ https://$host/tfgrid/directory/;
                }
                if ($scheme = https) {
                    rewrite ^(.+) /tfgrid/directory/;
                }
            }""" % (
                website.path_cfg_dir,
                default_website_name,
            )

            locations.configure()
            website.configure()
