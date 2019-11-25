from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def prepare(self):
        bcdb = self.bcdb
        j.shell()
        w

    def start(self):
        """
        called when the 3bot starts the package
        :return:
        """
        j.tools.alerthandler.setup()
