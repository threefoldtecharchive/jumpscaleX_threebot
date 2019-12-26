from Jumpscale import j


class users(j.baseclasses.threebot_actor):
    def _init(self, *args, **kwargs):
        bcdb = j.data.bcdb.get("users")
        self.user_model = bcdb.model_get(url="threebot.initialize.user.1")

    def _validate_user(self, user):
        for field in ["bot_name", "public_key", "location"]:
            if not getattr(user, field):
                raise j.exceptions.Value("%s is required" % field)

    @j.baseclasses.actor_method
    def list(self, bot_name, public_key, referrer, schema_out=None, user_session=None):
        """
        ```in
        bot_name = (S)
        public_key = (S)
        referrer = (S)
        ```

        ```out
        users = (LO) !threebot.initialize.user.1
        ```
        """

        out = schema_out.new()
        for user in self.user_model.iterate():
            if bot_name != "" and user.bot_name != bot_name:
                continue
            if public_key != "" and user.public_key != public_key:
                continue
            if referrer != "" and user.referrer != referrer:
                continue
            out.users.append(user)
        return out

    @j.baseclasses.actor_method
    def add(self, user, schema_out=None, user_session=None):
        """
        ```in
        user = (O) !threebot.initialize.user.1
        ```

        ```out
        user  = (O) !threebot.initialize.user.1
        ```
        """

        self._validate_user(user)

        user = self.user_model.new(user)
        user.save()

        res = schema_out.new()
        res.user = user
        return res
