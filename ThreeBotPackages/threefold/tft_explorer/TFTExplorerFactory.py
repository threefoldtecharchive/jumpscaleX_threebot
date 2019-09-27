from Jumpscale import j
import uuid
import random


class TFTExplorerFactory(j.baseclasses.object, j.baseclasses.testtools):

    __jslocation__ = "j.threebot.package.tftexplorer"

    def client_get(self):
        """
        j.threebot.package.tftexplorer.client_get()
        :return:
        """
        self.client = j.servers.threebot.local_start_default()

        self.client.actors.package_manager.package_add(
            "threebot_phonebook",
            git_url="https://github.com/threefoldtech/jumpscaleX_threebot/tree/master/ThreeBotPackages/threefold/tft_explorer",
        )

        # self.client.reload(namespace="default")

        return self.client

    def test(self, name=""):
        """
        kosmos -p 'j.threebot.package.tftexplorer.test()'
        """
        if "tft_explorer" in [b.name for b in j.data.bcdb.instances]:
            m = j.data.bcdb.get("tft_explorer")
        else:
            m = j.data.bcdb.new("tft_explorer")
        m.models_add(path=self._dirpath + "/models")
        gedis_cli = self.client_get()

        cl = j.clients.redis.get(port=8901)
        assert cl.execute_command("PING")
        data = {"from_addr": "0xmkjxlhxzledhzkjhdzekhdze", "to_addr": "54d65dez46ez4de564d6z4de3dz", "amount": 3}
        data2 = j.data.serializers.json.dumps(data)
        data3 = cl.execute_command("default.tft_explorer.data_dump_transaction", data2)

        data_dec = j.data.serializers.jsxdata.loads(data3)

        assert data_dec.amount == 3
        assert data_dec.senders == ["0xmkjxlhxzledhzkjhdzekhdze"]
        assert data_dec.recipient == "54d65dez46ez4de564d6z4de3dz"
        trans = []
        for x in range(10):
            self.tft_ex_t = m.model_get(url="tft.explorer.transaction.1")
            t = self.tft_ex_t.new()
            t.senders = [str(uuid.uuid4().hex), str(uuid.uuid4().hex)]
            if x % 2 == 1:
                t.recipient = str(uuid.uuid4().hex)
            else:
                t.recipient = "54d65dez46ez4de564d6z4de3dz"
            t.amount = random.uniform(0.1, 142.42)
            trans.append(t._ddict)
        data4 = gedis_cli.actors.tft_explorer.set_transactions(trans)

        assert len(data4) == 10

        trans = gedis_cli.actors.tft_explorer.get_transaction_by_recipient("54d65dez46ez4de564d6z4de3dz")
        assert trans[0].recipient == "54d65dez46ez4de564d6z4de3dz"
        assert trans[len(trans) - 1].recipient == "54d65dez46ez4de564d6z4de3dz"

        t = gedis_cli.actors.tft_explorer.get(trans[0].id)
        assert trans[0].recipient == t.recipient
        assert trans[0].senders == t.senders
        assert trans[0].amount == t.amount
        print("test ok")
        self._log_info("All TESTS DONE")
        return "OK"
