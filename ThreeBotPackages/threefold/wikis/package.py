import re

from Jumpscale import j


WIKIS = {"info_threefold": ["wiki.threefold.io"], "info_tfgridsdk": ["wiki.grid.tf"]}

BRANCH = "development"
HOST = "github.com"
ORG = "threefoldfoundation"


def build_mdbook(path):
    j.sal.process.execute(f"cd {path} && mdbook build")


def get_repo_url(name):
    return f"https://{HOST}/{ORG}/{name}"


def webhook_handler(payload):
    name = payload["repository"]["name"]
    path = j.clients.git.getContentPathFromURLorPath(get_repo_url(name))
    build_mdbook(path)


class Package(j.baseclasses.threebot_package):
    def install(self):
        # make sure they're ready during  installation
        for name in WIKIS.keys():
            j.clients.git.getContentPathFromURLorPath(get_repo_url(name), branch=BRANCH, pull=True)

    def start(self):
        for name, domains in WIKIS.items():
            url = get_repo_url(name)
            path = j.clients.git.getContentPathFromURLorPath(url)
            build_mdbook(path)

            for domain in domains:
                for port in (80, 443):
                    domain_without_dots = domain.replace(".", "_")
                    website_name = f"{name}_{domain_without_dots}_{port}"
                    website = self.openresty.websites.get(website_name)
                    website.port = port
                    website.ssl = port == 443
                    website.domain = domain

                    locations = website.locations.get(name=f"{website_name}_locations")

                    static_location = locations.get_location_static(f"{website_name}_root")
                    static_location.path_url = "/"
                    static_location.path_location = j.sal.fs.joinPaths(path, "book")

                    default_website = self.openresty.get_from_port(port)
                    include_location = locations.get_location_custom(f"{website_name}_include")
                    include_location.config = (
                        f"include {default_website.path_cfg_dir}/{default_website.name}_locations/*.conf;"
                    )

                    locations.configure()
                    website.configure()

                    default_locations = default_website.locations.get(f"{website_name}_locations_default")

                    default_static_location = default_locations.get_location_static(f"{static_location.name}_default")
                    default_static_location.path_url = f"/threefold/{name}"
                    default_static_location.path_location = j.sal.fs.joinPaths(path, "book")

                    default_locations.configure()
                    default_website.configure()

            # add a handler for github webhooks for every wiki
            # https://github.com/threefoldtech/jumpscaleX_threebot/tree/unstable/ThreeBotPackages/zerobot/webhooks/wiki
            j.tools.packages.github_webhooks.register_handler(f"{ORG}/{name}", webhook_handler)
