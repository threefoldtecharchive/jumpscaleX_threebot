from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def start(self):
        """
        called when the 3bot starts
        :return:
        """

        server = self.openresty

        website = server.get_from_port(port=80)
        website.ssl = False
        locations = website.locations.get("static")

        j.core.tools.link(f"{self._dirpath}/static/chat", self.openresty.path_web + "/static/chat")

        # website_location = locations.locations_static.new()
        # website_location.name = "static"
        # website_location.path_url = "/static"
        # website_location.path_location = f"{self._dirpath}/static"

        lapis_location = locations.locations_lapis.new()
        lapis_location.name = "chat"
        lapis_location.path_url = "/chat"
        lapis_location.path_location = self._dirpath + "/lapis"

        # TODO: prob not needed, if lapis location adds the lua fine to openresty
        # j.core.tools.link(f"{self._dirpath}/views/chat", self.openresty.path_web_cfg + "/views/chat")

        locations.configure()
        website.configure()
