import subprocess
import re
import time

from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def prepare(self):
        j.servers.notebook.install()

    def start(self):
        """
        called when the 3bot starts
        Open notebook through /threefold/simulator/notebook/
        Open voila directly through /threefold/simulator/show/
        :return:
        """
        j.tools.tfgrid_simulator.start(background=True, base_url="/threefold/simulator/notebook/")

        # find token (sleep for 5 seconds until server starts)
        time.sleep(5)

        for port in (443, 80):
            website = self.openresty.get_from_port(port)

            locations = website.locations.get(name=f"simulator_locations_{port}")

            jupyter_proxy_location = locations.get_location_proxy("jupyter")

            jupyter_proxy_location.path_url = "/threefold/simulator/notebook/"
            jupyter_proxy_location.ipaddr_dest = "127.0.0.1"
            jupyter_proxy_location.port_dest = 8888
            jupyter_proxy_location.path_dest = "/threefold/simulator/notebook/"
            jupyter_proxy_location.scheme = "http"
            jupyter_proxy_location.is_admin = True

            website.configure()

        self.openresty.reload()

    def stop(self):
        j.tools.tfgrid_simulator.stop()
