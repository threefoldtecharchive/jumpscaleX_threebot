from Jumpscale import j
import gevent
import os

DIR_SYNC_TIME = 3600 * 4


class Package(j.baseclasses.threebot_package):
    @property
    def bcdb(self):
        return self._package.threebot_server.bcdb_get("tf_directory")

    def sync_directory(self):
        sync_dir = j.tools.codeloader.load(path=os.path.join(self.package_root, "jobs", "sync_directory.py"))
        job = j.servers.myjobs.schedule(sync_dir)
        try:
            job.wait()
        except Exception as e:
            j.errorhandler.exception_handle(e, die=False)

        gevent.spawn_later(DIR_SYNC_TIME, self.sync_directory)

    def prepare(self):
        """
        called when the 3bot stops
        :return:
        """
        self.sync_directory()
