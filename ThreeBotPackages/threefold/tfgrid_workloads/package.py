from Jumpscale import j
import os


class Package(j.baseclasses.threebot_package):
    def _init(self, **kwargs):
        self.workloads_bcdb = self._package.threebot_server.bcdb_get("tf_workloads")
        self.phonebook_bcdb = self._package.threebot_server.bcdb_get("threebot_phonebook")

    def prepare(self):
        """
        is called at install time
        :return:
        """
        phonebook_models_path = os.path.join(os.path.dirname(self.package_root), "phonebook/models")
        self.workloads_bcdb.models_add(path=self.package_root + "/models")
        self.phonebook_bcdb.models_add(path=phonebook_models_path)

    def start(self):
        """
        called when the 3bot starts
        :return:
        """
        self.gedis_server.actors_add(j.sal.fs.joinPaths(self.package_root, "actors"))

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
        self.workloads_bcdb.destroy()
