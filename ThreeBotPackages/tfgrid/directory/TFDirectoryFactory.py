from Jumpscale import j


class TFDirectoryFactory(j.baseclasses.threebot_factory):

    __jslocation__ = "j.threebot.package.directory"

    def test(self, name=""):
        """
        test the directory
        """

        # FIXME: server is already running
        # GET GEDIS CLIENT instead of this call (it blocks now use j.clients.gedis.get)
        # self.client = j.servers.threebot.local_start_default()
        client = j.clients.gedis.get("myclient", port=8901)

        # TODO: check the actor is already loaded if not do following:

        self.client.actors.package_manager.package_add(
            git_url="https://github.com/threefoldtech/jumpscaleX_threebot/tree/master/ThreeBotPackages/threefold/tfgrid_directory"
        )

        self.client.reload()

        print(name)
        self._test_run(name=name)

        self._log_info("All TESTS DONE")
        return "OK"
