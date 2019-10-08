from Jumpscale import j


def load_wiki(**kwargs):
    wiki = j.tools.markdowndocs.load(path=kwargs["url"], name=kwargs["repo"])
    wiki.write()


class Package(j.baseclasses.threebot_package):
    def _init(self, **kwargs):
        if "branch" in kwargs.keys():
            self.branch = kwargs["branch"]
        else:
            self.branch = "master"

    @property
    def bcdb(self):
        return j.data.bcdb.system

    def load(self):

        j.servers.myjobs.schedule(
            load_wiki,
            repo="tokens",
            url="https://github.com/threefoldfoundation/info_tokens/tree/%s/docs" % self.branch,
        )
        j.servers.myjobs.schedule(
            load_wiki,
            repo="foundation",
            url="https://github.com/threefoldfoundation/info_foundation/tree/%s/docs" % self.branch,
        )
        j.servers.myjobs.schedule(
            load_wiki, repo="grid", url="https://github.com/threefoldfoundation/info_grid/tree/%s/docs" % self.branch
        )
        j.servers.myjobs.schedule(
            load_wiki,
            repo="bettertoken",
            url="https://github.com/BetterToken/info_bettertoken/tree/%s/docs" % self.branch,
        )
        j.servers.myjobs.schedule(
            load_wiki,
            repo="harvested",
            url="https://github.com/harvested-io/info_harvested.io/tree/%s/docs" % self.branch,
        )
        j.servers.myjobs.schedule(
            load_wiki,
            repo="freeflowevents",
            url="https://github.com/freeflownation/info_freeflowevents/tree/%s/docs" % self.branch,
        )
        j.servers.myjobs.schedule(
            load_wiki,
            repo="test",
            url="https://github.com/threefoldtech/jumpscaleX_threebot/tree/development/examples/docs",
        )

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
        j.servers.myjobs.workers_tmux_start()
        self.load()
        server = self.openresty

        website = server.get_from_port(443)
        locations = website.locations.get("main_wiki")

        website_location = locations.locations_static.new()
        website_location.name = "static"
        website_location.path_url = "/static"
        website_location.path_location = f"{self._dirpath}/static"
        website_location.use_jumpscale_weblibs = True

        lapis_location = locations.locations_lapis.new()
        lapis_location.name = "wikis"
        lapis_location.path_url = "/"
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
