from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def start(self):
        """
        cl = j.clients.gedis.get("packagemanager", package_name="zerobot.packagemanager")
        cl.actors.package_manager.package_add(path="/sandbox/code/github/threefoldtech/jumpscaleX_threebot/ThreeBotPackages/threefold/websites/")
        """
        repos = [
            {"name": "www_3bot_org", "giturl": "https://github.com/threefoldtech/www_3bot_org.git", "branch": "3bot"},
            {
                "name": "www_threefold_love",
                "giturl": "https://github.com/threefold-love/www_threefold_love",
                "branch": "3bot",
            },
            {
                "name": "www_threefold_tech",
                "giturl": "https://github.com/threefoldtech/www_threefold.tech",
                "branch": "3bot",
            },
            {"name": "www_incubaid", "giturl": "https://github.com/Incubaid/www_incubaid", "branch": "3bot"},
            # {
            #     "name": "www_threefold_io",
            #     "giturl": "https://github.com/threefoldfoundation/www_threefold.io_new/",
            #     "branch": "3bot",
            # },
        ]
        for repo in repos:
            package = j.me.encryptor.tools_packages.get(
                name=f"threefold.{repo['name']}", giturl=repo["giturl"], branch=repo["branch"]
            )
            package.start()
