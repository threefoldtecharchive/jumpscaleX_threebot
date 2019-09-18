from Jumpscale import j
import binascii
from io import BytesIO


class mail(j.baseclasses.threebot_actor):
    def _init(self, *args, **kwargs):
        bcdb = j.data.bcdb.get("mail")
        self.tft_ex_t = bcdb.model_get(url="mail.body.1")

    def send_mail(self, to, body, schema_out=None, user_session=None):
        """
        ```in
        event = (O) !calendar.request.1
        ```

        ```out
        !tft.explorer.transaction.1
        ```

        """
