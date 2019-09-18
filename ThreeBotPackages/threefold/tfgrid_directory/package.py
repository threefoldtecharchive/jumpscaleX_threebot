from Jumpscale import j
import gevent
import os

DIR_SYNC_TIME = 3600 * 4


class Package(j.baseclasses.threebot_package):
    def _init(self, **kwargs):
        self.bcdb = self._package.threebot_server.bcdb_get("tf_directory")
        self._sync_dir = j.tools.codeloader.load(path=os.path.join(self.package_root, "jobs", "sync_directory.py"))

    def prepare(self):
        """
        is called at install time
        :return:
        """
        pass

    def start(self):
        """
        called when the 3bot starts
        :return:
        """
        self.bcdb.models_add(path=self.package_root + "/models")
        # start one worker to sync farms
        j.servers.myjobs.workers_tmux_start(1)
        gevent.spawn(self.sync_directory)

        self.gedis_server.actors_add(j.sal.fs.joinPaths(self.package_root, "actors"))

    def sync_directory(self):
        job = j.servers.myjobs.schedule(self._sync_dir)
        try:
            job.wait()
        except Exception as e:
            j.errorhandler.exception_handle(e, die=False)

        gevent.spawn_later(DIR_SYNC_TIME, self.sync_directory)

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
