from Jumpscale import j

explorers = {"main": "explorer.grid.tf", "testnet": "explorer.testnet.grid.tf"}


class admin(j.baseclasses.threebot_actor):
    @j.baseclasses.actor_method
    def admin_list(self, schema_out=None, user_session=None):
        me = j.me
        admins = []
        for name in [me.tname] + list(me.admins):
            admins.append({"name": name})
        return admins

    @j.baseclasses.actor_method
    def admin_add(self, name, schema_out=None, user_session=None):
        me = j.me
        if name not in me.admins:
            me.admins.append(name)
            me.save()
        return True

    @j.baseclasses.actor_method
    def admin_delete(self, name, schema_out=None, user_session=None):
        me = j.me
        if name in me.admins:
            me.admins.remove(name)
            me.save()
        return True

    def explorer_to_json(self, type_):
        return j.data.serializers.json.dumps({"type": type_, "url": explorers[type_]})

    @j.baseclasses.actor_method
    def get_explorer(self, schema_out=None, user_session=None):
        """
        get current explorer (testnet/main)
        """
        if not "EXPLORER_ADDR" in j.core.myenv.config:
            j.core.myenv.config["EXPLORER_ADDR"] = explorers["testnet"]
            j.core.myenv.config.save()
            return self.explorer_to_json("testnet")

        current_address = j.core.myenv.config["EXPLORER_ADDR"].strip().lower().strip("/")
        if current_address == explorers["testnet"]:
            explorer_type = "testnet"
        elif current_address == explorers["main"]:
            explorer_type = "main"
        else:
            raise j.exceptions.Value("current explorer address is not recognized")
        return self.explorer_to_json(explorer_type)

    @j.baseclasses.actor_method
    def set_explorer(self, explorer_type, schema_out=None, user_session=None):
        """
        set current explorer (testnet/main)
        """
        if explorer_type in explorers:
            j.core.myenv.config["EXPLORER_ADDR"] = explorers[explorer_type]
            j.core.myenv.config_save()
            return self.explorer_to_json(explorer_type)
        raise j.exceptions.Value(f"{explorer_type} is not a valid explorer type, must be 'testnet' or 'main'")
