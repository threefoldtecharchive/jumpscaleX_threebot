from ThreeBotPackages.threebot.tests.base_test import BaseTest
from Jumpscale import j


class CalenderActorsTests(BaseTest):
    @classmethod
    def setUpClass(cls):
        cls.info("start default zdb")
        j.servers.zdb.default.start()
        cls.info("start calendar server")
        cmd = 'kosmos -p "j.threebot.package.calendar.start()"'
        cls.info("execute in main tmux : {} ".format(cmd))
        cls.pan = j.servers.tmux.execute(cmd)

    @classmethod
    def tearDownClass(cls):
        cls.info("Destroy the bcdb")
        j.data.bcdb.destroy_all()
        cls.info('kill the running calendar server')
        cls.pan.kill()

    def setUp(self):
        self.info("load calendar actors")
        gedis_client = j.clients.gedis.get("test", port=8901)
        gedis_client.actors.package_manager.package_add(
            path="/sandbox/code/github/threefoldtech/jumpscaleX_threebot/ThreeBotPackages/threebot/calendar")
        self.actors = gedis_client.actors
        self.actors.login("admin", "admin")

    def test001_create_addressbook(self):
        """
        - Create addressbook, should success.
        - List addressbook, should return the new addressbook

        :return:
        """
        old_addressbooks = self.actors.list_addressbooks()
        self.info("create new addressbook")

        address_name = self.generate_random_str()
        address_desc = self.generate_random_str()
        self.actors.add_addressbook(name=address_name, description=address_desc)

        new_addressbooks = self.actors.list_addressbooks()

        self.info("assert there is a new addressbook")
        self.assertEqual(len(old_addressbooks)+1, len(new_addressbooks))




