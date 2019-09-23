from Jumpscale import j


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

        self.client_get()

        cl = j.clients.redis.get(port=8901)
        assert cl.execute_command("PING")
        data = {"from_addr": "0xmkjxlhxzledhzkjhdzekhdze", "to_addr": "54d65dez46ez4de564d6z4de3dz", "amount": 3}
        data2 = j.data.serializers.json.dumps(data)
        data3 = cl.execute_command("default.tft_explorer.data_dump_transaction", data2)

        # we can't decode the jsx data because we don't have the schema
        # so we need to import the schema somehow ?
        data_dec = j.data.serializers.jsxdata.loads(data3)

        assert data_dec.amount == 3
        assert data_dec.from_addr == "0xmkjxlhxzledhzkjhdzekhdze"
        assert data_dec.to_addr == "54d65dez46ez4de564d6z4de3dz"
        # bcdb = j.data.bcdb.get("tft_explorer")
        """  tft_ex_t = bcdb.model_get(url="tft.explorer.transaction.1")
        o = tft_ex_t.new()
        o.from_addr = "0xmkjxlhxzledhzkjhdzekhdze"
        o.to_addr = "54d65dez46ez4de564d6z4de3dz"
        o.amount = 8
        self.client.actors.tft_explorer.data_dump_transaction(o) """
        # j.shell()
        # e = self.client.actors.tft_explorer.data_dump_transaction(data2)
        # z = self.client.actors.tft_explorer.data_dump_transaction(data2)
        # x = self.client.actors.tft_explorer.get_transactions()
        # lets now do example where we go over redis interface

        # print(name)
        # self._test_run(name=name)

        self._log_info("All TESTS DONE")
        return "OK"
