from Jumpscale import j
import gevent
import os

DIR_SYNC_TIME = 3600 * 4


class Package(j.baseclasses.threebot_package):
    def start(self):
        """
        called when the 3bot starts
        :return:
        """
        server = self.openresty

        website = server.get_from_port(443)

        locations = website.locations.get("cockpit_locations")

        website_location = locations.locations_spa.new()
        website_location.name = "grid_directory"
        website_location.path_url = "/grid_directory"
        website_location.use_jumpscale_weblibs = False
        fullpath = j.sal.fs.joinPaths(self.package_root, "frontend/")
        website_location.path_location = fullpath

        locations.configure()
        website.configure()

    def sync_directory(self):
        sync_dir = j.tools.codeloader.load(path=os.path.join(self.package_root, "jobs", "sync_directory.py"))
        queues = ["tfgrid_directory_sync"]

        job = j.servers.myjobs.schedule(sync_dir, return_queues=queues)
        try:
            j.servers.myjobs.wait_queues(queue_names=queues, size=len([job.id]))
        except Exception as e:
            j.errorhandler.exception_handle(e, die=False)

        gevent.spawn_later(DIR_SYNC_TIME, self.sync_directory)
