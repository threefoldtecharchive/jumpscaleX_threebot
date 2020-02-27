from Jumpscale import j


class identity(j.baseclasses.threebot_actor):
    @j.baseclasses.actor_method
    def email(self, schema_out=None, user_session=None):
        return j.tools.threebot.me.default.email

    @j.baseclasses.actor_method
    def pubkey(self, schema_out=None, user_session=None):
        return j.tools.threebot.me.default.pubkey

    @j.baseclasses.actor_method
    def threebot_name(self, name="default", schema_out=None, user_session=None):
        """
        ```in
        name = "default"(S)
        ```

        ```out
        name  = "" (S)
        tid = (I)
        admins = (LS)
        ```
        """
        identity = j.tools.threebot.me.get(name=name, needexist=True)
        if identity.tid == 0:
            raise j.exceptions.RuntimeError(f"Threebot me {name} has not been initialized yet")

        out = schema_out.new()
        out.name = "zaibon.3botconnect" # identity.tname
        out.tid = identity.tid
        out.admins = identity.admins

        return out
