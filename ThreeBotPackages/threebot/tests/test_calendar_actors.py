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
        self.actors.login("admin", "admin")
        self.actors = gedis_client.actors.addressbook

    def _create_addressbook(self):
        self.info("create new addressbook")
        self.address_name = self.generate_random_str()
        self.address_desc = self.generate_random_str()
        new_addressbook_id = self.actors.add_addressbook(name=self.address_name, description=self.address_desc).decode()
        return new_addressbook_id

    def _create_vcard(self, href):
        self.info('create new vcard')
        vcard = """
        begin:VCARD
        source:ldap://cn=bjorn%20Jensen, o=university%20of%20Michigan, c=US
        name:Bjorn Jensen
        fn:Bj=F8rn Jensen
        n:Jensen;Bj=F8rn
        email;type=internet:bjorn@umich.edu
        tel;type=work,voice,msg:+1 313 747-4454
        key;type=x509;encoding=B:dGhpcyBjb3VsZCBiZSAKbXkgY2VydGlmaWNhdGUK
        end:VCARD
        """
        return self.actors.add_vcard(vcard, href)

    def test001_create_addressbook(self):
        """
        - Create addressbook, should success.
        - List addressbook, should return the new addressbook

        :return:
        """
        old_addressbooks = self.actors.list_addressbooks().addressbooks

        new_addressbook_id = self._create_addressbook()

        new_addressbooks = self.actors.list_addressbooks().addressbooks

        self.info("assert there is a new addressbook")
        self.assertEqual(len(old_addressbooks)+1, len(new_addressbooks))

    def test002_get_address_metadata(self):
        new_addressbook_id = self._create_addressbook()

        self.info("get the address book meta data")
        description = self.actors.get_addressbook_meta(new_addressbook_id).addressbook[new_addressbook_id]["description"]

        self.info("assert it has the correct value")
        self.assertEqual(self.address_desc, description)


    def test003_delete_addressbook(self):
        new_addressbook_id = self._create_addressbook()

        self.info("get the address book meta data")
        self.actors.get_addressbook_meta(new_addressbook_id)

        self.info("delete the address book")
        self.actors.delete_addressbook(new_addressbook_id)

        self.info("try to get the address book meta data, should fail")
        with self.assertRaises(Exception):
            self.actors.get_addressbook_meta(new_addressbook_id)

    def test004_create_vcard(self):
        new_addressbook_id = self._create_addressbook()
        new_vcard_id = self._create_vcard(href=new_addressbook_id)

        self.info("get vcard")
        vcard = self.actors.get_vcard(href=new_vcard_id)

