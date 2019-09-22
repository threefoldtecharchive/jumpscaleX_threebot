from Jumpscale import j



class Package(j.baseclasses.threebot_package):

    def prepare(self):
        """
        is called at install time
        :return:
        """
        pass



    def start(self, **kwargs):
        """
        called when the 3bot starts
        :return:
        """

        server = self.openresty
        server.configure()
        port = kwargs.get("port", 80)
        domain = kwargs.get("domain", None)
        website = server.get_from_port(port=port, domain=domain)
        website.ssl = False
        locations = website.locations.get("main_chat")

        website_location = locations.locations_static.new()
        website_location.name = "static"
        website_location.path_url = "/static"
        website_location.path_location = f"{self._dirpath}/static"
        website_location.use_jumpscale_weblibs = True

        lapis_location = locations.locations_lapis.new()
        lapis_location.name = "chat"
        lapis_location.path_url = "/chat"
        lapis_location.path_location = self._dirpath

        locations.configure()
        website.configure()

    def stop(self):
        """
        called when the 3bot stops
        :return:
        """
        pass

    def uninstall(self):
        """
        called when the package is no longer needed and will be removed from the threebot
        :return:
        """
        # TODO: clean up bcdb ?
        pass
