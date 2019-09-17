from datetime import datetime

from Jumpscale import j


class farms(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        bcdb = j.data.bcdb.get("tf_directory")
        self.farm_model = bcdb.model_get(url="tfgrid.farm.1")
        self.node_model = bcdb.model_get(url="tfgrid.node.2")

    def _get_farm(self, farm_id):
        try:
            return self.farm_model.get(farm_id)
        except j.exceptions.NotFound:
            raise j.exceptions.NotFound("farm %s not found" % farm_id)

    def _validate_farm(self, farm):
        for field in ["threebot_id", "name", "email", "wallet_addresses"]:
            if not getattr(farm, field):
                raise j.exceptions.Value("%s is required" % field)

    def register(self, farm, schema_out):
        """
        ```in
        farm = (O) !tfgrid.farm.1
        ```

        ```out
        farm_id = (I)
        ```
        """
        self._validate_farm(farm)

        if self.farm_model.find(name=farm.name):
            raise j.exceptions.Value("Farm with name %s is already exist" % farm.name)

        farm = self.farm_model.new(farm).save()
        out = schema_out.new()
        out.farm_id = farm.id
        return out

    def update(self, farm_id, farm):
        """
        ```in
        farm_id = (I)
        farm = (O) !tfgrid.farm.1
        ```
        """
        self._get_farm(farm_id)
        self._validate_farm(farm)
        self.farm_model.set_dynamic(farm._ddict, obj_id=farm_id)
        return True

    def get(self, farm_id, schema_out):
        """
        ```in
        farm_id = (I)
        ```

        ```out
        farm = (O) !tfgrid.farm.1
        ```
        """
        return self._get_farm(farm_id)

    def list(self, country, city, schema_out):
        """
        ```in
        country = (S)
        city = (S)
        ```

        ```out
        farms = (LO) !tfgrid.farm.1
        ```
        """
        out = schema_out.new()
        for farm in self.farm_model.iterate():
            if country != "" and farm.location.country != country:
                continue
            if city != "" and farm.location.city != city:
                continue
            out.farms.append(farm)
        return out

    def migrate_farms(self):
        response = j.clients.threefold_directory.client.ListFarmers()[1]
        farms = response.json()

        for farm in farms:
            if not self.farm_model.find(name=farm["name"]):
                farm_object = self.farm_model.new(farm).save()

            nodes = j.clients.threefold_directory.client.ListCapacity(query_params={"farmer": farm["iyo_organization"]})[1].json()
            for node in nodes:
                if self.node_model.find(node_id=node["node_id"]):
                    continue

                if "used_resources" in node:
                    node["used_resource"] = node["used_resources"]
                if "reserved_resources" in node:
                    node["reserved_resource"] = node["reserved_resources"]
                if "total_resources":
                    node["total_resource"] = node["total_resources"]
                node["farmer_id"] = farm_object.id

                if "updated" in node:
                    updated = datetime.strptime(node["updated"], "%a, %d %b %Y  %X %Z")
                    node["updated"] = updated.strftime("%d/%m/%Y %H:%M")
                if "created" in node:
                    created = datetime.strptime(node["created"], "%a, %d %b %Y  %X %Z")
                    node["created"] = updated.strftime("%d/%m/%Y %H:%M")
                self.node_model.new(node).save()
