from Jumpscale import j
import binascii
from io import BytesIO


class tft_explorer(j.baseclasses.threebot_actor):
    def _init(self, *args, **kwargs):
        bcdb = j.data.bcdb.get("tft_explorer")
        self.tft_ex_t = bcdb.model_get(url="tft.explorer.transaction.1")
        self.tft_ex_w = bcdb.model_get(url="tft.explorer.wallet.1")

    def data_dump_transaction(self, transaction_data, schema_out=None, user_session=None):

        # we can't use schema_out because it is not linked to a bcdb
        # neither to a namespace id
        # t = schema_out.new()
        print("****************************** transaction_data:%s " % transaction_data)
        transaction_data = j.data.serializers.json.loads(transaction_data)
        t = self.tft_ex_t.new()
        t.from_addr = transaction_data["from_addr"]
        t.to_addr = transaction_data["to_addr"]
        t.amount = transaction_data["amount"]
        print("******************************t:%s   " % t)

        r = self.tft_ex_t.set(t)
        return r

    def get_transactions(self, schema_out=None, user_session=None):
        ts = j.data.serializers.json.dumps({"transactions": [t for t in self.tft_ex_t.find()]})
        return ts
