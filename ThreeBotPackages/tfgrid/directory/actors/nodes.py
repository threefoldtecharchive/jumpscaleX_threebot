from Jumpscale import j


class nodes(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        self.node_model = j.threebot.packages.tfgrid.directory.bcdb.model_get(url="tfgrid.directory.node.2")
        self.farm_model = j.threebot.packages.tfgrid.directory.bcdb.model_get(url="tfgrid.directory.farm.1")
        # ensure the database for uptime influxdb exists
        self._inflxudb = j.clients.influxdb.get("default")

    def _find(self, node_id):
        nodes = self.node_model.find(node_id=node_id)
        if len(nodes) <= 0:
            return None
        return nodes[0]

    @j.baseclasses.actor_method
    def add(self, node, schema_out=None, user_session=None):
        """
        ```in
        node = (O) !tfgrid.directory.node.2
        ```

        ```out
        !tfgrid.directory.node.2
        ```

        """
        # TODO check the sender is actually the node itself
        validation_errors = []
        if not node.node_id:
            validation_errors.append("node_id")
        if not node.os_version:
            validation_errors.append("os_version")
        if not node.farm_id:
            validation_errors.append("farm_id")
        if not node.location:
            validation_errors.append("location")
        if validation_errors:
            raise Exception("Can not create node without {}".format(" or ".join(validation_errors)))

        old_node = self._find(node.node_id)
        if old_node:  # this is just an update/reboot of the node
            old_node.farm_id = node.farm_id
            old_node.os_version = node.os_version
            old_node.location = node.location
            old_node.updated = j.data.time.epoch
            old_node.save()
            return old_node

        # here we got a new node
        node.created = j.data.time.epoch
        return self.node_model.new(data=node).save()

    @j.baseclasses.actor_method
    def list(self, farm_id, country, city, cru, sru, mru, hru, proofs, schema_out=None, user_session=None):
        """
        ```in
        farm_id = -1 (I)
        country = (S)
        city = (S)
        cru = -1 (I)
        mru = -1 (I)
        sru = -1 (I)
        hru = -1 (I)
        proofs = False (B)
        ```

        ```out
        nodes = (LO) !tfgrid.directory.node.2
        ```
        """

        output = schema_out.new()
        fields = ["id"]
        values = []
        statements = []
        eq_fields = {"location_country": country, "location_city": city}
        for field, value in eq_fields.items():
            if value:
                fields.append(field)
                statements.append(f"{field} = ?")
                values.append(value)

        if farm_id > -1:
            fields.append("farm_id")
            statements.append("farm_id = ?")
            values.append(farm_id)

        lt_fields = {
            "total_resources__cru": cru,
            "total_resources__mru": mru,
            "total_resources__sru": sru,
            "total_resources__hru": hru,
        }
        for field, value in lt_fields.items():
            if value > -1:
                fields.append(field)
                statements.append(f"{field} > ?")
                values.append(value)

        whereclause = " AND ".join(statements)
        for row in self.node_model.query_model(fields=fields, whereclause=whereclause, values=values):
            node = self.node_model.get(row[0])
            if not proofs:
                node.proofs = []
            output.nodes.append(node)
        return output

    @j.baseclasses.actor_method
    def get(self, node_id, proofs, schema_out=None, user_session=None):
        """
        ```in
        node_id = (S)
        proofs = False (B)
        ```

        ```out
        !tfgrid.directory.node.2
        ```
        """
        node = self._find(node_id)
        if not node:
            raise j.exceptions.NotFound("node %s not found" % node_id)
        if not proofs:
            node.proofs = []
        return node

    @j.baseclasses.actor_method
    def update_total_capacity(self, node_id, resource, schema_out=None, user_session=None):
        """
        ```in
        node_id = (S)
        resource = (O) !tfgrid.directory.node.resource.amount.1
        ```

        """
        node = self._find(node_id)
        if not node:
            raise j.exceptions.NotFound("node %s not found" % node_id)
        node.total_resources.mru = resource.mru
        node.total_resources.cru = resource.cru
        node.total_resources.hru = resource.hru
        node.total_resources.sru = resource.sru
        node.save()
        return True

    @j.baseclasses.actor_method
    def update_reserved_capacity(self, node_id, resource, schema_out=None, user_session=None):
        """
        ```in
        node_id = (S)
        resource = (O) !tfgrid.directory.node.resource.amount.1
        ```
        """
        node = self._find(node_id)
        if not node:
            raise j.exceptions.NotFound("node %s not found" % node_id)
        node.reserved_resources.mru = resource.mru
        node.reserved_resources.cru = resource.cru
        node.reserved_resources.hru = resource.hru
        node.reserved_resources.sru = resource.sru

        node.save()
        return True

    @j.baseclasses.actor_method
    def update_used_capacity(self, node_id, resource, schema_out=None, user_session=None):
        """
        ```in
        node_id = (S)
        resource = (O) !tfgrid.directory.node.resource.amount.1
        ```
        """

        node = self._find(node_id)
        if not node:
            raise j.exceptions.NotFound("node %s not found" % node_id)
        node.used_resources.mru = resource.mru
        node.used_resources.cru = resource.cru
        node.used_resources.hru = resource.hru
        node.used_resources.sru = resource.sru
        node.save()
        return True

    @j.baseclasses.actor_method
    def add_proof(self, node_id, proof, user_session=None):
        """
        ```in
        node_id = (S)
        proof = (O) !tfgrid.directory.node.proof.1
        ```
        """
        node = self._find(node_id)
        if not node:
            raise j.exceptions.NotFound("node %s not found" % node_id)

        proof.hardware_hash = hash_proof(proof.hardware)
        proof.disk_hash = hash_proof(proof.disks)
        proof.created = j.data.time.epoch

        # check if we already have this version of the proof
        for p in node.proofs:
            if p.hardware_hash == proof.hardware_hash and p.disk_hash == proof.disk_hash:
                return True

        node.proofs.append(proof)
        node.save()
        return True

    @j.baseclasses.actor_method
    def publish_interfaces(self, node_id, ifaces, schema_out=None, user_session=None):
        """
        ```in
        node_id = (S)
        ifaces = (LO) !tfgrid.directory.node.iface.1
        ```
        """

        node = self._find(node_id)
        if not node:
            raise j.exceptions.NotFound("node %s not found" % node_id)
        node.ifaces = ifaces
        node.save()
        return True

    @j.baseclasses.actor_method
    def set_public_iface(self, node_id, public, schema_out=None, user_session=None):
        """
        ```in
        node_id = (S)
        public = (O) !tfgrid.directory.node.public_iface.1
        ```
        """

        node = self._find(node_id)
        if not node:
            raise j.exceptions.NotFound("node %s not found" % node_id)

        node.public_config = public
        node.save()
        return True

    @j.baseclasses.actor_method
    def uptime_update(self, node_id, uptime, user_session=None):
        """
        ```in
        node_id = (S)
        uptime = (I)
        ```
        """
        node = self._find(node_id)
        if not node:
            raise j.exceptions.NotFound("node %s not found" % node_id)

        node.uptime = uptime
        node.updated = j.data.time.epoch
        node.save()

        self._inflxudb.write_points(
            [
                {
                    "measurement": "node_capacity",
                    "tags": {"node_id": node.node_id, "farmer": node.farm_id, "version": node.os_version},
                    "fields": {
                        "cru": float(node.total_resources.cru),
                        "mru": float(node.total_resources.mru),
                        "hru": float(node.total_resources.hru),
                        "sru": float(node.total_resources.sru),
                        "longitude": node.location.longitude,
                        "latitude": node.location.latitude,
                        "uptime": node.uptime,
                    },
                }
            ]
        )
        return True

    def publish_wg_ports(self, node_id, ports, user_session=None):
        """
        ```in
        node_id = (S)
        ports = (LI)
        ```
        """
        node = self._find(node_id)
        if not node:
            raise j.exceptions.NotFound("node %s not found" % node_id)

        node.wg_ports = ports
        node.save()
        return True


def hash_proof(proof):
    #  we are trying to have always produce same hash for same content of proof
    #  so we set sort_keys=True so the json generated is always the same
    b = j.data.serializers.json.dumps(proof, sort_keys=True)
    return j.data.hash.md5_string(b)
