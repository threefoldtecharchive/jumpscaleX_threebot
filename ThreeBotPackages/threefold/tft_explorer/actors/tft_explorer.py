from Jumpscale import j
import binascii
from io import BytesIO


class tft_explorer(j.baseclasses.threebot_actor):
    def _init(self, *args, **kwargs):
        bcdb = j.data.bcdb.get("tft_explorer")
        self.tft_ex_t = bcdb.model_get(url="tft.explorer.transaction.1")
        self.tft_ex_w = bcdb.model_get(url="tft.explorer.wallet.1")

    def data_dump_transaction(self, transaction_data, schema_out=None, user_session=None):
        """
        ```in
        transaction_data = (O) !tft.explorer.transaction.1
        ```

        ```out
        !tft.explorer.transaction.1
        ```

        """
        t = schema_out.new()
        print("******************************model:%s schema_out:%s t:%s" % (self.tft_ex_t, schema_out, t))

        t.from_addr = transaction_data.from_addr
        t.to_addr = transaction_data.to_addr
        t.amount = transaction_data.amount
        self.tft_ex_t.set(t)
        return t

    def get_transactions(self, schema_out=None, user_session=None):
        ts = j.data.serializers.json.dumps({"transactions": [t for t in self.tft_ex_t.find()]})
        return ts

