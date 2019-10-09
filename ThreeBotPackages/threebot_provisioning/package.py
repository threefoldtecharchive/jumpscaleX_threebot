from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def prepare(self):
        """
        is called at install time
        :return:
        """
        # will add the required package
        path = "../%s/chat" % (self.package_root)
        self.client.actors_default.package_manager.package_add(path=path)
