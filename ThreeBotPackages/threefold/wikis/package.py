import re

from Jumpscale import j


WIKIS = {"info_threefold": "wiki.threefold.io", "info_tfgridsdk": "wiki.grid.tf"}

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
        for name, domain in WIKIS.items():
            url = get_repo_url(name)
            for port in (443, 80):
                website = self.openresty.websites.get(f"{name}_wiki_{port}")
                website.port = port
                website.ssl = port == 443
                website.domain = domain
                locations = website.locations.get(name=f"{name}_wiki_locations_{port}")

                static_location = locations.get_location_static("book_location")
                static_location.path_url = "/"
                static_location.path_location = j.sal.fs.joinPaths(
                    j.clients.git.getContentPathFromURLorPath(url), "book"
                )
                locations.configure()
                website.configure()

            # add a handler for github webhooks for every wiki
            # https://github.com/threefoldtech/jumpscaleX_threebot/tree/unstable/ThreeBotPackages/zerobot/webhooks/wiki
            j.tools.packages.github_webhooks.register_handler(f"{ORG}/{name}", webhook_handler)
