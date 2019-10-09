from Jumpscale import j


class WebsitesFactory(j.baseclasses.object, j.baseclasses.testtools):

    __jslocation__ = "j.threebot.package.website_threefold_io"

    def install(self, branch="development"):
        """
        install website packages
        """

        self.client.actors_default.package_manager.package_add(
            git_url="https://github.com/threefoldfoundation/www_threefold.io_new/tree/%s/package" % branch
        )
