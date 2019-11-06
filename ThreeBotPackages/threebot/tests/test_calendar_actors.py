from base_test import BaseTest
from Jumpscale import j
from time import sleep
import requests
import json
from unittest import skip


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
        self.name_calc = self.generate_random_str()
        self.description_calc = self.generate_random_str()
        self.response_calc = self.add_calendar(name=self.name_calc, description=self.description_calc)

    @skip('https://github.com/threefoldtech/jumpscaleX_threebot/issues/193')
    def test001_add_calendar(self):
        self.info('assert status code is 200')
        self.assertEqual(self.response_calc.status_code, 200)

        self.info('assert name is matching with {}'.format(self.name_calc))
        self.assertEqual(self.response_calc.json()['calendar']['display_name'], self.name_calc)

        self.info('assert description is matching with {}'.format(self.description_calc))
        self.assertEqual(self.response_calc.json()['calendar']['description'], self.description_calc)

    def test002_list_calendars(self):
        self.info('assert status code is 200')
        self.assertEqual(self.response_calc.status_code, 200)

        self.info('list all calendars')
        response = self.list_calendars()
        self.info('assert status code is 200')
        self.assertEqual(response.status_code, 200)

        self.info('assert the new calendar is existing in the list')
        self.assertEqual(response.json()['calendars'][-1]['calendar_id'], self.response_calc.json()['calendar']['calendar_id'])

    def test003_get_calendar(self):
        self.info('assert status code is 200')
        self.assertEqual(self.response_calc.status_code, 200)

        response = self.get_calendar(calendar_id=self.response_calc['calendar']['calendar_id'])
        self.info('assert the new calendar is existing in the list')
        self.assertEqual(response.json()['calendar_id'], self.response_calc.json()['calendar']['calendar_id'])

    def test004_get_not_existing_calendar(self):
        self.info('get not existing calendar')
        response = self.get_calendar(calendar_id=self.response_calc['calendar']['calendar_id'].replace('1', '0'))
        self.info('assert tit retunrs 404')
        self.assertEqual(response.status_code, 404)

    def test005_delete_calendar(self):
        self.info('assert status code is 200')
        self.assertEqual(self.response_calc.status_code, 200)

        response = self.delete_calendar(calendar_id=self.response_calc['calendar']['calendar_id'])
        self.info('assert the new calendar is existing in the list')
        self.assertEqual(response.json()['calendar_id'], self.response_calc.json()['calendar']['calendar_id'])




