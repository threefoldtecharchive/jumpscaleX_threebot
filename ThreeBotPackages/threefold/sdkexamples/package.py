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
        Open notebook through /threefold/sdkexamples/notebook/
        :return:
        """
        j.tools.tfgrid_simulator.simulation_get()

        j.tools.tfgrid_simulator.start(
            voila=False,
            background=True,
            base_url="/threefold/sdkexamples/notebook/", port=7809, pname="sdkexamples", path_source="{DIR_CODE}/github/threefoldtech/jumpscaleX_libs_extra/JumpscaleLibsExtra/tools/threefold_simulation/sdk_examples"
        )

        time.sleep(5)

        for port in (443, 80):
            website = self.openresty.get_from_port(port)

            locations = website.locations.get(name=f"sdk_examples_{port}")

            jupyter_proxy_location = locations.get_location_proxy(f"sdk_examples_{port}")

            jupyter_proxy_location.path_url = "/threefold/sdkexamples/notebook/"
            jupyter_proxy_location.ipaddr_dest = "127.0.0.1"
            jupyter_proxy_location.port_dest = 7809
            jupyter_proxy_location.path_dest = "/threefold/sdkexamples/notebook/"
            jupyter_proxy_location.scheme = "http"
            jupyter_proxy_location.is_auth = True
            locations.configure()
            website.configure()

        self.openresty.reload()

    def stop(self):
        j.tools.tfgrid_simulator.stop(
            voila=False, background=True, base_url="/threefold/sdkexamples/notebook/", pname="sdkexamples"
        )
    