from Jumpscale import j

import re

_re_name = re.compile(r"^[A-Za-z0-9\ _\-]+$")


class farms(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        self.farm_model = j.threebot.packages.tfgrid.directory.bcdb.model_get(url="tfgrid.directory.farm.1")

    def _by_id(self, farm_id):
        try:
            return self.farm_model.get(farm_id)
        except j.exceptions.NotFound:
            raise j.exceptions.NotFound("farm %s not found" % farm_id)

    def _by_name(self, name):
        try:
            farms = self.farm_model.find(name=name)
            if not farms:
                raise j.exceptions.NotFound()
            return farms[0]

        except j.exceptions.NotFound:
            raise j.exceptions.NotFound("farm %s not found" % name)

    def _validate_farm(self, farm):
        for field in ["threebot_id", "name", "email", "wallet_addresses"]:
            if not getattr(farm, field):
                raise j.exceptions.Value("%s is required" % field)

        if not _re_name.match(farm.name):
            raise j.exceptions.Value(
                "Farm name is not valide. Name can only contain alphanumeric characters dash (-) or underscore (_)"
            )

    def _check_existing(self, farm):
        if self.farm_model.find(name=farm.name):
            raise j.exceptions.Value("Farm with name %s is already exist" % farm.name)

    @j.baseclasses.actor_method
    def register(self, farm, schema_out=None, user_session=None):
        """
        ```in
        farm = (O) !tfgrid.directory.farm.1
        ```

        ```out
        farm_id = (I)
        ```
        """
        farm.id = None  # ensure we don't update
        self._validate_farm(farm)
        self._check_existing(farm)
        farm = self.farm_model.new(farm).save()
        out = schema_out.new()
        out.farm_id = farm.id
        return out

    @j.baseclasses.actor_method
    def update(self, farm_id, farm, schema_out=None, user_session=None):
        """
        ```in
        farm_id = (I)
        farm = (O) !tfgrid.directory.farm.1
        ```
        ```out
        !tfgrid.directory.farm.1
        ```
        """
        self._by_id(farm_id)
        self._validate_farm(farm)
        self.farm_model.set_dynamic(farm._ddict, obj_id=farm_id)
        return farm

    @j.baseclasses.actor_method
    def get(self, farm_id, name, schema_out=None, user_session=None):
        """
        ```in
        farm_id = 0 (I)
        name = "" (S)
        ```

        ```out
        !tfgrid.directory.farm.1
        ```
        """

        if farm_id:
            return self._by_id(farm_id)
        elif name:
            return self._by_name(name)
        raise j.exceptions.Value("farm_id or name is required")

    @j.baseclasses.actor_method
    def list(self, country, city, schema_out=None, user_session=None):
        """
        ```in
        country = (S)
        city = (S)
        ```

        ```out
        farms = (LO) !tfgrid.directory.farm.1
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

    @j.baseclasses.actor_method
    def owned_by(self, threebot_id, schema_out=None, user_session=None):
        """
        ```in
        threebot_id = 0 (I)
        ```

        ```out
        farms = (LO) !tfgrid.directory.farm.1
        ```
        """
        output = schema_out.new()
        output.farms = self.farm_model.find(threebot_id=threebot_id)
        return output
