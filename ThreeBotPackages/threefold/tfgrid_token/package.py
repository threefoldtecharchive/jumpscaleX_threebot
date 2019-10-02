from Jumpscale import j
import gevent
import os

DIR_SYNC_TIME = 3600 * 4


class Package(j.baseclasses.threebot_package):
    def _init(self, **kwargs):
        self.bcdb = self._package.threebot_server.bcdb_get("tf_grid_token")

    def prepare(self):
        """
        is called at install time
        :return:
        """

    def _fill_dummy_data(self):
        self.token_model = self.bcdb.model_get(url="tfgrid.token.1")
        j.data.time.epoch - (3600 * 24 * 7) < int(s.st_mtime)

    def start(self):
        """
        called when the 3bot starts
        :return:
        """
        self.bcdb.models_add(path=self.package_root + "/models")
        self.gedis_server.actors_add(self.package_root + "/actors", namespace="token")

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
