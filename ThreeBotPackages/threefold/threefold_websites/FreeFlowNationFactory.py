from Jumpscale import j


# TODO: this should be the right baseclass
class WebsitesFactory(j.baseclasses.object, j.baseclasses.testtools):

    __jslocation__ = "j.threebot.package.freeflownation_website"

    def install(self, branch="development"):
        """
        install website packages
        """
        self.server = j.servers.threebot.get("freeflownation.org")

        # freeflownation.org
        # TODO: BAD
        threefold_io_package = j.tools.threebot_packages.get(
            "freeflownation.org",
            branch=branch,
            giturl=f"https://github.com/freeflownation/www_freeflownation/tree/{branch}/package",
            threebot_server_name=self.server.name,
        )
        threefold_io_package.prepare()
        threefold_io_package.save()

    def start(self, ssl=True, branch="development"):
        self.install(branch=branch)
        self.server.start(web=True, ssl=ssl)