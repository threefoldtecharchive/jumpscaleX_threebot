from tests.base_test import BaseTest
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
        self.assertEqual(response.json()['calendar']['display_name'], name)

        self.info('assert description is matching with {}'.format(description))
        self.assertEqual(response.json()['calendar']['description'], description)
