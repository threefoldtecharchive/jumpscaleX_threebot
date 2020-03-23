from Jumpscale import j


class threebotdatacore(j.baseclasses.threebot_actor):
    @j.baseclasses.actor_method
    def get(self, schemaurl, id=None, name=None, user_session=None):
        """
        set an item idenfitied with id or on name (only 1 specified)
        schemaurl defines which object we reference

        """
        pass

    @j.baseclasses.actor_method
    def set(self, schemaurl, data_json, id=None, name=None, user_session=None):
        """
        set an item idenfitied with id or on name (only 1 specified)
        schemaurl defines which object we reference

        data_json is data in json format

        acl is being verified, so only user which is admin or has access rights in the circle will be allowed to set

        """
        pass
