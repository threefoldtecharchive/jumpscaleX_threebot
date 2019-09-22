from Jumpscale import j
import os


class WorkloadManagerFactory(j.baseclasses.object, j.baseclasses.testtools):

    __jslocation__ = "j.threebot.package.workloadmanager"

    def test(self, name=""):
        """

        kosmos 'j.threebot.package.workloadmanager.test()'

        """
        try:
            tf_workloads_bcdb = j.data.bcdb.get("tf_workloads")
        except:
            tf_workloads_bcdb = j.data.bcdb.new("tf_workloads")

        try:
            threebot_phonebook_bcdb = j.data.bcdb.get("threebot_phonebook")
        except:
            threebot_phonebook_bcdb = j.data.bcdb.new("threebot_phonebook")

        basepath = os.path.dirname(os.path.dirname(__file__))
        tf_workloads_bcdb.models_add(os.path.join(basepath, "tfgrid_workloads/models"))
        threebot_phonebook_bcdb.models_add(os.path.join(basepath, "phonebook/models"))

        basepath = os.path.dirname(os.path.dirname(__file__))
        self.client = j.servers.threebot.local_start_default()
        self.client.actors.package_manager.package_add("tf_workloads", os.path.join(basepath, "tfgrid_workloads"))
        self.client.actors.package_manager.package_add("threebot_phonebook", os.path.join(basepath, "phonebook"))

        self.client.reload()

        print(name)
        self._test_run(name=name)

        self._log_info("All TESTS DONE")
        return "OK"
