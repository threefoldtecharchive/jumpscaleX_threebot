from Jumpscale import j


class WebsitesFactory(j.baseclasses.object, j.baseclasses.testtools):

    __jslocation__ = "j.threebot.package.websites"

    def install(self, branch="development"):
        """
        install website packages
        """
        server = j.servers.threebot.default
        server.save()

        # threefold.io
        threefold_io_package = j.tools.threebot_packages.get(
            "threefold.io",
            branch=branch,
            giturl=f"https://github.com/threefoldfoundation/www_threefold.io_new/tree/{branch}/package",
            threebot_server_name=server.name,
        )
        threefold_io_package.prepare()
        threefold_io_package.save()

    def start(self, ssl=False, branch="development"):
        self.install(branch=branch)
        server = j.servers.threebot.default
        server.start(web=True, ssl=ssl)
