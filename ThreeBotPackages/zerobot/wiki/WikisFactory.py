from Jumpscale import j
from .BottleWebServerWiki import app


class WikisFactory(j.baseclasses.threebot_factory):
    __jslocation__ = "j.threebot.package.wikis"

    def get_app(self):
        return app
