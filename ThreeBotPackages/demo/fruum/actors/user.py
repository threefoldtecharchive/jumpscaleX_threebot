from Jumpscale import j


class user(j.baseclasses.threebot_actor):
    def _init(self, *args, **kwargs):
        bcdb = j.data.bcdb.get("fruum")
        self.model = bcdb.model_get(url="jumpscale.fruum.user")

    @j.baseclasses.actor_method
    def add(self, app_id=0, user=None, schema_out=None, user_session=None):
        pass

    @j.baseclasses.actor_method
    def update(self, app_id=0, user=None, schema_out=None, user_session=None):
        pass

    @j.baseclasses.actor_method
    def delete(self, app_id=0, user=None, schema_out=None, user_session=None):
        """

        """
        pass

    @j.baseclasses.actor_method
    def get(self, app_id=0, user_id=0, schema_out=None, user_session=None):
        """

        """
        pass

    @j.baseclasses.actor_method
    def match_users(self, app_id=0, attributes=[], schema_out=None, user_session=None):
        """

        """
        pass

    @j.baseclasses.actor_method
    def count_users(self, app_id=0, attributes=[], schema_out=None, user_session=None):
        """

        """
        pass

    @j.baseclasses.actor_method
    def search(self, app_id=0, q=None, schema_out=None, user_session=None):
        """

        """
        pass

    @j.baseclasses.actor_method
    def archive(self, app_id=0, document=None, schema_out=None, user_session=None):
        """

        """
        pass

    @j.baseclasses.actor_method
    def restore(self, app_id=0, document=None, schema_out=None, user_session=None):
        """

        """
        pass

    @j.baseclasses.actor_method
    def mget(self, app_id=0, document_ids=[], schema_out=None, user_session=None):
        """

        """
        pass

    @j.baseclasses.actor_method
    def get_children(self, app_id=0, document=None, schema_out=None, user_session=None):
        pass
