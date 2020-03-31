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
        j.tools.tfgrid_simulator.simulation_get()

        j.tools.tfgrid_simulator.start(
            voila=False, background=True, base_url="/threefold/simulator/notebook/", port=8888, pname="notebook"
        )
        j.tools.tfgrid_simulator.start(
            voila=True, background=True, base_url="/threefold/simulator/show/", port=8866, pname="simulator"
        )

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
            jupyter_proxy_location.is_auth = True
            # voila
            voila_proxy_location = locations.get_location_proxy("voila")
            voila_proxy_location.path_url = "/threefold/simulator/show/"
            voila_proxy_location.ipaddr_dest = "127.0.0.1"
            voila_proxy_location.port_dest = 8866
            voila_proxy_location.path_dest = "/threefold/simulator/show/"
            voila_proxy_location.scheme = "http"
            voila_proxy_location.is_auth = True

            website.configure()

        self.openresty.reload()

    def stop(self):
        j.tools.tfgrid_simulator.stop(
            voila=False, background=True, base_url="/threefold/simulator/notebook/", pname="notebook"
        )
        j.tools.tfgrid_simulator.stop(
            voila=True, background=True, base_url="/threefold/simulator/show/", pname="simulator"
        )