from Jumpscale import j


class TFTExplorerFactory(j.baseclasses.object, j.baseclasses.testtools):

    __jslocation__ = "j.threebot.package.tftexplorer"

    def test(self, name=""):
        """
        kosmos -p 'j.threebot.package.tftexplorer.test()'
        """

        self.client = j.servers.threebot.local_start_default()

        # TODO: check the actor is already loaded if not do following:

        self.client.actors.package_manager.package_add(
            "threebot_tftexplorer",
            git_url="https://github.com/threefoldtech/jumpscaleX_threebot/tree/master/ThreeBotPackages/threefold/tft_explorer",
        )

        self.client.reload()

        info = {}
        j.data.serializers.json.dumps(info)

        self.client.actors.tft_explorer.info_load(info)

        # lets now do example where we go over redis interface

        j.shell()

        # print(name)
        # self._test_run(name=name)

        self._log_info("All TESTS DONE")
        return "OK"
