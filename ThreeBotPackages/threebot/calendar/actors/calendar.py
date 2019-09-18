from Jumpscale import j
import binascii
from io import BytesIO


class tft_explorer(j.baseclasses.threebot_actor):
    def _init(self, *args, **kwargs):
        bcdb = j.data.bcdb.get("calendar")
        self.tft_ex_t = bcdb.model_get(url="calendar.request.1")

    def add(self, event, schema_out=None, user_session=None):
        """
        ```in
        event = (O) !calendar.request.1
        ```

        ```out
        !tft.explorer.transaction.1
        ```

        """

    def remove(self, event, schema_out=None, user_session=None):

    def update(self, event, schema_out=None, user_session=None):

    def accept(self, event, schema_out=None, user_session=None):

    def list_by_period(self, event, schema_out=None, user_session=None): 