from Jumpscale import j

from .WebdavServer import WebdavServer

JSConfigs = j.application.JSBaseConfigsClass


class WebdavFactory(JSConfigs):

    __jslocation__ = "j.threebot.package.webdav"

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
