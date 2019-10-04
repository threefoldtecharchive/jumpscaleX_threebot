from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def start(self):
        for pkg in ["interface", "ffbrowser", "contacts", "appstore"]:
            package = j.tools.threebot_packages.get(
                pkg,
                path="/sandbox/code/github/threefoldtech/jumpscaleX_threebot/ThreeBotPackages/threebot/{}/".format(pkg),
            )
