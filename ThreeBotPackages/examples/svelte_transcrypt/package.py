import os

from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def prepare(self):
        """
        Dependencies
        """
        j.builders.runtimes.python3.pip_package_install("transcrypt")
        j.builders.system.package.update()
        j.builders.runtimes.nodejs.install()

        # build
        current_dir = os.path.dirname(os.path.abspath(__file__))
        frontend = os.path.join(os.path.abspath(current_dir), 'front')
        target = os.path.join(frontend, '__target__')
        hello = os.path.join(frontend, 'hello.py')

        cmd = f"rm -rf {target} && cd {frontend} && transcrypt -n hello.py && cp __target__/* src/hello -a && npm install"
        j.sal.process.executeInteractive(cmd)

        for port in (443, 80):
            website = self.openresty.get_from_port(port)

            locations = website.locations.get(name=f"svelete_transcrypt{port}")

            svelte_proxy_location = locations.get_location_proxy("svelte")

            svelte_proxy_location.path_url = "/transcrypt/"
            svelte_proxy_location.ipaddr_dest = "127.0.0.1"
            svelte_proxy_location.port_dest = 3000
            svelte_proxy_location.path_dest = ""
            svelte_proxy_location.scheme = "http"
            website.configure()

    def start(self):
        current_dir = os.path.dirname(os.path.abspath(__file__))

        backend = os.path.join(os.path.abspath(current_dir), 'back', 'server.py')
        cmd_start = f"kosmos -p {backend}"
        cmd = j.servers.startupcmd.get("svelte_back", cmd_start=cmd_start)
        cmd.start()

        frontend = os.path.join(os.path.abspath(current_dir), 'front')
        cmd_start = f"npm run dev --prefix {frontend}"
        cmd = j.servers.startupcmd.get("svelete_front", cmd_start=cmd_start)
        cmd.start()

    def stop(self):
        pass

    def uninstall(self):
        """
        Remove Dependencies
        """
        j.builders.runtimes.python3.pip_package_uninstall("filetype")
