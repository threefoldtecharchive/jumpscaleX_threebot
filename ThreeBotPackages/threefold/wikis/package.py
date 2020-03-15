import re
from Jumpscale import j
from Jumpscale.tools.threegit.ThreeGit import load_wiki

WIKIS = {
    "info_grid": "wiki.grid.tf",
    "info_foundation": "wiki.threefold.tf",
    "info_tokens": "wiki.tokens.tf",
}

BRANCH = "development"
TF_WIKIS_LINKS = {
    "info_grid": f"https://github.com/threefoldfoundation/info_grid/tree/{BRANCH}/docs",
    "info_foundation": f"https://github.com/threefoldfoundation/info_foundation/tree/{BRANCH}/docs",
    "info_tokens": f"https://github.com/threefoldfoundation/info_tokens/tree/{BRANCH}/docs",
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

                include_location = locations.get_location_custom(f"include_{wiki_name}_wiki")
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

        for name, link in TF_WIKIS_LINKS.items():
            j.servers.myjobs.schedule(load_wiki, wiki_name=name, wiki_path=link, reset=True)
