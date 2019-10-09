from Jumpscale import j


class WebsitesFactory(j.baseclasses.threebot_factory):

    __jslocation__ = "j.threebot.package.website_freeflownation"

    def install(self, branch="development"):
        """
        install website packages
        """

        self.client.actors_default.package_manager.package_add(
            git_url="https://github.com/freeflownation/www_freeflownation/tree/%s/package" % branch
        )
