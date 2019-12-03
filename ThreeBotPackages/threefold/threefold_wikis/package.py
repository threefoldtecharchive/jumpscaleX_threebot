from Jumpscale import j


# FIXME use a wiki loading tool instead of duplicating this into every single wiki package.
def load_wiki(**kwargs):
    wiki = j.tools.markdowndocs.load(path=kwargs["url"], name=kwargs["repo"])
    wiki.write()


class Package(j.baseclasses.threebot_package):
    def _init(self):
        self.branch = "master"

    def load(self):

        # TODO: load only relevant wikis
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
