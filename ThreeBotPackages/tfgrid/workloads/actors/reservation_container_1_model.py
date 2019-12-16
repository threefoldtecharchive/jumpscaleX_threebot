from Jumpscale import j


class reservation_container_1_model(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        # get bcdb from package
        self.bcdb = self.package.bcdb
        self.model = self.bcdb.model_get(url="tfgrid.workloads.reservation.container.1")

    @j.baseclasses.actor_method
    def new(self, schema_out=None, user_session=None, **kwargs):
        """
        ```in
        #unique id inside the reservation is an autoincrement
        workload_id = (i)
        #links to unique node on the tfgrid
        node_id = (s)
        flist = (s)
        hub_url = (s)
        #env variables
        environment = (dict)
        #the process to start
        entrypoint = (s)
        #corex yes or no
        interactive = true (b)
        volumes = (lo) !tfgrid.workloads.reservation.container.mount.1
        network_connection = (lo) !tfgrid.workloads.reservation.network.connection.1
        #where to send the statistics too
        stats_aggregator = (lo) !tfgrid.workloads.reservation.statsaggregator.1
        #id of threebot who is the farmer
        farmer_tid = (i)




        ```
        ```out
        res = (O) !tfgrid.workloads.reservation.container.1
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
        res = (O) !tfgrid.workloads.reservation.container.1
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
        res = (O) !tfgrid.workloads.reservation.container.1
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
        res = (O) !tfgrid.workloads.reservation.container.1
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
        res = (LO) !tfgrid.workloads.reservation.container.1
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
