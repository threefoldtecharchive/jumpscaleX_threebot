from Jumpscale import j
import binascii
from io import BytesIO


class tft_explorer(j.baseclasses.threebot_actor):
    def _init(self, *args, **kwargs):
        bcdb = j.data.bcdb.get("tft_explorer")
        self.phonebook_model = bcdb.model_get(url="tft.explorer.transaction.1")
        self.phonebook_model = bcdb.model_get(url="tft.explorer.wallet.1")

    def info(self, something, schema_out=None, user_session=None):
        """
        TODO: what info is sent here?

        """
        return wallet.address
