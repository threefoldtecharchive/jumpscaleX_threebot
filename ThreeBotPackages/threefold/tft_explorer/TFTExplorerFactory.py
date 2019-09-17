from Jumpscale import j


class TFTExplorerFactory(j.baseclasses.object, j.baseclasses.testtools):

    __jslocation__ = "j.threebot.package.tftexplorer"

    def client_get(self):
        """
        j.threebot.package.tftexplorer.client_get()
        :return:
        """
        self.client = j.servers.threebot.local_start_default()

        self.client.actors.package_manager.package_add(
            "threebot_phonebook",
            git_url="https://github.com/threefoldtech/jumpscaleX_threebot/tree/master/ThreeBotPackages/threefold/tft_explorer",
        )

        # self.client.reload(namespace="default")

        return self.client

    def test(self, name=""):
        """
        kosmos -p 'j.threebot.package.tftexplorer.test()'
        """

        self.client_get()

        info = {}
        j.data.serializers.json.dumps(info)

        self.client.actors.tft_explorer.info_load(info)

        # lets now do example where we go over redis interface

        j.shell()

        # print(name)
        # self._test_run(name=name)

        self._log_info("All TESTS DONE")
        return "OK"
