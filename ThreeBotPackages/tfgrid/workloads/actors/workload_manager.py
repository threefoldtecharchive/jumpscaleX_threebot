import binascii

from Jumpscale import j

INT_NULL_VALUE = 2147483647


def gwid(reservation_id, workload_id):
    return f"{reservation_id}-{workload_id}"


def rid_from_gwid(workload_id):
    ss = workload_id.split("-")
    if len(ss) != 2:
        raise j.exceptions.Input(f"global workload id {workload_id} has wrong format")
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
        workloads_package = j.tools.threebot_packages.tfgrid__workloads
        phonebook_package = j.tools.threebot_packages.tfgrid__phonebook
        directory_package = j.tools.threebot_packages.tfgrid__directory
        self.reservation_model = workloads_package.bcdb.model_get(url="tfgrid.workloads.reservation.1")
        self.signature_model = workloads_package.bcdb.model_get(url="tfgrid.workloads.reservation.signing.signature.1")
        self.workload_schema = j.data.schema.get_from_url("tfgrid.workloads.reservation.workload.1")
        self.user_model = phonebook_package.bcdb.model_get(url="tfgrid.phonebook.user.1")
        self.node_model = directory_package.bcdb.model_get(url="tfgrid.directory.node.2")
        self.farm_model = directory_package.bcdb.model_get(url="tfgrid.directory.farm.1")
        self.workload_actionable_model = workloads_package.bcdb.model_get(url="tfgrid.workload.actionable.1")
        self.nacl = j.data.nacl.default

        index_table = reservation_index_model()
        index_table._meta.database = self.reservation_model.bcdb.sqlite_index_client
        index_table.create_table(safe=True)

        self.reservation_model.IndexTable = index_table

        self.reservation_model.trigger_add(reservation_index_create())

    def _farmer_tids_from_reservation(self, obj):
        """
        Extract a list of all farmer tids based on the node_id for each object in the reservation flow.
        :param obj: reservation schema
        """
        # gather all nodes we deploy on
        nodes = set()
        for _typ, workload in iterate_over_workloads(obj):
            if _typ == "network":
                for nr in workload.network_resources:
                    nodes.add(nr.node_id)
            else:
                nodes.add(workload.node_id)
        # get all farms these nodes belong in
        farm_ids = set()
        for node_id in nodes:
            # we already
            node_list = self.node_model.find(node_id=node_id)
            if len(node_list) == 0:
                # node not found
                continue
            farm_ids.add(node_list[0].farm_id)
        farmer_tids = []
        # get respective farm ids
        for farm_id in farm_ids:
            farm = self.farm_model.get(farm_id, None)
            farmer_tids.append(farm.threebot_id)

        return farmer_tids

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
        farmers_tids = self._farmer_tids_from_reservation(jsxobj)

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

    def _reservation_check(self, reservation):
        """
        will do
            - check signature of the customer to see json ok (created by a valid customer)
                - 'next_action' -> sign
            - check the signatures of all signing requests
                - if the provisioning requests done the 'next_action' -> pay
                - if the farmer signed (means he received payment) the 'next_action' -> deploy
                - if the delete requests done the 'next_action' -> delete
            - if something invalid e.g. signature of customer not ok then 'next_action' -> invalid

        will return the updated reservation
        """
        payload = reservation.json

        # make sure data in json is the same as reservation data
        if reservation.data_reservation._ddict != j.data.serializers.json.loads(payload):
            reservation.next_action = "invalid"

        if reservation.data_reservation.expiration_reservation < j.data.time.epoch:
            # add to actionable workload if the state has changed
            if reservation.next_action != "delete":
                self._add_to_actionable_workload(reservation)
            reservation.next_action = "delete"

        if reservation.next_action == "create":
            if reservation.data_reservation.expiration_provisioning > j.data.time.epoch:
                if reservation.customer_signature:
                    if self._validate_customer_signature(reservation):
                        reservation.next_action = "sign"
                    else:
                        reservation.next_action = "invalid"
            else:
                reservation.next_action = "invalid"

        if reservation.next_action == "sign":
            signatures = reservation.signatures_provision
            request = reservation.data_reservation.signing_request_provision
            if self._request_check(payload, request, signatures):
                reservation.next_action = "pay"

        if reservation.next_action == "pay":
            if self._validate_farmers_signature(reservation):
                # add to actionable workload if the state has changed
                if reservation.next_action != "deploy":
                    self._add_to_actionable_workload(reservation)
                reservation.next_action = "deploy"

        if reservation.next_action == "deploy":
            # Temporary change to simplify reservation flow for testing
            # signatures = reservation.signatures_delete
            # request = reservation.data_reservation.signing_request_delete
            # if self._request_check(payload, request, signatures):
            #     reservation.next_action = "delete"
            #     self._add_to_actionable_workload(reservation)
            pass

        reservation.save()
        return reservation

    def _add_to_actionable_workload(self, reservation):
        for t, w in iterate_over_workloads(reservation):
            if t in ["container", "zdb", "volume", "kubernetes"]:
                self.workload_actionable_model.new(
                    workload_id=gwid(reservation.id, w.workload_id), node_id=w.node_id
                ).save()
            if t == "network":
                for nr in w.network_resources:
                    self.workload_actionable_model.new(
                        workload_id=gwid(reservation.id, w.workload_id), node_id=nr.node_id
                    ).save()

    def _remove_actionable_workload(self, workload_id):
        ras = self.workload_actionable_model.find(workload_id=workload_id)
        for ra in ras:
            ra.delete()

    def _filter_reservations(self, node_id, states, cursor):
        query = None
        if node_id:
            query = self.reservation_model.IndexTable.node_id == node_id

        if cursor:
            cur_query = self.reservation_model.IndexTable.reservation_id >= cursor
            if query:
                query &= cur_query
            else:
                query = cur_query

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
        reservation.id = None
        reservation.save()  # save to get an id

        reservation = volumes_prepend_id(reservation)

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
        reservations_subset = self._filter_reservations(node_id, ["deploy"], cursor)

        workloads_actionable = self.workload_actionable_model.find(node_id=node_id)
        rids = [rid_from_gwid(w.workload_id)[0] for w in workloads_actionable]
        reservations_actionable = [self.reservation_model.get(rid) for rid in rids]

        reservations = set(reservations_subset)
        reservations.update(reservations_actionable)

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
        self._add_to_actionable_workload(reservation)
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
        farmers_tids = self._farmer_tids_from_reservation(reservation)

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
        self._remove_actionable_workload(global_workload_id)
        return True

    @j.baseclasses.actor_method
    def workload_deleted(self, workload_id, user_session):
        """
        Mark a workload as deleted
        this is called by a node once a workloads as been decommissioned

        ```in
        workload_id = (S)
        ```
        """
        rid, wid = rid_from_gwid(workload_id)
        reservation = self._reservation_get(rid)

        for r in reservation.results:
            if int(r.workload_id) == wid:
                r.state = "deleted"

        reservation.save()
        self._remove_actionable_workload(workload_id)
        return True


def volumes_prepend_id(reservation):
    # look for container that reference volume from this reservation itself
    # since the volume will be created after this, the user doesn't known
    # the volume id just yet. So we prepend the reservation id to the workload id
    # to have the full volume id
    for container in reservation.data_reservation.containers:
        for volume in container.volumes:
            if volume.volume_id[0] == "-":
                volume.volume_id = f"{reservation.id}{volume.volume_id}"
    return reservation
