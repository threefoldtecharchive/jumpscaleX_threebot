from Jumpscale import j
from threesdk.InstallTools import Tools


class notifications(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        pass

    @j.baseclasses.actor_method
    def check_new_release(self, schema_out=None, user_session=None):
        return j.data.serializers.json.dumps(Tools.get_newest_version())
