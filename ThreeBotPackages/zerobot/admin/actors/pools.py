from Jumpscale import j


class pools(j.baseclasses.threebot_actor):
    @j.baseclasses.actor_method
    def list_pools(self, schema_out=None, user_session=None):
        ret_pools = []
        for pool in j.sal.zosv2.pools.list():
            ret_pools.append(pool._ddict)
        return j.data.serializers.json.dumps(ret_pools)
