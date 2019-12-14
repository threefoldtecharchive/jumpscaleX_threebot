from Jumpscale import j


class jumpscale_openresty_server_1_model(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        # get bcdb from package
        self.bcdb = j.data.bcdb.system
        self.model = self.bcdb.model_get(url="zerobot.system_bcdb.jumpscale.openresty.server.1")

    @j.baseclasses.actor_method
    def new(self, schema_out=None, user_session=None, **kwargs):
        """
        ```in
        name** = "default" (s)
        host = "127.0.0.1" (s)
        status = init,installed,ok (e)
        executor = tmux,corex (e)
        hardkill = false (b)
        state = "init,running,error,stopped,stopping,down,notfound" (e)
        corex_client_name = "default" (s)
        corex_id = (s)
        error = "" (s)
        time_start = (t)
        time_refresh = (t)
        time_stop = (t)

        ```
        ```out
        res = (O) !jumpscale.openresty.server.1
        ```
        """
        assert user_session.admin  # for now only allow admin
        return self.model.set_dynamic(kwargs)

    @j.baseclasses.actor_method
    def set(self, object_id=None, values=None, schema_out=None, user_session=None):
        """
        ```in
        object_id = 0
        values = (dict)
        ```
        ```out
        res = (O) !jumpscale.openresty.server.1
        ```
        """
        # TODO: use user_session for authentication
        assert user_session.admin  # for now only allow admin
        obj = self.model.get(object_id)

        for key, val in values.items():
            setattr(obj, key, val)
        obj.save()

        return obj

    @j.baseclasses.actor_method
    def get_by_name(self, name=None, schema_out=None, user_session=None):
        """
        ```in
        name = (S)
        ```
        ```out
        res = (O) !jumpscale.openresty.server.1
        ```
        """
        assert user_session.admin  # for now only allow admin
        return self.model.get_by_name(name)

    @j.baseclasses.actor_method
    def get(self, object_id=None, schema_out=None, user_session=None):
        """
        ```in
        object_id = 0
        ```
        ```out
        res = (O) !jumpscale.openresty.server.1
        ```
        """
        assert user_session.admin  # for now only allow admin
        return self.model.get(object_id)

    @j.baseclasses.actor_method
    def find(self, query=None, schema_out=None, user_session=None):
        """
        ```in
        query = (dict)
        ```
        ```out
        res = (LO) !jumpscale.openresty.server.1
        ```
        """
        assert user_session.admin  # for now only allow admin
        return self.model.find(query)

    @j.baseclasses.actor_method
    def delete(self, object_id=None, schema_out=None, user_session=None):
        """
        ```in
        object_id = 0
        ```
        """
        assert user_session.admin  # for now only allow admin
        obj = self.model.get(object_id)
        obj.delete()

    @j.baseclasses.actor_method
    def destroy(self, schema_out=None, user_session=None):
        assert user_session.admin  # for now only allow admin
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
