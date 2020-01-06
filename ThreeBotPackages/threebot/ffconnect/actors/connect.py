from Jumpscale import j
import binascii
from io import BytesIO


class tft_explorer(j.baseclasses.threebot_actor):
    def _init(self, *args, **kwargs):
        self.tft_ex_t = self.bcdb.model_get(url="threebot.ffconnect.room.1")

    @j.baseclasses.actor_method
    def create_room(self, transaction_data, schema_out=None, user_session=None):
        """
        ```in
        transaction_data = (O) !tft.explorer.transaction.1
        ```

        ```out
        !tft.explorer.transaction.1
        ```

        """
        j.shell()

    @j.baseclasses.actor_method
    def join_room(self, schema_out=None, user_session=None):
        j.shell()

    # put here the needed functions to interface with ffconnect
