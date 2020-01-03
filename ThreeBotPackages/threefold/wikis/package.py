import re
from Jumpscale import j

MAIN_DOMAIN = r"wiki.tf"
WIKIS = ["grid", "foundation", "tokens", "freeflowevents"]


class Package(j.baseclasses.threebot_package):
    def start(self):
        for port in (443, 80):
            for wiki in WIKIS:
                website = self.openresty.websites.get(name=f"threefold_{wiki}_{port}")
                website.port = port
                website.domain = fr"(?<sub>{wiki})\.{re.escape(MAIN_DOMAIN)}"
                website.ssl = port == 443

                locations = website.locations.get(name=f"threefold_{wiki}_{port}")
                redirect_location = locations.locations_custom.new()
                redirect_location.name = f"wiki_from_hostname_{port}"
                redirect_location.config = f"""
                    return 301 $scheme://{MAIN_DOMAIN}/wiki/$sub;
                """
                locations.configure()
                website.configure()
