from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def start(self):
        self.openresty.install()
        self.openresty.configure()

        for port in (443, 80):
            default_website = self.openresty.get_from_port(port)
            locations = default_website.locations.get(name=f"admin_{port}")

            admin_location = locations.get_location_static("admin")
            admin_location.path_url = "/admin"
            admin_location.path_location = f"{self._dirpath}/output"
            admin_location.is_admin = True

            # another website/server config for /
            root_website = self.openresty.websites.get(f"admin_root_{port}")
            root_website.port = port
            root_website.ssl = port == 443
            root_locations = root_website.locations.get(name=f"admin_root_{port}")

            root_location = root_locations.get_location_static("admin_home")
            root_location.path_url = "/"
            root_location.path_location = f"{self._dirpath}/output"
            root_location.is_admin = True
            # include default website locations
            root_include_location = root_locations.get_location_custom("admin_home_includes")
            root_include_location.config = (
                f"include {default_website.path_cfg_dir}/{default_website.name}_locations/*.conf;"
            )

            default_website.configure()
            root_website.configure()
