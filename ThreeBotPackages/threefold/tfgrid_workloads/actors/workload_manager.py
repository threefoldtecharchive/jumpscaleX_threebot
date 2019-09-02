from Jumpscale import j


class workload_manager(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        bcdb = j.data.bcdb.get("tf_workloads")
        self.workload_zdb_model = bcdb.model_get(url="tfgrid.workloads.zdb.1")
        self.workload_container_model = bcdb.model_get(url="tfgrid.workloads.container.1")
        self.workload_network_model = bcdb.model_get(url="tfgrid.workloads.network.1")

    def _reservation_get(self, reservation_id):
        """
        internal method to fetch the reservation object
        will do following

        - fetch from BCDB

        and return using _reservation_check
        return None if it doesn't exist
        """

        return self._reservation_check(jsxobject)

    def _reservation_check(self, jsxobject):
        """
        will do
            - check signature of the customer to see json ok (created by a valid customer)
                - 'next_action' -> sign
            - check the signatures of all signing requests
                - if the provisioning requests done the 'next_action' -> pay
                - if the farmer signed (means he received payment) the 'next_action' -> deploy
                - if the delete requests done the 'next_action' -> delete
            - if something invalid e.g. signature of customer not ok then 'next_action' -> invalid

        will return the updated jsxobject

        """
        return jsxobject

    def reservation_register(self, reservation, schema_out):
        """
        ```in
        reservation = (O) !tfgrid.reservation.1
        ```

        ```out
        reservation = (O) !tfgrid.reservation.1
        json = (S)
        ```
        """
        return reservation

    def reservation_get(self, reservation_id, schema_out):
        """
        ```in
        reservation_id = (I)
        ```

        ```out
        !tfgrid.reservation.1
        ```
        """
        pass
        # TODO:

    def sign_provision(self, reservation_id, tid, signature, schema_out):
        """

        :param reservation_id: is the id of the reservation, unique in BCDB
        :param tid: the threebot id of who signs (in HEX format hexifly in python)
        :param signature: the signature with private key of signer on the json (do reservation_get_json to get json)

        ```in
        reservation_id = (I)
        tid = (I)
        signature = (S)
        ```

        """

    def sign_delete(self, reservation_id, tid, signature, schema_out):
        """

        :param reservation_id: is the id of the reservation, unique in BCDB
        :param tid: the threebot id of who signs (in HEX format hexifly in python)
        :param signature: the signature with private key of signer on the json (do reservation_get_json to get json)

        ```in
        reservation_id = (I)
        tid = (I)
        signature = (S)
        ```

        """
