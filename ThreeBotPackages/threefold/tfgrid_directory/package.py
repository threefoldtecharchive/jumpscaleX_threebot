from Jumpscale import j
import gevent
import os

DIR_SYNC_TIME = 3600 * 4


class Package(j.baseclasses.threebot_package):
    @property
    def bcdb(self):
        return self._package.threebot_server.bcdb_get("tf_workloads")

    def prepare(self):
        """
        is called at install time
        :return:
        """
        website = self.openresty.websites.get("directory")
        website.ssl = False
        website.port = 8081
        locations = website.locations.get("directory")

        ## START BOTTLE ACTORS ENDPOINT

        # add gedis http server to the rack
        app = j.servers.gedishttp.get_app()
        self.rack_server.bottle_server_add(name="gedishttp", port=9201, app=app)

        # create location `/actors` to on your website `8081` to forward
        # requests to `9201` where the bottle server is running
        proxy_location = locations.locations_proxy.new()
        proxy_location.name = "gedishttp"
        proxy_location.path_url = "/actors"
        proxy_location.ipaddr_dest = "0.0.0.0"
        proxy_location.port_dest = 9201
        proxy_location.scheme = "http"
        ## END BOTTLE ACTORS ENDPOINT

        locations.configure()
        website.configure()

    def start(self):
        """
        called when the 3bot starts
        :return:
        """
        # start one worker to sync farms
        # j.servers.myjobs.workers_tmux_start(1)
        # gevent.spawn(self.sync_directory)

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
