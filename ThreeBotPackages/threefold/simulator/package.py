import subprocess
import re
import time

from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def start(self):
        """
        called when the 3bot starts
        Open notebook through /simulator/threefold/notebook/
        Open voila directly through /simulator/threefold/show/
        :return:
        """
        j.tools.tfsimulation.start(
            voila=False, background=True, base_url="/simulator/threefold/notebook/", ip="127.0.0.1"
        )
        j.tools.tfsimulation.start(voila=True, background=True, base_url="/simulator/threefold/show/", ip="127.0.0.1")

        # find token (sleep for 5 seconds until server starts)
        time.sleep(5)

        for port in (443, 80):
            website = self.openresty.get_from_port(port)

            locations = website.locations.get(name=f"simulator_locations_{port}")

            jupyter_proxy_location = locations.get_location_proxy("jupyter")

            jupyter_proxy_location.path_url = "/simulator/threefold/notebook/"
            jupyter_proxy_location.ipaddr_dest = "127.0.0.1"
            jupyter_proxy_location.port_dest = 8888
            jupyter_proxy_location.path_dest = "/simulator/threefold/notebook/"
            jupyter_proxy_location.scheme = "http"

            # voila
            voila_proxy_location = locations.get_location_proxy("voila")
            voila_proxy_location.path_url = "/simulator/threefold/show/"
            voila_proxy_location.ipaddr_dest = "127.0.0.1"
            voila_proxy_location.port_dest = 8866
            voila_proxy_location.path_dest = "/simulator/threefold/show/"
            voila_proxy_location.scheme = "http"

            website.configure()

        j.data.bcdb.get(name="system")

        self.openresty.reload()

    def stop(self):
        pass
