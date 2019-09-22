from Jumpscale import j


class WebdavFactory(j.baseclasses.object, j.baseclasses.testtools):

    __jslocation__ = "j.threebot.package.webdav"

    def install(self):
        server = j.servers.threebot.default
        server.save()

        package = j.tools.threebot_packages.get("webdav", path=self._dirpath, threebot_server_name=server.name)
        package.prepare()
        package.save()
        self._log_info("webdav loaded")

        return "OK"

    def start(self):
        self.install()
        server = j.servers.threebot.default
        server.start(web=True, ssl=False)

    def test(self, name=""):
        self.client = j.servers.threebot.local_start_default()

        if not j.tools.threebot_packages.exists("threebot_webdav"):
            self.client.actors.package_manager.package_add(
                "threebot_webdav",
                git_url="https://github.com/threefoldtech/jumpscaleX_threebot/tree/master/ThreeBotPackages/webdav",
            )
        self.client.reload()
        print(name)
        self._test_run(name=name)

        self._log_info("All TESTS DONE")
        return "OK"
