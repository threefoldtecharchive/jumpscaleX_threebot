from Jumpscale import j


def load_wiki(name, url):
    wiki = j.tools.markdowndocs.load(path=url, name=name)
    wiki.write()


class Package(j.baseclasses.threebot_package):
    def _init(self, **kwargs):
        if "branch" in kwargs.keys():
            self.branch = kwargs["branch"]
        else:
            self.branch = "master"

    def load(self):

        j.servers.myjobs.schedule(
            load_wiki, "tokens", "https://github.com/threefoldfoundation/info_tokens/tree/%s/docs" % self.branch
        )
        j.servers.myjobs.schedule(
            load_wiki, "foundation", "https://github.com/threefoldfoundation/info_foundation/tree/%s/docs" % self.branch
        )
        j.servers.myjobs.schedule(
            load_wiki, "grid", "https://github.com/threefoldfoundation/info_grid/tree/%s/docs" % self.branch
        )
        j.servers.myjobs.schedule(
            load_wiki, "bettertoken", "https://github.com/BetterToken/info_bettertoken/tree/%s/docs" % self.branch
        )
        j.servers.myjobs.schedule(
            load_wiki, "harvested", "https://github.com/harvested-io/info_harvested.io/tree/%s/docs" % self.branch
        )
        j.servers.myjobs.schedule(
            load_wiki,
            "freeflowevents",
            "https://github.com/freeflownation/info_freeflowevents/tree/%s/docs" % self.branch,
        )

    def prepare(self):
        """
        is called at install time
        :return:
        """
        pass

        #
        # wikis_load_cmd = """
        # from Jumpscale import j
        # j.tools.markdowndocs.load_wikis()
        # """
        # wikis_loader = j.servers.startupcmd.get(
        #     "wikis_loader", cmd_start=wikis_load_cmd, timeout=60 * 60, executor=self.executor, interpreter="python"
        # )
        #
        # if not wikis_loader.is_running():
        #     wikis_loader.start()

    def start(self):
        """
        called when the 3bot starts
        :return:
        """
        j.servers.myjobs.workers_tmux_start()
        self.load()

        server = j.servers.openresty.get("wikis")
        server.install(reset=True)
        server.configure()
        website = server.websites.get("wiki")
        website.ssl = False
        locations = website.locations.get("main_wiki")

        website_location = locations.locations_static.new()
        website_location.name = "static"
        website_location.path_url = "/static"
        website_location.path_location = self._dirpath
        website_location.use_jumpscale_weblibs = True

        lapis_location = locations.locations_lapis.new()
        lapis_location.name = "wikis"
        lapis_location.path_url = "/"
        lapis_location.path_location = self._dirpath

        locations.configure()
        website.configure()
        server.start()

        # TODO: start rack server (port 4442)
        #       and gedis (port 4444)
        #       in tmux? also openresty (because it's blocking)

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
