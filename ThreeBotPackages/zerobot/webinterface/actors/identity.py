from Jumpscale import j


class identity(j.baseclasses.threebot_actor):
    @j.baseclasses.actor_method
    def email(self, schema_out=None, user_session=None):
        return j.myidentities.me.email

    @j.baseclasses.actor_method
    def pubkey(self, schema_out=None, user_session=None):
        return j.myidentities.me.pubkey

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
        identity = j.me
        if identity.tid == 0:
            raise j.exceptions.RuntimeError(f"Threebot me {name} has not been initialized yet")

        out = schema_out.new()
        out.name = identity.tname
        out.tid = identity.tid
        out.admins = identity.admins

        return out
