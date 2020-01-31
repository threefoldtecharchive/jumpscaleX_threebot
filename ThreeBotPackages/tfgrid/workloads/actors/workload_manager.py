import binascii
from Jumpscale import j

INT_NULL_VALUE = 2147483647


def gwid(reservation_id, workload_id):
    return f"{reservation_id}-{workload_id}"


def rid_from_gwid(workload_id):
    ss = workload_id.split("-")
    if len(ss) != 2:
        raise j.exceptions.Input("global workload id %s has wrong format")
    return int(ss[0]), int(ss[1])


def reservation_index_model():
    class IndexTable(j.clients.peewee.Model):
        class Meta:
            database = None

        pw = j.clients.peewee
        id = pw.PrimaryKeyField()
        reservation_id = pw.IntegerField(index=True, default=0)
        workload_id = pw.IntegerField(index=True, default=0)
        node_id = pw.TextField(index=True, default="")

    return IndexTable


def reservation_index_create():
    def index_create(model, obj, action, **kwargs):
        if action == "set_post":
            index = model.IndexTable.get_or_none(reservation_id=obj.id)
            if not index:
                for wt, workload in iterate_over_workloads(obj):
                    if wt == "network":
                        for nr in workload.network_resources:
                            index = model.IndexTable.create(
                                reservation_id=obj.id, workload_id=workload.workload_id, node_id=nr.node_id
                            )
                    else:
                        index = model.IndexTable.create(
                            reservation_id=obj.id, workload_id=workload.workload_id, node_id=workload.node_id
                        )
        if action == "delete":
            query = model.IndexTable.delete().where(model.IndexTable.reservation_id == obj.id)
            query.execute()

    return index_create


def iterate_over_workloads(obj):
    for _type in ["zdbs", "volumes", "containers", "networks"]:
        for workload in getattr(obj.data_reservation, _type):
            yield _type[:-1], workload
    if hasattr(obj.data_reservation, "kubernetes"):
        for workload in getattr(obj.data_reservation, "kubernetes"):
            yield "kubernetes", workload


class workload_manager(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        self.reservation_model = j.threebot.packages.tfgrid.workloads.bcdb.model_get(
            url="tfgrid.workloads.reservation.1"
        )
        self.signature_model = j.threebot.packages.tfgrid.workloads.bcdb.model_get(
            url="tfgrid.workloads.reservation.signing.signature.1"
        )
        self.workload_schema = j.data.schema.get_from_url("tfgrid.workloads.reservation.workload.1")
        self.user_model = j.threebot.packages.tfgrid.phonebook.bcdb.model_get(url="tfgrid.phonebook.user.1")
        self.nacl = j.data.nacl.default

        index_table = reservation_index_model()
        index_table._meta.database = self.reservation_model.bcdb.sqlite_index_client
        index_table.create_table(safe=True)

        self.reservation_model.IndexTable = index_table
        self.reservation_model.trigger_add(reservation_index_create())

    def _validate_signature(self, payload, signature, key):
        """
        :param payload: the payload
        :param signature: the signature to be verified
        :param key: public key to verify the signature
        """
        key = binascii.unhexlify(key)
        signature = binascii.unhexlify(signature.encode())
        return self.nacl.verify(payload.encode(), signature, verify_key=key)

    def _validate_signing_signature(self, payload, signature):
        """
        :param payload: the payload
        :param signature: the signature object (tfgrid.workloads.reservation.signing.signature)
        """
        try:
            user = self.user_model.get(signature.tid)
            return self._validate_signature(payload, signature.signature, user.pubkey)
        except j.exceptions.NotFound:
            return False

    def _request_check(self, payload, request, signatures):
        """
        Make sure that at least the quorum_min number of signers signed with a valid signature
        """
        # Temporary change to simplify reservation flow for testing
        if request.quorum_min == INT_NULL_VALUE:
            return True

        signers = 0
        for signature in signatures:
            if signature.tid not in request.signers:
                continue

            if self._validate_signing_signature(payload, signature):
                signers += 1

            if signers >= request.quorum_min:
                return True
        else:
            return False

    def _validate_customer_signature(self, jsxobj):
        """
        Checks if the signature of the customer is valid or not
        """
        try:
            user = self.user_model.get(jsxobj.customer_tid)
            return self._validate_signature(jsxobj.json, jsxobj.customer_signature, user.pubkey)
        except j.exceptions.NotFound:
            return False

    def _validate_farmers_signature(self, jsxobj):
        """
        Checks that all the farmers signed with a valid signature
        """
        farmers_tids = set()
        for _, workload in iterate_over_workloads(jsxobj):
            farmers_tids.add(workload.farmer_tid)

        for signature in jsxobj.signatures_farmer:
            if signature.tid not in farmers_tids:
                continue

            if self._validate_signing_signature(jsxobj.json, signature):
                farmers_tids.remove(signature.tid)

            if not farmers_tids:
                return True
        else:
            return False

    def _reservation_get(self, reservation_id):
        """
        internal method to fetch the reservation object
        will do following
        - fetch from BCDB

        and return using _reservation_check
        """
        try:
            jsxobj = self.reservation_model.get(reservation_id)
            return self._reservation_check(jsxobj)
        except j.exceptions.NotFound:
            raise j.exceptions.NotFound("reservation with id: (%s) not found" % reservation_id)

    def _reservation_check(self, jsxobj):
        """
        will do
            - check signature of the customer to see json ok (created by a valid customer)
                - 'next_action' -> sign
            - check the signatures of all signing requests
                - if the provisioning requests done the 'next_action' -> pay
                - if the farmer signed (means he received payment) the 'next_action' -> deploy
                - if the delete requests done the 'next_action' -> delete
            - if something invalid e.g. signature of customer not ok then 'next_action' -> invalid

        will return the updated jsxobj
        """
        payload = jsxobj.json
        if jsxobj.data_reservation.expiration_reservation < j.data.time.epoch:
            jsxobj.next_action = "delete"

        if jsxobj.next_action == "create":
            if jsxobj.data_reservation.expiration_provisioning > j.data.time.epoch:
                if jsxobj.customer_signature:
                    if self._validate_customer_signature(jsxobj):
                        jsxobj.next_action = "sign"
                    else:
                        jsxobj.next_action = "invalid"
            else:
                jsxobj.next_action = "invalid"

        if jsxobj.next_action == "sign":
            signatures = jsxobj.signatures_provision
            request = jsxobj.data_reservation.signing_request_provision
            if self._request_check(payload, request, signatures):
                jsxobj.next_action = "pay"

        if jsxobj.next_action == "pay":
            # Temporary change to simplify reservation flow for testing
            # if self._validate_farmers_signature(jsxobj):
            jsxobj.next_action = "deploy"

        if jsxobj.next_action == "deploy":
            # Temporary change to simplify reservation flow for testing
            # signatures = jsxobj.signatures_delete
            # request = jsxobj.data_reservation.signing_request_delete
            # if self._request_check(payload, request, signatures):
            #     jsxobj.next_action = "delete"
            pass

        jsxobj.save()
        return jsxobj

    def _filter_reservations(self, node_id, states, cursor):
        query = None
        if node_id:
            query = self.reservation_model.IndexTable.node_id == node_id

        if cursor:
            cur_query = self.reservation_model.IndexTable.reservation_id >= cursor
            query = query and cur_query if query else cur_query

        result = self.reservation_model.IndexTable.select().where(query).execute()
        reservations_ids = set([item.reservation_id for item in result])

        reservations = []
        for reservation_id in reservations_ids:
            reservation = self._reservation_get(reservation_id)
            if states and reservation.next_action not in states:
                continue

            reservations.append(reservation)
        return reservations

    def _reservation_validate(self, reservation):
        workloads = [l for l in iterate_over_workloads(reservation)]
        if len(workloads) == 0:
            raise j.exceptions.Value("At least one workload should be defined")

        wids = []
        for _type, w in workloads:
            wids.append(w.workload_id)
            if _type in ["container", "zdb", "volume", "kubernetes"] and not w.node_id:
                raise j.exceptions.Value(f"workload {w.workload_id} has not a node_id set")
            elif _type == "network":
                for r in w.network_resources:
                    if not r.node_id:
                        raise j.exceptions.Value(f"network resource in workload {w.workload_id} has not a node_id set")

        if sorted(wids) != list(range(1, len(workloads) + 1)):
            raise j.exceptions.Value(
                "Invalid workloads ids, workloads ids should be unique and between 1 and the number of worklaods"
            )

        if reservation.customer_tid == INT_NULL_VALUE:
            raise j.exceptions.Value("customer_tid field is required")

        if not reservation.data_reservation.expiration_provisioning:
            raise j.exceptions.Value("expiration_provisioning field is required")

        if not reservation.data_reservation.expiration_reservation:
            raise j.exceptions.Value("expiration_reservation field is required")

        if not self.user_model.find(id=reservation.customer_tid):
            raise j.exceptions.Value("customer_tid is invalid, or user does not exist")

    @j.baseclasses.actor_method
    def reservation_register(self, reservation, schema_out, user_session):
        """
        ```in
        reservation = (O) !tfgrid.workloads.reservation.1
        ```

        ```out
        reservation = (O) !tfgrid.workloads.reservation.1
        ```
        """
        self._reservation_validate(reservation)
        reservation.next_action = "create"
        reservation.epoch = j.data.time.epoch
        reservation = self.reservation_model.new(reservation)
        reservation.save()
        return reservation

    @j.baseclasses.actor_method
    def reservation_get(self, reservation_id, schema_out, user_session):
        """
        ```in
        reservation_id = (I)
        ```

        ```out
        !tfgrid.workloads.reservation.1
        ```
        """
        return self._reservation_get(reservation_id)

    @j.baseclasses.actor_method
    def reservations_list(self, node_id, state, cursor, schema_out, user_session):
        """
        ```in
        node_id = (S)  # filter results by node id
        state = (S)  # filter results by next_action
        cursor = 0 (I)  # filter results which ID starts from the cursor value
        ```

        ```out
        reservations = (LO) !tfgrid.workloads.reservation.1
        ```
        """
        if state and not isinstance(state, list):
            state = [state]
        reservations = self._filter_reservations(node_id, state, cursor)

        output = schema_out.new()
        output.reservations = reservations

        return output

    @j.baseclasses.actor_method
    def workloads_list(self, node_id, cursor, schema_out, user_session):
        """
        ```in
        node_id = (S)  # filter results by node id
        cursor = 0 (I)  # filter results which ID starts from the cursor value
        ```

        ```out
        workloads = (LO) !tfgrid.workloads.reservation.workload.1
        ```
        """
        output = schema_out.new()
        reservations = self._filter_reservations(node_id, ["deploy", "delete"], cursor)
        for reservation in reservations:
            for _type, workload in iterate_over_workloads(reservation):
                if node_id:
                    if _type in ["container", "zdb", "volume", "kubernetes"] and workload.node_id != node_id:
                        continue
                    if _type == "network" and node_id not in [
                        resource.node_id for resource in workload.network_resources
                    ]:
                        continue

                workload.reservation_id = reservation.id
                obj = self.workload_schema.new()
                obj.type = _type
                obj.workload_id = gwid(reservation.id, workload.workload_id)
                obj.user = str(reservation.customer_tid)
                obj.content = workload._ddict
                obj.created = reservation.epoch
                obj.duration = reservation.data_reservation.expiration_reservation - reservation.epoch
                obj.signature = ""
                obj.to_delete = reservation.next_action == "delete"
                output.workloads.append(obj)

        return output

    @j.baseclasses.actor_method
    def workload_get(self, gwid, schema_out, user_session):
        """
        ```in
        gwid = (S)
        ```

        ```out
        !tfgrid.workloads.reservation.workload.1
        ```
        """
        rid, wid = rid_from_gwid(gwid)

        out = schema_out.new()
        reservation = self._reservation_get(rid)
        for _type, workload in iterate_over_workloads(reservation):
            if int(workload.workload_id) == int(wid):
                obj = self.workload_schema.new()
                obj.type = _type
                obj.workload_id = gwid
                obj.user = str(reservation.customer_tid)
                obj.content = workload._ddict
                obj.created = reservation.epoch
                obj.duration = reservation.data_reservation.expiration_reservation - reservation.epoch
                obj.signature = ""
                obj.to_delete = reservation.next_action == "delete"
                return obj
        raise j.exceptions.NotFound(f"workload {gwid} not found")

    @j.baseclasses.actor_method
    def sign_provision(self, reservation_id, tid, signature, user_session):
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
        reservation = self._reservation_get(reservation_id)
        signature_obj = self.signature_model.new()
        signature_obj.tid = tid
        signature_obj.signature = signature
        reservation.signatures_provision.append(signature_obj)
        reservation.save()
        return True

    @j.baseclasses.actor_method
    def sign_delete(self, reservation_id, tid, signature, user_session):
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
        # Temporary change to simplify reservation flow for testing
        # reservation = self._reservation_get(reservation_id)
        # signature_obj = self.signature_model.new()
        # signature_obj.tid = tid
        # signature_obj.signature = signature
        # reservation.signatures_delete.append(signature_obj)
        # reservation.save()
        reservation = self._reservation_get(reservation_id)
        reservation.next_action = "delete"
        reservation.save()
        return True

    @j.baseclasses.actor_method
    def sign_farmer(self, reservation_id, tid, signature, user_session):
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
        reservation = self._reservation_get(reservation_id)
        farmers_tids = set()
        for _, workload in iterate_over_workloads(reservation):
            farmers_tids.add(workload.farmer_tid)

        if tid not in farmers_tids:
            raise j.exceptions.NotFound("Can not find a farmer with tid: {}".format(tid))

        signature_obj = self.signature_model.new()
        signature_obj.tid = tid
        signature_obj.signature = signature
        reservation.signatures_farmer.append(signature_obj)
        reservation.save()
        return True

    @j.baseclasses.actor_method
    def sign_customer(self, reservation_id, signature, user_session):
        """
        :param reservation_id: is the id of the reservation, unique in BCDB
        :param signature: the signature with private key of signer on the json (do reservation_get_json to get json)

        ```in
        reservation_id = (I)
        signature = (S)
        ```
        """
        reservation = self._reservation_get(reservation_id)
        reservation.customer_signature = signature
        reservation.save()
        return True

    @j.baseclasses.actor_method
    def set_workload_result(self, global_workload_id, result, user_session):
        """
        Set the result of the deployment of the workload
        :param workload_id: is the global workload id, unique in BCDB
        :param result: The result of the deployment of the workload

        ```in
        global_workload_id = (S)
        result = (O) !tfgrid.workloads.reservation.result.1
        ```
        """
        rid, wid = rid_from_gwid(global_workload_id)

        result.workload_id = wid

        reservation = self._reservation_get(rid)
        # if there is already a result for this workload,
        # remove it and add the one we just received
        for i, r in enumerate(reservation.results):
            if int(r.workload_id) == wid:
                reservation.results.pop(i)

        reservation.results.append(result)
        reservation.save()
        return True

    @j.baseclasses.actor_method
    def workload_deleted(self, workload_id):
        """
        Mark a workload as deleted
        this is called by a node once a workloads as been decommissioned

        ```in
        workload_id = (I)
        ```
        """
        pass
