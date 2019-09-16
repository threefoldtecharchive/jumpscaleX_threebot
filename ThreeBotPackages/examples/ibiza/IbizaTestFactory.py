from Jumpscale import j


class IbizaTestFactory(j.baseclasses.object, j.baseclasses.testtools):

    __jslocation__ = "j.threebot.package.ibiza"

    def test(self, name=""):
        """
        kosmos -p 'j.threebot.package.ibiza.test()'
        """

        self.client = j.servers.threebot.local_start_default()

        # TODO: check the actor is already loaded if not do following:

        self.client.actors.package_manager.package_add(
            "threebot_tftexplorer",
            git_url="https://github.com/threefoldtech/jumpscaleX_threebot/tree/master/ThreeBotPackages/examples/ibiza",
        )

        self.client.reload()

        # lets now do example where we go over redis interface

        j.shell()

        # print(name)
        # self._test_run(name=name)

        self._log_info("All TESTS DONE")
        return "OK"
