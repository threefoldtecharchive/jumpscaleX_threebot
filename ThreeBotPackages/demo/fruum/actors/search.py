from Jumpscale import j


class search(j.baseclasses.threebot_actor):
    def _init(self, *args, **kwargs):
        bcdb = j.data.bcdb.get("fruum")
        self.model = bcdb.model_get(url="jumpscale.fruum.document")

    @j.baseclasses.actor_method
    def search(self, app_id=0, payload={}, schema_out=None, user_session=None):
        """
        """
        pass

    @j.baseclasses.actor_method
    def search_attributes(self, app_id=0, attributes=[], schema_out=None, user_session=None):
        """

        """
        pass

    @j.baseclasses.actor_method
    def count_attributes(self, app_id=0, attributes=[], schema_out=None, user_session=None):
        """

        """
        pass
