from Jumpscale import j
from bottle import Bottle

app = Bottle()


class WikisFactory(j.baseclasses.threebot_factory):
    __jslocation__ = "j.threebot.package.wikis"

    def get_app(self):
        return app
