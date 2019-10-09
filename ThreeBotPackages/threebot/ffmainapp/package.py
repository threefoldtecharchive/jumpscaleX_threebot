from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def prepare(self):
        # install other packages
        for name in ["interface", "ffbrowser", "contacts", "appstore"]:
            path = "../%s/%s" % (self.package_root, name)
            self.client.actors_default.package_manager.package_add(path=path)
