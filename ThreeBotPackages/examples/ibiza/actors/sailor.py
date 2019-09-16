from Jumpscale import j
import sys


class sailor(j.baseclasses.threebot_actor):
    """
    """

    def sail(self, msg):
        print("sail:%s" % msg)
        return msg

    def rain(self):
        print("rain")
        return None
