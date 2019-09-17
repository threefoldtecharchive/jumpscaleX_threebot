from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def _init(self, **kwargs):
        self.bcdb = self._package.threebot_server.bcdb_get("test")

    def prepare(self):
        """
        is called at install time
        :return:


        """

    def start(self):
        """
        called when the 3bot starts
        :return:
        """

        self.bcdb.models_add(path=self.package_root + "/models")
        self.gedis_server.actors_add(self.package_root + "/actors", namespace="ibiza")

    def stop(self):
        """
        called when the 3bot stops
        :return:
        """
        pass

    def uninstall(self):
        """
        called when the package is no longer needed and will be removed from the threebot
        :return:
        """
        # TODO: clean up bcdb ?
        pass
