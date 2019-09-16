from Jumpscale import j


class WebsitesFactory(j.baseclasses.object, j.baseclasses.testtools):

    __jslocation__ = "j.threebot.package.websites"

    def install(self):
        """

        """

        server = j.servers.threebot.default
        server.save()

        package = j.tools.threebot_packages.get("websites", path=self._dirpath, threebot_server_name=server.name)
        package.prepare()
        package.save()

    def start(self, ssl=False):
        self.install()
        server = j.servers.threebot.default
        server.start(web=True, ssl=ssl)
