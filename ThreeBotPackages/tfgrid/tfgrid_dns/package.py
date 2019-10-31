from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def _init(self, *args, **kwargs):
        pass

    def start(self):
        """
        called when the 3bot starts
        :return:
        """
        self.gedis_server.actors_add(path=self.package_root + "/actors")
