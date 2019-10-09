from Jumpscale import j

# TODO: use bottle server to generate home page for wiki


class WikisFactory(j.baseclasses.threebot_factory):
    __jslocation__ = "j.threebot.package.wikis"

    def test(self):
        j.tools.wiki.load()
