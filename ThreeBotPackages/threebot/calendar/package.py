from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    @property
    def bcdb(self):
        return self._package.threebot_server.bcdb_get("calendar")

    def start(self):
        """
        """
        pass

    # TODO: has never worked because there was no package nor factory
