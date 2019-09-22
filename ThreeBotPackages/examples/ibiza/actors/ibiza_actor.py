from Jumpscale import j
import binascii
from io import BytesIO


class ibiza_actor(j.baseclasses.threebot_actor):
    def _init(self, *args, **kwargs):
        bcdb = j.data.bcdb.get("test")
        self.model = bcdb.model_get(url="jumpscale.test.ibiza.wallet")

    def info(self, data={}, schema_out=None, user_session=None):
        """
        TODO: what info is sent here?

        """
        return data

    def info2(self, abool=False, astr="", schema_out=None, user_session=None):
        """
        TODO: what info is sent here?

        """
        return data
