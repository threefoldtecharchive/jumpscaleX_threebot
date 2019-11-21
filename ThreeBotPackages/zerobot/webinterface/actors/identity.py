from Jumpscale import j


class identity(j.baseclasses.threebot_actor):
    def email(self, schema_out=None, user_session=None):
        return j.tools.threebot.me.default.email

    def pubkey(self, schema_out=None, user_session=None):
        return j.tools.threebot.me.default.pubkey

    def name(self, schema_out=None, user_session=None):
        """
        ```out
        name  = ""
        ```
        """

        out = schema_out.new()
        out.name = j.tools.threebot.me.default.tname

        return out
