from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from testconfig import config
import unittest, time
from .base_test import BaseTest
from parameterized import parameterized
import random


@unittest.skip("https://github.com/threefoldtech/jumpscaleX_threebot/issues/185")
class Jobs(BaseTest):
    def setUp(self):
        super().setUp()
        self.get_page(self.myjobs_page)
        self.assertIn("Myjobs Visualizer", self.driver.title)
        self.assertTrue(self.wait_until_element_located("Jobs_bage"))
        self.find_element("Jobs_bage").click()
        self.assertIn("tasks", self.driver.current_url)
        self.rows_count = len(self.get_table_rows("jobs_table"))

    def test01_check_summary_table_head_elements(self):
        """
        * Check  summary table head elements *
        - Get all head values and check it is as expected .
        """
        self.info("Get all head values and check it is as expected ")
        expected_head_elements = [
            "Total Tasks",
            "Success Tasks",
            "Failure Tasks",
            "New Tasks",
            "Running Tasks",
            "Halted Tasks",
        ]
        head_elements = self.get_table_head_data("summary_table")
        self.assertEqual(set(expected_head_elements), set(head_elements))

    def test002_ALL_filter_in_jobs_page(self):
        """
        * test ALL filter *
        - Get jobs page. 
        - Click All filter , Check that it return all jobs.
        - Check that it has same value as all jobs value in summary table.
        """

        self.info("Click All filter , Check that it return all jobs.")
        All_element = self.find_element("ALL_filter")
        All_element.click()
        rows_count_after_all = len(self.get_table_rows("jobs_table"))
        self.assertEqual(rows_count_after_all, self.rows_count)

    @parameterized.expand(
        [("Success", "OK"), ("Failure", "ERROR"), ("New", "NEW"), ("Running", "RUNNING"), ("Halted", "HALTED")]
    )
    def test003_filters_in_jobs_page(self, filter_type, state):
        """
        * test filters [Success, Failure, New, Running, Halted ] in jobs page.*  
        - Get jobs page. 
        - Get filter jobs number from summary table.
        - Click  filter , Check that it return right filtered jobs only .
        
        """
        self.info("Get succfilter ess jobs number from summary table.")
        job_head = "{} Tasks".format(filter_type)
        head_elements = self.get_table_head_data("summary_table")
        column = [i for i, element in enumerate(head_elements) if element == job_head][0]
        summary_table = self.find_element("summary_table")
        table_body = summary_table.find_element_by_tag_name("tbody")
        filtered_jobs = int(table_body.find_elements_by_tag_name("td")[column].text)

        self.info("Click  filter , Check that it return right filtered jobs only .")
        filter_element = self.find_element("{}_filter".format(filter_type))
        filter_element.click()

        if filtered_jobs == 0:
            self.assertEqual("There is no Jobs matching your criteria", self.find_element("no_jobs").text)
        else:
            table_rows = self.get_table_rows("jobs_table")
            for i in range(len(table_rows)):
                self.assertEqual(state, self.get_table_row("jobs_table", i)[3])
            self.assertEqual(len(table_rows), filtered_jobs)

    def test004_job_details(self):
        """
        - Get jobs page. 
        - Pick up one of jobs[J] .
        - Check details of the job [J] .      
        """
        self.info("Pick up one of jobs[J].")
        table_rows = self.get_table_rows("jobs_table")
        job_index = random.randint(1, len(table_rows))
        job_data = self.get_table_row("jobs_table", job_index)

        self.info("check details of the job [J]")
        details_button = table_rows[job_index].find_element_by_tag_name("button")
        details_button.click()

        items_list = self.driver.find_element_by_class_name("list-group")
        item_data = [item.text for item in items_list]

        self.assertTrue([item for item in item_data if "Error" in item][0])
        state = [item[item.find(":") + 2 :] for item in item_data if "State" in item][0]
        self.assertEqual(job_data[3], state)


@unittest.skip("https://github.com/threefoldtech/jumpscaleX_threebot/issues/185")
class workers(BaseTest):
    def setUp(self):
        super().setUp()
        self.get_page(self.myjobs_page)
        self.assertIn("Myjobs Visualizer", self.driver.title)
        self.assertTrue(self.wait_until_element_located("workers_bage"))
        self.find_element("workers_bage").click()
        self.assertIn("workers", self.driver.current_url)
        self.rows_count = len(self.get_table_rows("workers_table"))

    def test01_check_summary_table_head_elements(self):
        """
        * Check  summary table head elements *
        - Get all head values and check it is as expected .
        """
        self.info("Get all head values and check it is as expected ")
        expected_head_elements = ["Total", "New", "Success", "Failure", "Waiting", "Halted"]
        head_elements = self.get_table_head_data("summary_table")
        self.assertEqual(set(expected_head_elements), set(head_elements))

    def test002_ALL_filter_in_workers_page(self):
        """
        * test ALL filter *
        - Get workers page. 
        - Click All filter , Check that it return all workers.
        - Check that it has same value as all workers value in summary table.
        """

        self.info("Click All filter , Check that it return all jobs.")
        All_element = self.find_element("ALL_filter")
        All_element.click()
        rows_count_after_all = len(self.get_table_rows("workers_table"))
        self.assertEqual(rows_count_after_all, self.rows_count)

    @parameterized.expand(
        [("Success", "OK"), ("Failure", "ERROR"), ("New", "NEW"), ("Waiting", "WAITING"), ("Halted", "HALTED")]
    )
    def test003_filters_in_workers_page(self, filter_type, state):
        """
        * test filters [Success, Failure, New, waiting, Halted ] in workers page.*  
        - Get workers page. 
        - Get filtered workers number from summary table.
        - Click  filter , Check that it return right filtered workers only .
        
        """
        self.info("Get filtered workers number from summary table.")
        head_elements = self.get_table_head_data("summary_table")
        column = [i for i, element in enumerate(head_elements) if element == filter_type][0]
        summary_table = self.find_element("summary_table")
        table_body = summary_table.find_element_by_tag_name("tbody")
        filtered_workers = int(table_body.find_elements_by_tag_name("td")[column].text)

        self.info("Click  filter , Check that it return right filtered workers only .")
        filter_element = self.find_element("{}_filter".format(filter_type))
        filter_element.click()

        if filtered_workers == 0:
            self.assertEqual("There is no Workers matching your criteria", self.find_element("no_workers").text)
        else:
            table_rows = self.get_table_rows("workers_table")
            for i in range(len(table_rows)):
                self.assertEqual(state, self.get_table_row("workers_table", i)[0])
            self.assertEqual(len(table_rows), filtered_workers)

