from Jumpscale import j
import binascii
from io import BytesIO


class ibiza_actor(j.baseclasses.threebot_actor):
    def _init(self, *args, **kwargs):
        bcdb = j.data.bcdb.get("test")
        self.model = bcdb.model_get(url="jumpscale.ibiza.model")

    def info(self, something, schema_out=None, user_session=None):
        """
        TODO: what info is sent here?

        """
        return wallet.address
