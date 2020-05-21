from Jumpscale import j

try:
    from threesdk.InstallTools import Tools
except:
    from Jumpscale.core.InstallTools import Tools


class notifications(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        pass

    @j.baseclasses.actor_method
    def check_new_release(self, schema_out=None, user_session=None):
        if not Tools.is_latest_release():
            return j.data.serializers.json.dumps(Tools.get_latest_release())
        else:
            return j.data.serializers.json.dumps({})
