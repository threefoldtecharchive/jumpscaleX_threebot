from Jumpscale import j


class jumpscale_gdrive_client_model(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        #get bcdb from package
        self.bcdb = j.data.bcdb.system
        self.model = self.bcdb.model_get(url="jumpscale.gdrive.client")


    @j.baseclasses.actor_method
    def new(self,schema_out=None, user_session=None,**kwargs):
        """
        ```in
        name** = "" (s)
        credfile = "" (s)
        
        ```
        ```out
        res = (O) !jumpscale.gdrive.client
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
        res = (O) !jumpscale.gdrive.client
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
        res = (O) !jumpscale.gdrive.client
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
        res = (O) !jumpscale.gdrive.client
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
        res = (LO) !jumpscale.gdrive.client
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

    @j.baseclasses.actor_method
    def count(self, schema_out=None, user_session=None):
        assert user_session.admin  # for now only allow admin
        return self.model.count()

    @j.baseclasses.actor_method
    def exists(self, object_id=None, schema_out=None, user_session=None):
        """
        ```in
        object_id = 0
        ```
        """
        assert user_session.admin  # for now only allow admin
        return self.model.exists(object_id)