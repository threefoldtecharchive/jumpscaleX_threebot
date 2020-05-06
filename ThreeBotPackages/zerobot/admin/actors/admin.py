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
        if "EXPLORER_ADDR" not in j.core.myenv.config:
            j.clients.explorer.default_addr_set(explorers["testnet"])
            return self.explorer_to_json("testnet")

        current_address = j.core.myenv.config["EXPLORER_ADDR"].strip().lower().strip("/")
        if current_address == explorers["testnet"]:
            explorer_type = "testnet"
        elif current_address == explorers["main"]:
            explorer_type = "main"
        else:
            return {"type": "custom", "url": current_address}
        return self.explorer_to_json(explorer_type)

    @j.baseclasses.actor_method
    def set_explorer(self, explorer_type, schema_out=None, user_session=None):
        """
        set current explorer (testnet/main)
        """
        if explorer_type in explorers:
            client = j.clients.explorer.get(name=explorer_type, url=f"https://{explorers[explorer_type]}/explorer")
            # check if we can switch with existing identity
            try:
                user = client.users.get(name=j.me.tname, email=j.me.email)
            except j.exceptions.NotFound:
                raise j.exceptions.Value(f"Your identity does not exists on {explorer_type} please setup a new identity with 3sdk")
            if user.pubkey != j.me.encryptor.verify_key_hex:
                raise j.exceptions.Value(f"Your identity does not match on {explorer_type} please create a new container with 3sdk instead")
            j.me.tid = user.id
            j.me.save()
            j.clients.explorer.default_addr_set(explorers[explorer_type])
            return self.explorer_to_json(explorer_type)
        raise j.exceptions.Value(f"{explorer_type} is not a valid explorer type, must be 'testnet' or 'main'")
