from Jumpscale import j


class notifications(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        pass

    @j.baseclasses.actor_method
    def check_new_release(self, schema_out=None, user_session=None):
        if not j.core.tools.is_latest_release():
            return j.data.serializers.json.dumps(j.core.tools.get_latest_release())
        else:
            return j.data.serializers.json.dumps({})
