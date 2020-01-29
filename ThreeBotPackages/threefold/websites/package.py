from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def start(self):
        """
        cl = j.clients.gedis.get("packagemanager", package_name="zerobot.packagemanager")
        cl.actors.package_manager.package_add(path="/sandbox/code/github/threefoldtech/jumpscaleX_threebot/ThreeBotPackages/threefold/websites/")
        """
        repos = [
            {"name": "3bot_org", "giturl": "https://github.com/threefoldtech/www_3bot_org.git", "branch": "3bot"},
            {
                "name": "threefold_love",
                "giturl": "https://github.com/threefold-love/www_threefold_love",
                "branch": "3bot",
            },
            {
                "name": "threefold_tech",
                "giturl": "https://github.com/threefoldtech/www_threefold.tech",
                "branch": "3bot",
            },
            {"name": "incubaid", "giturl": "https://github.com/Incubaid/www_incubaid", "branch": "3bot"},
        ]
        for repo in repos:
            package = j.tools.threebot_packages.get(
                name=f"threefold.{repo['name']}", giturl=repo["giturl"], branch=repo["branch"]
            )
            package.start()
