import subprocess
import re
import time

from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def start(self):
        """
        called when the 3bot starts
        :return:
        """

        j.tools.tfsimulation.start(voila=False, background=True, base_url="/simulator/notebook/")
        j.tools.tfsimulation.start(voila=True, background=True, base_url="/simulator/notebook/")

        # find token (sleep for 5 seconds until server starts)
        time.sleep(5)
        t, _ = subprocess.Popen("jupyter notebook list", shell=True, stdout=subprocess.PIPE).communicate()

        token = re.findall(r"token=.*? ", t.decode())[0]

        for port in (443, 80):
            website = self.openresty.get_from_port(port)

            locations = website.locations.get(name=f"simulator_locations_{port}")

            jupyter_proxy_location = locations.get_location_proxy("jupyter")

            jupyter_proxy_location.path_url = "/simulator/notebook/"
            jupyter_proxy_location.ipaddr_dest = "127.0.0.1"
            jupyter_proxy_location.port_dest = 8888
            jupyter_proxy_location.path_dest = "/simulator/notebook/"
            jupyter_proxy_location.scheme = "http"
            website.configure()

        j.data.bcdb.get(name="system")
        print("*********************************************************************************")
        print(f"Simulator Url : /simulator/notebook?{token}")
        print("**********************************************************************************")
        self.openresty.reload()

    def stop(self):
        pass
