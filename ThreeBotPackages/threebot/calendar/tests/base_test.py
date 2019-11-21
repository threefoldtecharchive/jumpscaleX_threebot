from unittest import TestCase
from loguru import logger
from uuid import uuid4
from testconfig import config
import requests, subprocess


class BaseTest(TestCase):
    LOGGER = logger

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @staticmethod
    def info(message):
        BaseTest.LOGGER.info(message)

    @staticmethod
    def generate_random_str():
        return str(uuid4()).replace("-", "")[:10]

    @staticmethod
    def execute_local_command(cmd):
        process = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
        output, error = process.communicate()
        return output, error

    def setUp(self):
        self.base_url = "https://{}/web/gedis/http".format(config["server"]["ip"])
        self.info("connect to {}".format(self.base_url))
        self.info("login as admin:admin")
        self.login_calendar()
        self.login_addressbook()

    def url_contractor(self, data, end_point="calendar"):
        base_url = "{}/{}".format(self.base_url, end_point)
        for item in data:
            base_url = "{}/{}".format(base_url, item)
        return base_url

    @staticmethod
    def update_data(data, **kwargs):
        for key in kwargs:
            data[key] = kwargs[key]
        return data

    @staticmethod
    def get(url):
        return requests.get(url, verify=False)

    @staticmethod
    def post(url, data):
        return requests.post(url, json=data, verify=False)

    def login_calendar(self, username="admin", password="admin"):
        self.info("login as {}:{}".format(username, password))
        url = self.url_contractor(["login"])
        data = {"args": {"username": username, "password": password}}
        return self.post(url, data)

    def add_calendar(self, name, **kwargs):
        self.info("add calendar {}".format(name))
        url = self.url_contractor(["add"])
        data = {"args": {"calendar": {"description": "description", "color": "#123abc", "display_name": name}}}
        data = self.update_data(data, **kwargs)
        return self.post(url, data)

    def list_calendars(self):
        self.info("list calendars")
        return self.get(self.url_contractor(["list"]))

    def get_calendar(self, calendar_id):
        self.info("get calendar with id : {}".format(calendar_id))
        url = self.url_contractor(["get"])
        data = {"args": {"calendar_id": "{}".format(calendar_id)}}
        return self.post(url, data)

    def delete_calendar(self, calendar_id):
        self.info("delete calendar with id : {}".format(calendar_id))
        url = self.url_contractor(["delete"])
        data = {"args": {"calendar_id": calendar_id}}
        return self.post(url, data)

    def add_event(self, calendar_id, **kwargs):
        self.info("add event to calendar with id : {}".format(calendar_id))
        url = self.url_contractor(["add_event"])
        data = {
            "args": {
                "event": {
                    "description": "desco",
                    "title": "title",
                    "location": "locas",
                    "dtstart": 1571933731,
                    "dtend": 1571933750,
                    "calendar_id": calendar_id,
                }
            }
        }
        data = self.update_data(data, **kwargs)
        return self.post(url, data)

    def get_event(self, event_id):
        self.info("get event with id : {}".format(event_id))
        url = self.url_contractor(["get_event"])
        data = {"args": {"event_id": "{}".format(event_id)}}
        return self.post(url, data)

    def delete_event(self, calendar_id, event_id):
        self.info("delete calendar with id : {}".format(event_id))
        url = self.url_contractor(["delete_event"])
        data = {"args": {"event_id": event_id, "calendar_id": calendar_id}}
        return self.post(url, data)

    def list_events(self, calendar_id, **kwargs):
        self.info("list events in calendar with id : {}".format(calendar_id))
        url = self.url_contractor(["list_events"])
        data = {"args": {"event": {"calendar_id": calendar_id}}}
        data = self.update_data(data, **kwargs)
        return self.post(url, data)

    def edit_event(self, calendar_id, event_id, **kwargs):
        """
        {
        "args":{
          "event": {
            "description":"desco3",
            "title": "title3",
            "location": "locas3",
            "dtstart": 1571933731,
            "dtend": 1571933750,
            "calendar_id": "f5f05de8-d354-4dc3-96c1-1ab62f427c70",
            "item_id": "caa7d6bf-dfbc-4f65-99a4-ae3ed010adf2.ics",
            "timezone": "Africa/Cairo"
          }
        }

        """
        self.info("edit event with id : {}".format(event_id))
        url = self.url_contractor(["edit_event"])
        data = {"args": {"event": {"calendar_id": calendar_id, "item_id": event_id}}}
        data = self.update_data(data, **kwargs)
        return self.post(url, data)

    def login_addressbook(self, username="admin", password="admin"):
        self.info("login as {}:{}".format(username, password))
        url = self.url_contractor(["login"], end_point="addressbook")
        data = {"args": {"username": username, "password": password}}
        return self.post(url, data)

    def add_addressbook(self, name="name", **kwargs):
        self.info("add addressbook {}".format(name))
        url = self.url_contractor(["add"], end_point="addressbook")
        data = {"args": {"addressbook": {"description": "description3", "color": "#123abc", "display_name": name}}}
        data = self.update_data(data, **kwargs)
        return self.post(url, data)

    def get_addressbook(self, addressbook_id):
        self.info("get addressbook with id : {}".format(addressbook_id))
        url = self.url_contractor(["get"], end_point="addressbook")
        data = {"args": {"addressbook_id": "{}".format(addressbook_id)}}
        return self.post(url, data)

    def list_addressbook(self):
        self.info("list addressbook")
        return self.get(self.url_contractor(["list"], end_point="addressbook"))

    def delete_addressbook(self, addressbook_id):
        self.info("delete addressbook with id : {}".format(addressbook_id))
        url = self.url_contractor(["delete"], end_point="addressbook")
        data = {"args": {"addressbook_id": addressbook_id}}
        return self.post(url, data)

    def add_contact(self, addressbook_id, **kwargs):
        self.info("add contact to addressbook with id : {}".format(addressbook_id))
        url = self.url_contractor(["add_contact"], end_point="addressbook")
        data = {
            "args": {
                "contact": {
                    "addressbook_id": addressbook_id,
                    "title": "vvvvvvvvvvvvvv",
                    "familyname": "haaaaaaa",
                    "givenname": "Hamdy",
                    "categories": ["category1, category2", "category3"],
                    "nickname": "hackoback",
                    "homepage": "homepage.com",
                    "videchat": "www.videochat.com/user",
                    "blog": "myblog.com",
                    "facebook": "myfacebook.com",
                    "calendar_url": "mycalendar.com",
                    "anniversary": 1572182495,
                    "notes": "noooooooootes",
                    "spouse": "spouse",
                    "birthday": 1572182495,
                    "emails": [
                        {"email": "hamdy.a.farag@gmail.com", "type": "Home"},
                        {"email": "hamdy.a.farag@gmail.com", "type": "Work"},
                        {"email": "hamdy.a.farag@gmail.com", "type": "Other"},
                    ],
                    "telephones": [
                        {"telephone": "1234567", "type": "Home"},
                        {"telephone": "1234567", "type": "Business"},
                        {"telephone": "1234567", "type": "Other"},
                    ],
                    "ims": [
                        {"type": "Skype", "username": "hamdy.a.farag"},
                        {"type": "Yahoo", "username": "hamdy.a.farag"},
                    ],
                    "mailaddresses": [
                        {
                            "street": "street",
                            "city": "city",
                            "code": "code",
                            "region": "state",
                            "country": "country",
                            "box": "box 123",
                            "type": "home",
                        }
                    ],
                    "job": {
                        "manager": "manager",
                        "profession": "profession",
                        "company": "company",
                        "office": "office",
                        "assistant": "assistant",
                        "title": "title",
                        "department": "department",
                    },
                }
            }
        }
        data = self.update_data(data, **kwargs)
        return self.post(url, data)

    def get_contact(self, contact_id):
        self.info("get contact with id : {}".format(contact_id))
        url = self.url_contractor(["get_contact"], end_point="addressbook")
        data = {"args": {"contact_id": contact_id}}
        return self.post(url, data)

    def list_contacts(self, addressbook_id):
        self.info("list contacts in addressbook with id : {}".format(addressbook_id))
        url = self.url_contractor(["list_contacts"], end_point="addressbook")
        data = {"args": {"contact": {"addressbook_id": addressbook_id}}}
        return self.post(url, data)
