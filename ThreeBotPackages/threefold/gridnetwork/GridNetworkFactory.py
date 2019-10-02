from Jumpscale import j


class GridNetworkFactory(j.baseclasses.object, j.baseclasses.testtools):

    __jslocation__ = "j.threebot.package.grid_network"

    def install(self):

        server = j.servers.threebot.default
        server.save()

        package = j.tools.threebot_packages.get("gridnetwork", path=self._dirpath)
        package.prepare()
        package.save()
        self._log_info("gridnetwork package loaded")

        return "OK"

    def start(self):
        self.install()
        server = j.servers.threebot.default
        server.start(web=False, ssl=False)
