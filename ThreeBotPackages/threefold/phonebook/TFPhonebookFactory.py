from Jumpscale import j


class TFPhonebookFactory(j.baseclasses.object, j.baseclasses.testtools):

    __jslocation__ = "j.threebot.package.phonebook"

    def client_get(self):
        """
        j.threebot.package.phonebook.client_get()
        :return:
        """
        self.client = j.servers.threebot.local_start_default()

        self.client.actors.package_manager.package_add(
            "threebot_phonebook",
            git_url="https://github.com/threefoldtech/jumpscaleX_threebot/tree/master/ThreeBotPackages/threefold/phonebook",
        )

        # self.client.reload(namespace="default")

        return self.client

    def test(self, name=""):
        """
        kosmos -p 'j.threebot.package.phonebook.test()'
        """

        self.client = self.client_get()

        # TODO: check the actor is already loaded if not do following:

        j.shell()

        # print(name)
        # self._test_run(name=name)

        self._log_info("All TESTS DONE")
        return "OK"
