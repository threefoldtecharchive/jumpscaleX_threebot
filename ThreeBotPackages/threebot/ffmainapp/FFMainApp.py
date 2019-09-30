from Jumpscale import j
import os


class FFMainApp(j.baseclasses.object, j.baseclasses.testtools):

    __jslocation__ = "j.threebot.package.ffmainapp"

    def install(self):
        server = j.servers.threebot.default
        website = server.openresty_server.get_from_port(80)
        website.ssl = False

        website.save()
        website.configure()

        for pkg in ["ffbrowser", "interface"]:
            print("DIIR PATH: ", self._dirpath)
            package = j.tools.threebot_packages.get(pkg, path=os.path.join(os.path.dirname(self._dirpath), pkg), threebot_server_name=server.name)
            package.prepare()
            package.start()
            package.save()
        return "OK"

    def start(self):
        self.install()
        server = j.servers.threebot.default
        server.start(web=True, ssl=False)

    def test(self, name=""):
        pass