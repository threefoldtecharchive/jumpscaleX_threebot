from Jumpscale import j


class TFPhonebookFactory(j.baseclasses.threebot_factory):

    __jslocation__ = "j.threebot.package.phonebook"

    def client_get(self):
        """
        j.threebot.package.phonebook.client_get()
        :return:
        """
        self.client = j.servers.threebot.local_start_default(web=True)

        return self.client

    def test(self, name=""):
        """
        kosmos -p 'j.threebot.package.phonebook.test()'
        """
        cmd = "kosmos -p 'j.threebot.package.phonebook.test()"
        test_start = j.servers.startupcmd.get("phonebook_test", cmd_start=cmd)
        test_start.start()
        cl = self.client_get()
        j.shell()

        print(name)

        return "OK"
