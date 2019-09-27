from Jumpscale import j


class TFDirectoryFactory(j.baseclasses.threebot_factory):
    __jslocation__ = "j.threebot.package.directory"
    _web = False

    def install(self):
        server = j.servers.threebot.default
        server.save()

        package = j.tools.threebot_packages.get("directory", path=self._dirpath, threebot_server_name=server.name)
        package.prepare()
        package.save()
        return "OK"

    def start(self):
        self.install()
        server = j.servers.threebot.default
        server.start(web=True, ssl=False)

    def test(self, name=""):
        """
        test the directory
        """
        self.client = j.servers.threebot.local_start_default()

        # TODO: check the actor is already loaded if not do following:

        self.client.actors.package_manager.package_add(
            "threebot_phonebook",
            git_url="https://github.com/threefoldtech/jumpscaleX_threebot/tree/master/ThreeBotPackages/threefold/tfgrid_directory",
        )

        self.client.reload()

        print(name)
        self._test_run(name=name)

        self._log_info("All TESTS DONE")
        return "OK"
