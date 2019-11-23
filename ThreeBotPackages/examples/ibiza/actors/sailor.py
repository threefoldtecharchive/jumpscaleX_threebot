from Jumpscale import j
import sys


class sailor(j.baseclasses.threebot_actor):
    """
    """

    @j.baseclasses.actor_method
    def sail(self, msg, schema_out=None, user_session=None):
        print("sail:%s" % msg)
        return msg

    @j.baseclasses.actor_method
    def rain(self, schema_out=None, user_session=None):
        print("rain")
        return None
