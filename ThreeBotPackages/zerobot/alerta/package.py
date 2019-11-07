from Jumpscale import j
from os.path import dirname, abspath, join


class Package(j.baseclasses.threebot_package):
    def start(self):
        """
        called when the 3bot starts the package
        :return:
        """
        server = self.openresty
        server.install(reset=False)
        server.configure()

        # setup alert handler to intercept errors
        j.tools.alerthandler.setup()
