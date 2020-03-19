from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def start(self):
        self.openresty.install()
        self.openresty.configure()

        for port in (443, 80):
            website = self.openresty.get_from_port(port)
            locations = website.locations.get(name=f"admin_{port}")

            admin_location = locations.get_location_static("admin")
            admin_location.path_url = "/"
            admin_location.path_location = f"{self._dirpath}/output"
            admin_location.is_auth = True
