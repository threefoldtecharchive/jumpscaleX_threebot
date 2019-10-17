from Jumpscale import j
import os


class Package(j.baseclasses.threebot_package):
    def _init(self, **kwargs):
        # CHANGE ME (default 1: development mode will serve at /location-example)
        os.environ["dev"] = "1"
        self.DEV = os.environ.get("dev")

    def prepare(self):
        """
        is called at install time
        :return:
        """
        prepare_cmd = f"""
        cd {self.package_root}
        pushd newproject
        export dev={self.DEV}
        npm install
        npm run build
        popd
        cp newproject/dist/* html/ -R
        """
        j.sal.process.execute(prepare_cmd)

    def start(self):
        """
        called when the 3bot starts
        :return:
        """
        server = self.openresty
        server.install(reset=False)
        server.configure()

        website = server.get_from_port(443)

        locations = website.locations.get("vuejs_locations")

        website_location = locations.locations_spa.new()
        website_location.name = "vuejs"
        if self.DEV == "1":
            website_location.path_url = "/location-example"
        else:
            website_location.path_url = "/"
        website_location.use_jumpscale_weblibs = False
        fullpath = j.sal.fs.joinPaths(self.package_root, "html/")
        website_location.path_location = fullpath

        locations.configure()
        website.configure()
