from Jumpscale import j


class node_2_model(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        #get bcdb from package
        self.bcdb = self.package.bcdb
        self.model = self.bcdb.model_get(url="tfgrid.directory.node.2")


    @j.baseclasses.actor_method
    def new(self,schema_out=None, user_session=None,**kwargs):
        """
        ```in
        node_id** = (s)
        node_id_v1** = (s)
        farm_id** = (i)
        os_version** = (s)
        #parameters = (dict)
        created = (t)
        updated = (t)
        uptime = (i)
        address = (s)
        location = (o) !tfgrid.directory.location.1
        total_resources = (o) !tfgrid.directory.node.resource.amount.1
        used_resources = (o) !tfgrid.directory.node.resource.amount.1
        reserved_resources = (o) !tfgrid.directory.node.resource.amount.1
        proofs = (lo) !tfgrid.directory.node.proof.1
        ifaces = (lo) !tfgrid.directory.node.iface.1
        public_config = (o)!tfgrid.directory.node.public_iface.1
        exit_node = (b)
        approved = false (b)
        public_key_hex = "" (s)     #hex representation of public key of the tf node
        wg_ports = (li)
        
        #following info is not usable for provisioning, its convenience info for the farmer
        #e.g. to know which interface names there are
        #is only the physical interfaces where a cable is attached (info only)
        ```
        ```out
        res = (O) !tfgrid.directory.node.2
        ```
        """
        assert user_session.admin #for now only allow admin
        return self.model.set_dynamic(kwargs)

    @j.baseclasses.actor_method
    def set(self, object_id=None,values=None ,schema_out=None, user_session=None):
        """
        ```in
        object_id = 0
        values = (dict)
        ```
        ```out
        res = (O) !tfgrid.directory.node.2
        ```
        """
        # TODO: use user_session for authentication
        assert user_session.admin #for now only allow admin
        obj = self.model.get(object_id)

        for key, val in values.items():
            setattr(obj, key, val)
        obj.save()

        return obj


    @j.baseclasses.actor_method
    def get_by_name(self, name=None,schema_out=None, user_session=None):
        """
        ```in
        name = (S)
        ```
        ```out
        res = (O) !tfgrid.directory.node.2
        ```
        """
        assert user_session.admin #for now only allow admin
        return self.model.get_by_name(name)

    @j.baseclasses.actor_method
    def get(self, object_id=None,schema_out=None, user_session=None):
        """
        ```in
        object_id = 0
        ```
        ```out
        res = (O) !tfgrid.directory.node.2
        ```
        """
        assert user_session.admin #for now only allow admin
        return self.model.get(object_id)

    @j.baseclasses.actor_method
    def find(self, query=None,schema_out=None, user_session=None):
        """
        ```in
        query = (dict)
        ```
        ```out
        res = (LO) !tfgrid.directory.node.2
        ```
        """
        assert user_session.admin #for now only allow admin
        return self.model.find(query)

    @j.baseclasses.actor_method
    def delete(self, object_id=None,schema_out=None, user_session=None):
        """
        ```in
        object_id = 0
        ```
        """
        assert user_session.admin #for now only allow admin
        obj = self.model.get(object_id)
        obj.delete()


    @j.baseclasses.actor_method
    def destroy(self, schema_out=None, user_session=None):
        assert user_session.admin #for now only allow admin
        return self.model.destroy()