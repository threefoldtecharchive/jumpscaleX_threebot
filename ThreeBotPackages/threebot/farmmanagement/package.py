from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def prepare(self):
        """
        is called at install time
        :return:
        """
        pass

    def start(self):
        """
        called when the 3bot starts
        :return:
        """
        ## TODO: BAD
        # self.db.models_add(path=self.package_root + "/models")
        # self.gedis_server.actors_add(j.sal.fs.joinPaths(self.package_root, "actors"))

        server = self.openresty

        website = server.get_from_port(443)

        locations = website.locations.get("threebotapp_locations")

        website_location = locations.locations_spa.new()
        website_location.name = "farmmanagement"
        website_location.path_url = "/farmmanagement"
        # website_location.use_jumpscale_weblibs = False
        fullpath = j.sal.fs.joinPaths(self.package_root, "html/")
        website_location.path_location = fullpath

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
