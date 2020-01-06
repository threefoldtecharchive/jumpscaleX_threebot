from Jumpscale import j
import binascii
from io import BytesIO


class browser(j.baseclasses.threebot_actor):
    def _init(self, *args, **kwargs):
        bcdb = j.data.bcdb.get("ffbrowser")
        self.tft_ex_t = bcdb.model_get(url="threebot.ffbrowser.transaction.1")

    @j.baseclasses.actor_method
    def get_cookie(self, text, schema_out=None, user_session=None):
        pass

    @j.baseclasses.actor_method
    def set_cookie(self, text, schema_out=None, user_session=None):
        pass

    # put here the needed functions to interface with ffbrowser
