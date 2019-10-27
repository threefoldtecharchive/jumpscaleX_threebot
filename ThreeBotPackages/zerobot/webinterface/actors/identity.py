from Jumpscale import j


class identity(j.baseclasses.threebot_actor):
    def email(self, schema_out=None, user_session=None):
        return j.tools.threebot.me.default.email

    def pubkey(self, schema_out=None, user_session=None):
        return j.tools.threebot.me.default.pubkey
