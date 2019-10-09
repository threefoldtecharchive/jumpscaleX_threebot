from Jumpscale import j


r = []
r.append(("tokens", "https://github.com/threefoldfoundation/info_tokens/tree/development/docs"))
r.append(("foundation", "https://github.com/threefoldfoundation/info_foundation/tree/development/docs"))
r.append(("grid", "https://github.com/threefoldfoundation/info_grid/tree/development/docs"))
r.append(("freeflowevents", "https://github.com/freeflownation/info_freeflowevents/tree/development/docs"))
r.append(("test", "https://github.com/waleedhammam/test_custom_md/tree/master/docs"))


class Package(j.baseclasses.threebot_package):
    def prepare(self):
        path = "%s/../../threebot/wiki" % self.package_root
        self.client.actors_default.package_manager.package_add(path=path)

    def start(self):
        """
        called when the 3bot starts
        :return:
        """
        for name, url in r:
            ws = j.tools.wiki.get(name=name, url=url)
            ws.load()


# j.servers.myjobs.schedule(
#     load_wiki,
#     repo="bettertoken",
#     url="https://github.com/BetterToken/info_bettertoken/tree/%s/docs" % self.branch,
# )
# j.servers.myjobs.schedule(
#     load_wiki,
#     repo="harvested",
#     url="https://github.com/harvested-io/info_harvested.io/tree/%s/docs" % self.branch,
# )
# j.servers.myjobs.schedule(
#     load_wiki,
#     repo="freeflowevents",
#     url="https://github.com/freeflownation/info_freeflowevents/tree/%s/docs" % self.branch,
# )
