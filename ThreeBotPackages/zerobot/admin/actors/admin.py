from Jumpscale import j


class admin(j.baseclasses.threebot_actor):
    @j.baseclasses.actor_method
    def admin_list(self, schema_out=None, user_session=None):
        me = j.myidentities.me.default
        admins = []
        for name in [me.tname] + list(me.admins):
            admins.append({"name": name})
        return admins

    @j.baseclasses.actor_method
    def admin_add(self, name, schema_out=None, user_session=None):
        me = j.myidentities.me.default
        if name not in me.admins:
            me.admins.append(name)
            me.save()
        return True

    @j.baseclasses.actor_method
    def admin_delete(self, name, schema_out=None, user_session=None):
        me = j.myidentities.me.default
        if name in me.admins:
            me.admins.remove(name)
            me.save()
        return True
