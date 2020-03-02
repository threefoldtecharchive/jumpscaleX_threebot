from Jumpscale import j


class TFDirectoryFactory(j.baseclasses.threebot_factory):

    __jslocation__ = "j.threebot_factories.package.directory"

    def test(self, name=""):
        """
        test the directory
        """

        # FIXME: server is already running
        j.servers.threebot.local_start_explorer(background=True)

        # GET GEDIS CLIENT instead of this call (it blocks now use j.clients.gedis.get)
        # self.client = j.servers.threebot.start()

        client = j.clients.gedis.get("pm", port=8901, package_name="zerobot.packagemanager")
        # TODO: check the actor is already loaded if not do following:
        client.actors.package_manager.package_add(
            path="/sandbox/code/github/threefoldtech/jumpscaleX_threebot/ThreeBotPackages/tfgrid/directory"
        )

        client.reload()
        self._tests_run(name=name, die=True)
