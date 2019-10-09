from Jumpscale import j


class WikisFactory(j.baseclasses.threebot_factory):
    __jslocation__ = "j.threebot.package.wikis"

    def test(self):
        j.tools.wiki.load()
