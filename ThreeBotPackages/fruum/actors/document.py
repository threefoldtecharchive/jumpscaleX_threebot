from Jumpscale import j


class document(j.baseclasses.threebot_actor):
    def _init(self, *args, **kwargs):
        bcdb = j.data.bcdb.get("fruum")
        self.model = bcdb.model_get(url="jumpscale.fruum.document")

    def add(self, app_id=0, document=None, schema_out=None, user_session=None):
        pass

    def update(self, app_id=0, document=None, schema_out=None, user_session=None):
        pass

    def update_subtree(self, app_id=0, document=None, schema_out=None, user_session=None):
        pass


    def delete(self, app_id=0, document=None, schema_out=None, user_session=None):
        """

        """
        pass


    def archive(self, app_id=0, document=None, schema_out=None, user_session=None):
        """

        """
        pass



    def restore(self, app_id=0, document=None, schema_out=None, user_session=None):
        """

        """
        pass


    def get(self, app_id=0, document_id=0, schema_out=None, user_session=None):
        """

        """
        pass

    def mget(self, app_id=0, document_ids=[], schema_out=None, user_session=None):
        """

        """
        pass


    def get_children(self, app_id=0, document=None, schema_out=None, user_session=None):
        pass


    def watch(self, app_id, document, user, schema_out=None, user_session=None):
        pass

    def unwatch(self, app_id, document, user, schema_out=None, user_session=None):
        pass



