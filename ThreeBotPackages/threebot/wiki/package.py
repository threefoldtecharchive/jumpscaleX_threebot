from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def start(self):
        """
        called when the 3bot starts
        :return:
        """

        # server = self.openresty

        j.core.tools.link(f"{self._dirpath}/static/home", self.openresty.path_web + "/static/home")
        j.core.tools.link(f"{self._dirpath}/static/wiki", self.openresty.path_web + "/static/wiki")

        # TODO: still wrong I think, should be done by a lapsi site I think
        # TODO: there is lots of duplicates here, needs to be done (kristof)
        j.core.tools.link_sub_items(f"{self._dirpath}/lua", self.openresty.path_cfg_dir)

        # website = server.get_from_port(443)
        # locations = website.locations.get("main_wiki")
        #
        # lapis_location = locations.locations_lapis.new()
        # lapis_location.name = "wikis"
        # lapis_location.path_url = "/"
        # lapis_location.path_location = self._dirpath
        #
        # locations.configure()
        # website.configure()
