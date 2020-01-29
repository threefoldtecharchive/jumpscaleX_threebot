import re
from Jumpscale import j

WIKIS = {
    "grid": "wiki.grid.tf",
    "foundation": "wiki.threefold.tf",
    "tokens": "wiki.tokens.tf",
}


class Package(j.baseclasses.threebot_package):
    def start(self):

        for wiki_name, wiki_domain in WIKIS.items():
            for port in (443, 80):
                website = self.openresty.websites.get(f"threefold_wiki_{wiki_name}_{port}")
                website.port = port
                website.ssl = port == 443
                website.domain = wiki_domain
                locations = website.locations.get(name=f"{wiki_name}_wiki_locations_{port}")

                include_location = locations.locations_custom.new()
                include_location.name = f"include_{wiki_name}_wiki"
                # default website locations include wiki related locations
                # so include them
                default_website_name = self.openresty.get_from_port(port).name
                include_location.config = f"""
                include {website.path_cfg_dir}/{default_website_name}_locations/*.conf;

                location / {{
                    rewrite ^(.+) /wiki/{wiki_name};
                }}"""

                locations.configure()
                website.configure()
