from Jumpscale import j


class ChatFactory(j.baseclasses.object, j.baseclasses.testtools):

    __jslocation__ = "j.threebot.package.chat"

    def install(self):
        """

        """

        server = j.servers.threebot.default
        server.save()

        package = j.tools.threebot_packages.get("chat", path=self._dirpath)
        package.prepare()
        package.save()
        self._log_info("chat package loaded")

        return "OK"

    def start(self, ssl=False):
        self.install()
        server = j.servers.threebot.default
        server.start(web=True, ssl=ssl)
