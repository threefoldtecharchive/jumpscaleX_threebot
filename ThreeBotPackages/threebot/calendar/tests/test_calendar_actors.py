from tests.base_test import BaseTest
from Jumpscale import j
from unittest import skip


class CalenderActorsTests(BaseTest):
    @classmethod
    def setUpClass(cls):
        cls.info("start calendar server")
        cl = j.servers.threebot.start()
        cls.info("load calendar actors")
        path = j.core.tools.text_replace(
            "{DIR_BASE}/code/github/threefoldtech/jumpscaleX_threebot/ThreeBotPackages/threebot/calendar"
        )
        cl.actors.package_manager.package_add(path=path)

    @classmethod
    def tearDownClass(cls):
        cls.info("Destroy the running servers")
        cls.execute_local_command("tmux kill-session")

    def setUp(self):
        super().setUp()
        self.info("test case : {}".format(self._testMethodName))
        print("\n")
        self.name_calc = self.generate_random_str()
        self.description_calc = self.generate_random_str()
        self.response_calc = self.add_calendar(name=self.name_calc, description=self.description_calc)
        self.response_event = self.add_event(calendar_id=self.response_calc.json()["calendar"]["calendar_id"])
        self.response_addressbook = self.add_addressbook()

    @skip("https://github.com/threefoldtech/jumpscaleX_threebot/issues/193")
    def test001_add_calendar(self):
        self.info("assert status code is 200")
        self.assertEqual(self.response_calc.status_code, 200)

        self.info("assert name is matching with {}".format(self.name_calc))
        self.assertEqual(self.response_calc.json()["calendar"]["display_name"], self.name_calc)

        self.info("assert description is matching with {}".format(self.description_calc))
        self.assertEqual(self.response_calc.json()["calendar"]["description"], self.description_calc)

    def test002_list_calendars(self):
        self.info("assert status code is 200")
        self.assertEqual(self.response_calc.status_code, 200)

        self.info("list all calendars")
        response = self.list_calendars()
        self.info("assert status code is 200")
        self.assertEqual(response.status_code, 200)

        self.info("assert the new calendar is existing in the list")
        calender_id = self.response_calc.json()["calendar"]["calendar_id"]
        self.assertIn(calender_id, [calendar["calendar_id"] for calendar in response.json()["calendars"]])

    def test003_get_calendar(self):
        self.info("assert status code is 200")
        self.assertEqual(self.response_calc.status_code, 200)

        response = self.get_calendar(calendar_id=self.response_calc.json()["calendar"]["calendar_id"])
        self.info("assert status code is 200")
        self.assertEqual(response.status_code, 200)
        self.info("assert the new calendar is existing in the list")
        self.assertEqual(response.json()["calendar_id"], self.response_calc.json()["calendar"]["calendar_id"])

    @skip("https://github.com/threefoldtech/jumpscaleX_threebot/issues/197")
    def test004_get_not_existing_calendar(self):
        self.info("get not existing calendar")
        response = self.get_calendar(calendar_id=self.response_calc.json()["calendar"]["calendar_id"].replace("1", "0"))
        self.info("assert tit retunrs 404")
        self.assertEqual(response.status_code, 404)

    def test005_delete_calendar(self):
        self.info("assert status code is 200")
        self.assertEqual(self.response_calc.status_code, 200)

        response = self.delete_calendar(calendar_id=self.response_calc.json()["calendar"]["calendar_id"])
        self.info("assert status code is 200")
        self.assertEqual(response.status_code, 200)

        response = self.list_calendars().json()["calendars"]
        self.assertNotIn(
            self.response_calc.json()["calendar"]["calendar_id"], [calendar["calendar_id"] for calendar in response]
        )

    def test006_add_event(self):
        self.info("assert status code is 200")
        self.assertEqual(self.response_calc.status_code, 200)

        self.info("assert status code is 200")
        self.assertEqual(self.response_event.status_code, 200)
        self.info("assert the new event is related to the calendar")
        self.assertEqual(
            self.response_event.json()["calendar_id"], self.response_calc.json()["calendar"]["calendar_id"]
        )

    def test010_add_event_with_data(self):
        self.info("assert status code is 200")
        self.assertEqual(self.response_calc.status_code, 200)

        args = {
            "event": {
                "description": "0xdescription",
                "title": "0xtitle",
                "location": "0xlocas",
                "dtstart": 1571933731,
                "dtend": 1571933750,
                "calendar_id": self.response_calc.json()["calendar"]["calendar_id"],
            }
        }

        response = self.add_event(calendar_id=self.response_calc.json()["calendar"]["calendar_id"], args=args)
        self.info("assert status code is 200")
        self.assertEqual(response.status_code, 200)
        self.info("assert the new event is related to the calendar")
        self.assertEqual(response.json()["calendar_id"], self.response_calc.json()["calendar"]["calendar_id"])

        self.info("assert the event title is matching with the created one.")
        self.assertEqual(response.json()["title"], "0xtitle")

        self.info("assert the event location is matching with the created one.")
        self.assertEqual(response.json()["location"], "0xlocas")

    @skip("https://github.com/threefoldtech/jumpscaleX_threebot/issues/198")
    def test011_get_event(self):
        response = self.get_event(event_id=self.response_event.json()["item_id"])
        self.info("assert status code is 200")
        self.assertEqual(response.status_code, 200)

        self.info("assert the new calendar is existing in the list")
        self.assertEqual(response.json()["item_id"], self.response_event.json()["item_id"])

    @skip("https://github.com/threefoldtech/jumpscaleX_threebot/issues/198")
    def test012_delete_event(self):
        # TODO
        pass

    @skip("https://github.com/threefoldtech/jumpscaleX_threebot/issues/198")
    def test013_edit_event(self):
        # TODO
        pass

    def test014_list_events(self):
        response = self.list_events(calendar_id=self.response_calc.json()["calendar"]["calendar_id"])
        self.info("assert status code is 200")
        self.assertEqual(response.status_code, 200)

        self.info("assert the new calendar is existing in the list")
        self.assertEqual(response.json()["events"][0]["item_id"], self.response_event.json()["item_id"])

    def test015_add_addressbook(self):
        name = self.generate_random_str()
        description = self.generate_random_str()
        args = {"addressbook": {"description": description, "color": "#123abc", "display_name": name}}
        response = self.add_addressbook(name=name, args=args)
        self.info("assert status code is 200")
        self.assertEqual(response.status_code, 200)

        self.info("assert name is matching with {}".format(name))
        self.assertEqual(response.json()["addressbook"]["display_name"], name)

        self.info("assert description is matching with {}".format(description))
        self.assertEqual(response.json()["addressbook"]["description"], description)

    def test016_get_addressbook(self):
        self.info("assert status code is 200")
        self.assertEqual(self.response_addressbook.status_code, 200)

        response = self.get_addressbook(self.response_addressbook.json()["addressbook"]["addressbook_id"])
        self.info("assert status code is 200")
        self.assertEqual(response.status_code, 200)
        self.info("assert the new calendar is existing in the list")
        self.assertEqual(
            response.json()["addressbook_id"], self.response_addressbook.json()["addressbook"]["addressbook_id"]
        )

    @skip("https://github.com/threefoldtech/jumpscaleX_threebot/issues/198")
    def test017_get_not_exising_addressbook(self):
        self.info("assert status code is 200")
        self.assertEqual(self.response_addressbook.status_code, 200)

        response = self.get_addressbook(self.response_addressbook.json()["calendar"]["calendar_id"].replace("1", "0"))
        self.info("assert status code is 404")
        self.assertEqual(response.status_code, 404)

    def test018_list_addressbook(self):
        self.info("list all addressbook")
        response = self.list_addressbook()
        self.info("assert status code is 200")
        self.assertEqual(response.status_code, 200)

        self.info("assert the new addressbook is existing in the list")
        addressbook_id = self.response_addressbook.json()["addressbook"]["addressbook_id"]
        self.assertIn(
            addressbook_id, [addressbook["addressbook_id"] for addressbook in response.json()["addressbooks"]]
        )

    def test019_delete_addressbook(self):
        response = self.delete_addressbook(self.response_addressbook.json()["addressbook"]["addressbook_id"])
        self.info("assert status code is 200")
        self.assertEqual(response.status_code, 200)

        response = self.list_addressbook().json()["addressbooks"]
        self.assertNotIn(
            self.response_addressbook.json()["addressbook"]["addressbook_id"],
            [addressbook["addressbook_id"] for addressbook in response],
        )

    def test020_add_contact(self):
        response = self.add_contact(self.response_addressbook.json()["addressbook"]["addressbook_id"])
        self.info("assert status code is 200")
        self.assertEqual(response.status_code, 200)

        self.info("assert that addressbook is the same")
        self.assertEqual(
            response.json()["addressbook_id"], self.response_addressbook.json()["addressbook"]["addressbook_id"]
        )

    @skip("https://github.com/threefoldtech/jumpscaleX_threebot/issues/198")
    def test021_get_contact(self):
        response = self.add_contact(self.response_addressbook.json()["addressbook"]["addressbook_id"])
        self.info("assert status code is 200")
        self.assertEqual(response.status_code, 200)
        contact_id = response.json()["item_id"]

        response = self.get_contact(contact_id)
        self.info("assert status code is 200")
        self.assertEqual(response.status_code, 200)

        self.info("assert that the contact id is matching")
        self.assertEqual(response.json()["contact_id"], contact_id)

    @skip("https://github.com/threefoldtech/jumpscaleX_threebot/issues/198")
    def test022_list_contacts(self):
        response = self.add_contact(self.response_addressbook.json()["addressbook"]["addressbook_id"])
        self.info("assert status code is 200")
        self.assertEqual(response.status_code, 200)
        contact_id = response.json()["item_id"]

        response = self.list_contacts(self.response_addressbook.json()["addressbook"]["addressbook_id"])
        self.info("assert status code is 200")
        self.assertEqual(response.status_code, 200)

        self.info("assert that the contact id is existing inside the list")
        self.assertIn(contact_id, [contact["contact_id"] for contact in response.json()["contacts"]])
