from base_test import BaseTest
from Jumpscale import j
from time import sleep
import requests
import json


class CalenderActorsTests(BaseTest):
    @classmethod
    def setUpClass(cls):
        cls.info("start calendar server")
        cl = j.servers.threebot.local_start_default(web=True)
        cls.info("load calendar actors")
        cl.actors.package_manager.package_add(
            path='"/sandbox/code/github/threefoldtech/jumpscaleX_threebot/ThreeBotPackages/threebot/calendar"')
        sleep(30)

    @classmethod
    def tearDownClass(cls):
        cls.info("Destroy the bcdb")
        j.data.bcdb.destroy_all()

    def setUp(self):
        super().setUp()
        self.info("test case : {}".format(self._testMethodName))
        print('\n')

    def test001_add_calendar(self):
        name = self.generate_random_str()
        description = self.generate_random_str()
        response = self.add_calendar(name=name, description=description)
        self.info('assert status code is 200')
        self.assertEqual(response.status_code, 200)

        self.info('assert name is matching with {}'.format(name))
        self.assertEqual(response.json()['display_name'], name)

        self.info('assert description is matching with {}'.format(description))
        self.assertEqual(response.json()['description'], description)

# def test001_create_addressbook(self):
    #     """
    #     - Create addressbook, should success.
    #     - List addressbook, should return the new addressbook
    #
    #     :return:
    #     """
    #     old_addressbooks = self.actors.list_addressbooks().addressbooks
    #     self._create_addressbook()
    #     new_addressbooks = self.actors.list_addressbooks().addressbooks
    #
    #     self.info("assert there is a new addressbook")
    #     self.assertEqual(len(old_addressbooks)+1, len(new_addressbooks))
    #
    # def test002_get_address_metadata(self):
    #     new_addressbook_id = self._create_addressbook()
    #
    #     self.info("get the address book meta data")
    #     description = self.actors.get_addressbook_meta(new_addressbook_id).addressbook['{}/'.format(new_addressbook_id)]["description"]
    #
    #     self.info("assert it has the correct value")
    #     self.assertEqual(self.address_desc, description)
    #
    # def test003_delete_addressbook(self):
    #     new_addressbook_id = self._create_addressbook()
    #
    #     self.info("get the address book meta data")
    #     self.actors.get_addressbook_meta(new_addressbook_id)
    #
    #     self.info("delete the address book")
    #     self.actors.delete_addressbook(new_addressbook_id)
    #
    #     self.info("try to get the address book meta data, should fail")
    #     with self.assertRaises(Exception):
    #         self.actors.get_addressbook_meta(new_addressbook_id)
    #
    # def test004_create_vcard(self):
    #     new_addressbook_id = self._create_addressbook()
    #     new_vcard_id = self._create_vcard(href=new_addressbook_id)
    #
    #     self.info("get vcard")
    #     vcard = self.actors.get_vcard(href=new_vcard_id)
    #
