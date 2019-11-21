from Jumpscale import j


class TFPhonebookFactory(j.baseclasses.threebot_factory):

    __jslocation__ = "j.threebot.package.phonebook"

    def test(self, name=""):
        """
        kosmos -p 'j.threebot.package.phonebook.test()'
        """

        cl = self.start()

        print(name)

        return "OK"
