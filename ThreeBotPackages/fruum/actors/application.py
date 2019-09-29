from Jumpscale import j


class application(j.baseclasses.threebot_actor):
    def _init(self, *args, **kwargs):
        bcdb = j.data.bcdb.get("fruum")
        self.model = bcdb.model_get(url="jumpscale.fruum.application")

    def add(self, application, schema_out=None, user_session=None):
        """

        """
        pass

    def update(self, application, schema_out=None, user_session=None):
        """

        """
        pass

    def get(self, app_id=0, schema_out=None, user_session=None):
        """

        """
        pass

    def delete(self, application=None, schema_out=None, user_session=None):
        """

        """
        pass

    def reset_users(self, application=None, schema_out=None, user_session=None):
        """

        """
        pass

    def list(self, schema_out=None, user_session=None):
        pass
