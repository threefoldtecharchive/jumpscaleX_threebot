import binascii
from Jumpscale import j


class workload_manager(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        bcdb = j.data.bcdb.get("tf_workloads")
        self.reservation_model = bcdb.model_get(url="tfgrid.reservation.1")
        self.signature_model = bcdb.model_get(url="tfgrid.reservation.signing.signature.1")

        tb_bcdb = j.data.bcdb.get("threebot_phonebook")
        self.user_model = tb_bcdb.model_get(url="threebot.phonebook.user.1")
        self.nacl = j.data.nacl.default

        class IndexTable(j.clients.peewee.Model):
            class Meta:
                database = None

            pw = j.clients.peewee
            id = pw.PrimaryKeyField()
            reservation_id = pw.IntegerField(index=True, default=0)
            workload_id = pw.IntegerField(index=True, default=0)
            node_id = pw.IntegerField(index=True, default=0)

        def trigger_func(model, obj, action, **kwargs):
            if action == "save":
                index = model.IndexTable.get_or_none(reservation_id=obj.id)
                if not index:
                    for workload_type in ["zdbs", "volumes", "containers"]:
                        for workload in getattr(obj.data_reservation, workload_type):
                            record = model.IndexTable.create(
                                reservation_id=obj.id, workload_id=workload.workload_id, node_id=workload.node_id
                            )

        IndexTable._meta.database = self.reservation_model.bcdb.sqlite_index_client
        IndexTable.create_table(safe=True)
        self.reservation_model.IndexTable = IndexTable
        self.reservation_model.trigger_add(trigger_func)

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
        :param signature: the signature object (tfgrid.reservation.signing.signature)
        """
        user = self.user_model.get(signature.tid)
        if not user:
            return False
        return self._validate_signature(payload, signature.signature, user.pubkey)

    def _request_check(self, payload, request, signatures):
        """
        Make sure that at least the quorum_min number of signers signed with a valid signature
        """
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
        user = self.user_model.get(jsxobj.customer_tid)
        if not user:
            return False
        return self._validate_signature(jsxobj.json, jsxobj.customer_signature, user.pubkey)

    def _validate_farmers_signature(self, jsxobj):
        """
        Checks that all the farmers signed with a valid signature
        """
        farmers_tids = set()
        for workload_type in ["zdbs", "networks", "volumes", "containers"]:
            for workload in getattr(jsxobj.data_reservation, workload_type):
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

        elif jsxobj.next_action == "create":
            if jsxobj.data_reservation.expiration_provisioning > j.data.time.epoch:
                if jsxobj.customer_signature:
                    if self._validate_customer_signature(jsxobj):
                        jsxobj.next_action = "sign"
                    else:
                        jsxobj.next_action = "invalid"
            else:
                jsxobj.next_action = "invalid"

        elif jsxobj.next_action == "sign":
            signatures = jsxobj.signatures_provision
            request = jsxobj.data_reservation.signing_request_provision
            if self._request_check(payload, request, signatures):
                jsxobj.next_action = "pay"

        elif jsxobj.next_action == "pay":
            if self._validate_farmers_signature(jsxobj):
                jsxobj.next_action = "deploy"

        elif jsxobj.next_action == "deploy":
            signatures = jsxobj.signatures_delete
            request = jsxobj.data_reservation.signing_request_delete
            if self._request_check(payload, request, signatures):
                jsxobj.next_action = "delete"

        jsxobj.save()
        return jsxobj

    def reservation_register(self, reservation, schema_out=None, user_session=None):
        """
        ```in
        reservation = (O) !tfgrid.reservation.1
        ```

        ```out
        reservation = (O) !tfgrid.reservation.1
        ```
        """
        reservation.next_action = "create"
        reservation.epoch = j.data.time.epoch
        reservation = self.reservation_model.new(reservation)
        reservation.save()
        return reservation

    def reservation_get(self, reservation_id, schema_out=None, user_session=None):
        """
        ```in
        reservation_id = (I)
        ```

        ```out
        !tfgrid.reservation.1
        ```
        """
        return self._reservation_get(reservation_id)

    def reservations_list(self, node_id, state, epoch, schema_out):
        """
        ```in
        node_id = (I)  # filter results by node id
        state = "" (S)  # filter results by next_action
        epoch = (I)  # filter results which created after this epoch
        ```

        ```out
        reservations = (LO) !tfgrid.reservation.1
        ```
        """
        query = None
        if node_id:
            query = self.reservation_model.IndexTable.node_id == node_id

        result = self.reservation_model.IndexTable.select().where(query).execute()
        reservations_ids = set([item.reservation_id for item in result])

        reservations = []
        for reservation_id in reservations_ids:
            reservation = self._reservation_get(reservation_id)
            if state and state.upper() != reservation.next_action:
                continue

            if epoch and epoch < reservation.epoch:
                continue

            reservations.append(reservation)
        return reservations

    def sign_provision(self, reservation_id, tid, signature, schema_out=None, user_session=None):
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

    def sign_delete(self, reservation_id, tid, signature, schema_out=None, user_session=None):
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
        reservation.signatures_delete.append(signature_obj)
        reservation.save()
        return True

    def sign_farmer(self, reservation_id, tid, signature, schema_out=None, user_session=None):
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
        for workload_type in ["zdbs", "networks", "volumes", "containers"]:
            for workload in getattr(reservation.data_reservation, workload_type):
                farmers_tids.add(workload.farmer_tid)

        if tid not in farmers_tids:
            raise j.exceptions.NotFound("Can not find a farmer with tid: {}".format(tid))

        signature_obj = self.signature_model.new()
        signature_obj.tid = tid
        signature_obj.signature = signature
        reservation.signatures_farmer.append(signature_obj)
        reservation.save()
        return True

    def sign_customer(self, reservation_id, signature, schema_out=None, user_session=None):
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
