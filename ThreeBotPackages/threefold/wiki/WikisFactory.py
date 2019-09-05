from Jumpscale import j


class WikisFactory(j.baseclasses.object, j.baseclasses.testtools):

    __jslocation__ = "j.threebot.package.wikis"

    def install(self):
        """

        """

        server = j.servers.threebot.get("test_wikis")
        server.save()

        package = j.tools.threebot_packages.get(
            "wiki", path=self._dirpath, threebot_server_name="test_wikis"
        )
        package.prepare()
        package.save()
        server.start(web=True, ssl=False)

        self._log_info("All wikis loaded")
        return "OK"
