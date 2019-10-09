from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def _init(self, **kwargs):
        self.bcdb = self._package.threebot_server.bcdb_get("tft_explorer")
