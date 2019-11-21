from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def _init(self, **kwargs):
        self.branch = kwargs["package"].branch or "master"

    @property
    def bcdb(self):
        return self._package.threebot_server.bcdb_get("threebot_registry")
