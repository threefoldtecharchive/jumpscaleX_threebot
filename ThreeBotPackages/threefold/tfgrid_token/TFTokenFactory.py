from Jumpscale import j
import random


class TFTokenFactory(j.baseclasses.threebot_factory):
    __jslocation__ = "j.threebot.package.token"
    _web = False

    def start(self):
        gedis_client = j.servers.threebot.local_start_default(web=True)
        gedis_client.actors.package_manager.package_add(path=self._dirpath)

    def client_get(self):
        """
        j.threebot.package.token.client_get()
        :return:
        """
        j.servers.threebot.local_start_default(web=True)
        self.client = j.servers.threebot.current.client
        self.client.actors.package_manager.package_add(
            git_url="https://github.com/threefoldtech/jumpscaleX_threebot/tree/master/ThreeBotPackages/threefold/tfgrid_token"
        )

        self.client.reload(namespace="token")

        return self.client

    def test(self, name=""):
        """
        kosmos 'j.threebot.package.token.test()'
        """

        if "tf_grid_token" in [b.name for b in j.data.bcdb.instances]:
            m = j.data.bcdb.get("tf_grid_token")
        else:
            m = j.data.bcdb.new("tf_grid_token")
        m.models_add(path=self._dirpath + "/models")

        gedis_cli = self.client_get()

        cl = j.clients.redis.get(port=8901)
        assert cl.execute_command("PING")

        trans = []
        year = 14
        price_last = 0.06

        for x in range(5):
            self.price = m.model_get(url="tfgrid.token.price.1")
            # j.shell()
            t = self.price.new()
            t.timeframe = "year"
            percent = random.uniform(0.000001, 99.99999)
            percent_less = random.uniform(0.000001, 99.99999)
            while percent_less > percent:
                percent = random.uniform(0.000001, 99.99999)
                percent_less = random.uniform(0.000001, 99.99999)
            sign = random.uniform(-99, 99)
            t.low = str((price_last - (price_last / 100) * percent)) + " USD"
            t.high = str((price_last + (price_last / 100) * percent)) + " USD"
            if sign > 0:
                # bull opening < closing
                t.opening = str((price_last - (price_last / 100) * percent_less)) + " USD"
                t.closing = str((price_last + (price_last / 100) * percent_less)) + " USD"
            else:
                # bear opening > closing
                t.closing = str((price_last - (price_last / 100) * percent_less)) + " USD"
                t.opening = str((price_last + (price_last / 100) * percent_less)) + " USD"
            t.time = "01/01/" + str(year + x)

            print("*****************************************:%s" % t)
            res = gedis_cli.actors.token.add(t)
            print("*************************************res****:%s" % res)
            # data4 = gedis_cli.actors.token.add(t._ddict)

        assert len(res) == 10

        self._log_info("All TESTS DONE")
        return "OK"
