from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def _init(self, *args, **kwargs):
        pass

    @property
    def bcdb(self):
        return self.threebot_server.bcdb_get("ffbrowser")

    def prepare(self):
        """
        Dependencies
        """
        pass

    def start(self):
        server = self.openresty
        server.install(reset=False)
        server.configure()

    def stop(self):
        pass

    def uninstall(self):
        """
        Remove Dependencies
        """
