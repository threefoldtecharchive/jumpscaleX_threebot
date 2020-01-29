from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from selenium.common.exceptions import NoSuchElementException
from testconfig import config
import unittest
import time
from .base_test import BaseTest
from parameterized import parameterized
import random
from Jumpscale import j


@unittest.skip("https://github.com/threefoldtech/jumpscaleX_threebot/issues/185")
class alerta(BaseTest):
    def setUp(self):
        super().setUp()
        self.get_page(self.alerta_page)
        self.assertIn("Alerta", self.driver.title)
        self.assertTrue(self.wait_until_element_located("alerts_table"))
        self.rows_count = len(self.get_table_rows("alerts_table"))

    def test001_ALL_filter(self):
        """
        * test ALL filter *
        - Get jobs page.
        - Click All filter , Check that it return all jobs.
        - Check that it has same value as all jobs value in summary table.
        """

        self.info("Click All filter , Check that it return all jobs.")
        All_element = self.find_element("All_filter_alerta")
        All_element.click()
        rows_count_after_all = len(self.get_table_rows("alerts_table"))
        self.assertEqual(rows_count_after_all, self.rows_count)

    @parameterized.expand(
        [("Production", "PRODUCTION"), ("Development", "DEVELOPMENT"), ("Infrastucture", "INFRATUCTURE")]
    )
    def test002_environment_filters(self, filter_type, env_type):
        """
        * test filters [Production, Development, Infrastucture ] in alerta page.*
        - Get alerts page.
        - Click filter , Check that it return right filtered alerta environment only .
        - Click reset filter, should return all alerts .
        """
        self.info("Get {} filter rows ".format(filter_type))
        table_rows = self.get_table_rows("alerts_table")
        filterd_alerts = []
        for i in range(len(table_rows)):
            table_row = self.get_table_row("alerts_table", i)
            if table_row[4] == env_type:
                filterd_alerts.append(table_row)

        self.info("Click  filter , Check that it return right filtered alerta environment only")
        filter_element = self.find_element(filter_type)
        filter_element.click()

        if len(filterd_alerts) == 0:
            self.assertEqual("There is no alerts matching your criteria", self.find_element("no_alerts").text)
        else:
            table_rows_after = self.get_table_rows("alerts_table")
            self.assertEqual(len(filterd_alerts), len(table_rows_after))
            for i in range(len(table_rows_after)):
                self.assertEqual(env_type, self.get_table_row("alerts_table", i)[4])

        self.info("Click reset filter, should return all alerts .")
        reset_filter = self.find_element("reset_filters")
        reset_filter.click()
        table_rows = self.get_table_rows("alerts_table")
        self.assertEqual(len(table_rows), self.rows_count)

    def test003_search_box(self):
        """
        * test search box *
        - Get alerts page.
        - Use search box with not exist value, should return that value doesn't exist.
        - Use Search box with exist value, should return right value.
        """
        self.info(" Use search box with not exist value, should return that value doesn't exist.")
        alerta_search_box = self.find_element("alerta_search_box")
        random_value = self.rand_string()
        alerta_search_box.send_keys(random_value)
        try:
            elem = self.find_element("No_alerts")
            self.assertEqual("There is no alerts matching your criteria", elem.text)
        except NoSuchElementException:
            self.fail("searchbox doesn't work successfully ")

        self.info(" Use Search box with exist value, should return right value")
        alerta_search_box.clear()
        ramdom_row_number = random.randint(1, self.rows_count)
        table_row = self.get_table_row("alerts_table", ramdom_row_number)
        alerta_search_box.send_keys(table_row[9])
        alerta_table_after_search = self.get_table_rows("alerts_table")
        for i in range(len(alerta_table_after_search)):
            self.assertEqual(table_row[9], self.get_table_row("alerts_table", i)[9])

    @parameterized.expand(["Services", "Message type", "Status"])
    def test004_filters_options(self, filter_type):
        """
        * test  options ["Services", "Message type", "Status"] *
        - Get alerts page.
        - Get column of the filter.
        - Click on filter .
        - check every option option in this filter, Check that it return filterd alerta services.
        """
        self.info("Get column of the filter.")
        head_elements = self.get_table_head_data("alerts_table")
        head_name = filter_type
        if filter_type == "Message type":
            head_name = "Message Type"
        column = [i for i, element in enumerate(head_elements) if element == head_name][0]

        self.info("Click on {} filter.".format(filter_type))
        filter_menue = self.find_element(filter_type)
        filter_menue.find_element_by_id("dropdownMenuButton").click()

        self.info(" check every option option in this filter, Check that it return filterd alerta services.")
        options = filter_menue.find_elements_by_class_name("dropdown-item")
        for option in options:
            option_text = option.get_attribute("innerHTML")
            if not option_text:
                continue

            self.info("Get all {} option rows ".format(option))
            table_rows = self.get_table_rows("alerts_table")
            option_alerts = []
            for i in range(len(table_rows)):
                table_row = self.get_table_row("alerts_table", i)
                if table_row[column] == option_text:
                    option_alerts.append(table_row)
            self.info("Click {} option in this filter ".format(option_text))
            option.click()

            self.info("Check it return filterd alerts only")
            if not option_alerts:
                self.assertEqual("There is no alerts matching your criteria", self.find_element("no_alerts").text)
            else:
                alerta_table_after_filter = self.get_table_rows("alerts_table")
                self.assertEqual(len(alerta_table_after_filter), len(option_alerts))
                for i in range(len(alerta_table_after_filter)):
                    self.assertEqual(option_text, self.get_table_row("alerts_table", i)[column])

    def test005_delete_alerts(self, filter_type):
        """
        * test delete alerts. *
        - Get alerts page.
        - Use delete button, check that all alerts has been deleted.
        - Add some alerts .
        """
        self.info("Use delete button, check that all alerts has been deleted.")
        delete_button = self.find_element("delete_alerts")
        delete_button.click()
        self.assertEqual("There is no alerts matching your criteria", self.find_element("no_alerts").text)

        self.info("Add some alerts.")
        client = j.servers.threebot.start()
        for _ in range(5):
            client.actors.alerta.new_alert(
                severity=10,
                status=random.choice(["NEW", "OK", "ERROR"]),
                environment=random.choice(["PRODUCTION", "STAGING", "DEVELOPMENT", "INFRATUCTURE"]),
                service=random.choice(["JSX", ""]),
                resource="xmonader",
                event="event 1",
                value="n/a",
                messageType=random.choice(["Error", "Information", "Warning"]),
                text=self.rand_string(),
            )
