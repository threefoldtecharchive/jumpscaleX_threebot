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
        self.client.reload()
        """ self.client.reload(namespace="token") """

        return self.client

    def _generate_dummy_data(self, bcdb, timeframe, count, year=14, price_last=0.06):
        res = []
        for x in range(count):
            price = bcdb.model_get(url="tfgrid.token.price.1")
            t = price.new()
            t.timeframe = timeframe
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
            t.time = str(year + x) + "/01/01"
            res.append(t)
        return res

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
        assert gedis_cli.actors.token.delete_all()
        trans = self._generate_dummy_data(m, "year", 5)
        for t in trans:
            res = gedis_cli.actors.token.add(t)
            print("*************************************res****:%s" % res)

        assert len(trans) == 5
        res = gedis_cli.actors.token.list()
        assert len(res.prices) == 5

        res = gedis_cli.actors.token.get_market()
        print("****************************get_market*********res****:%s" % res)
        assert res.max_supply == 100000000000
        j.shell()
        assert res.potential_revenue_per_token > 0

        res = gedis_cli.actors.token.get_capacity()
        print("****************************get_capacity*********res****:%s" % res)
        assert res.max_supply == 100000000000
        assert res.potential_revenue_per_token > 0

        self._log_info("All TESTS DONE")
        return "OK"
