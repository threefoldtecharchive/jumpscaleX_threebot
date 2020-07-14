from Jumpscale import j

class pools(j.baseclasses.threebot_actor):
    @j.baseclasses.actor_method
    def list_pools(self, schema_out=None, user_session=None):
        ret_pools = j.sal.zosv2.pools.list()
        return j.data.serializers.json.dumps(ret_pools)