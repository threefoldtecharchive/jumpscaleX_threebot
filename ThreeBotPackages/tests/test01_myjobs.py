from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from testconfig import config
import unittest, time
import base
from parameterized import parameterized
import random
from loguru import logger
from Jumpscale import j


page_url = "http://172.17.0.2/zerobot/myjobs_ui/"

driver = base.set_browser()


def before_all():

    j.servers.threebot.start(background=True)
    cl = j.clients.gedis.get(name="test", port=8901, package_name="zerobot.packagemanager")
    cl.actors.package_manager.package_add(
        path="/sandbox/code/github/threefoldtech/jumpscaleX_threebot/ThreeBotPackages/zerobot/myjobs"
    )


def before():
    global driver
    driver = base.set_browser()
    base.get_page(driver, page_url)
    assert "Myjobs Visualizer" in driver.title


def after():
    driver.close()


def test01_check_summary_table_head_elements():
    """                       
    * Check  summary table head elements *
    - Get all head values and check it is as expected .
    """
    base.wait_until_element_located(driver, "Jobs_bage") is True
    base.find_element(driver, "Jobs_bage").click()
    assert "tasks" in driver.current_url

    base.wait_until_element_located(driver, "summary_table") is True

    base.info("Get all head values and check it is as expected ")
    expected_head_elements = [
        "Total Tasks",
        "Success Tasks",
        "Failure Tasks",
        "New Tasks",
        "Running Tasks",
        "Halted Tasks",
    ]
    head_elements = base.get_table_head_data(driver, "summary_table")
    assert set(expected_head_elements) == set(head_elements)


def test_002_ALL_filter_in_jobs_page():
    """
    * test ALL filter *
    - Get jobs page.
    - Click All filter , Check that it return all jobs.
    - Check that it has same value as all jobs value in summary table.
    """
    base.wait_until_element_located(driver, "Jobs_bage") is True
    base.find_element(driver, "Jobs_bage").click()
    assert "tasks" in driver.current_url

    base.wait_until_element_located(driver, "jobs_table") is True
    base.info("Click All filter , Check that it return all jobs.")
    rows_count = len(base.get_table_rows(driver, "jobs_table"))
    All_element = base.find_element(driver, "ALL_filter")
    All_element.click()
    rows_count_after_all = len(base.get_table_rows(driver, "jobs_table"))
    assert rows_count_after_all == rows_count


@parameterized.expand(
    [("Success", "OK"), ("Failure", "ERROR"), ("New", "NEW"), ("Running", "RUNNING"), ("Halted", "HALTED")]
)
def test_003_filters_in_jobs_page(filter_type, state):
    """
    * test filters [Success, Failure, New, Running, Halted ] in jobs page.*
    - Get jobs page.
    - Get filter jobs number from summary table.
    - Click  filter , Check that it return right filtered jobs only .

    """
    base.wait_until_element_located(driver, "Jobs_bage") is True
    base.find_element(driver, "Jobs_bage").click()
    assert "tasks" in driver.current_url

    base.wait_until_element_located(driver, "summary_table") is True

    base.info("Get succfilter ess jobs number from summary table.")
    head_elements = base.get_table_head_data(driver, "summary_table")
    job_head = "{} Tasks".format(filter_type)

    column = [i for i, element in enumerate(head_elements) if element == job_head][0]
    summary_table = base.find_element(driver, "summary_table")
    table_body = summary_table.find_element_by_tag_name("tbody")
    filtered_jobs = int(table_body.find_elements_by_tag_name("td")[column].text)

    base.info("Click  filter , Check that it return right filtered jobs only .")
    filter_element = base.find_element(driver, "{}_filter".format(filter_type))
    filter_element.click()

    if filtered_jobs == 0:
        assert "There is no Jobs matching your criteria" == base.find_element(driver, "no_jobs").text
    else:
        table_rows = base.get_table_rows(driver, "jobs_table")
        for i in range(len(table_rows)):
            assert state == base.get_table_row(driver, "jobs_table", i)[3]
        assert len(table_rows) == filtered_jobs


def test_004_job_details():
    """
    - Get jobs page.
    - Pick up one of jobs[J] .
    - Check details of the job [J] .
    """
    base.wait_until_element_located(driver, "Jobs_bage") is True
    base.find_element(driver, "Jobs_bage").click()
    assert "tasks" in driver.current_url

    base.info("Pick up one of jobs[J].")
    base.wait_until_element_located(driver, "jobs_table") is True
    table_rows = base.get_table_rows(driver, "jobs_table")
    job_index = random.randint(1, len(table_rows))
    job_data = base.get_table_row(driver, "jobs_table", job_index)
    base.info("check details of the job [J]")
    details_button = table_rows[job_index - 1].find_element_by_tag_name("button")
    details_button.click()
    time.sleep(10)
    items_list = driver.find_element_by_class_name("list-group")
    items = items_list.find_elements_by_tag_name("li")

    item_data = [item.get_attribute("textContent") for item in items]

    state = [item[item.find(":") + 2 :] for item in item_data if "State" in item][0]
    assert job_data[3] == state


def test05_check_summary_table_head_elements_in_workers_page():
    """
    * Check  summary table head elements *
    - Get all head values and check it is as expected .
    """
    base.find_element(driver, "workers_bage").click()
    assert "workers" in driver.current_url

    base.info("Get all head values and check it is as expected ")
    expected_head_elements = ["Total", "New", "Success", "Failure", "Waiting", "Halted"]
    head_elements = base.get_table_head_data(driver, "summary_table")
    assert set(expected_head_elements) == set(head_elements)


def test06_ALL_filter_in_workers_page():
    """
    * test ALL filter *
    - Get workers page.
    - Click All filter , Check that it return all workers.
    - Check that it has same value as all workers value in summary table.
    """

    base.find_element(driver, "workers_bage").click()
    assert "workers" in driver.current_url
    rows_count = len(base.get_table_rows(driver, "workers_table"))

    base.info("Click All filter , Check that it return all jobs.")
    All_element = base.find_element(driver, "ALL_filter")
    All_element.click()
    rows_count_after_all = len(base.get_table_rows(driver, "workers_table"))
    assert rows_count_after_all == rows_count


@parameterized.expand(
    [("Success", "OK"), ("Failure", "ERROR"), ("New", "NEW"), ("Waiting", "WAITING"), ("Halted", "HALTED")]
)
def test07_filters_in_workers_page(filter_type, state):
    """
    * test filters [Success, Failure, New, waiting, Halted ] in workers page.*
    - Get workers page.
    - Get filtered workers number from summary table.
    - Click  filter , Check that it return right filtered workers only .

    """
    base.find_element(driver, "workers_bage").click()
    assert "workers" in driver.current_url

    base.info("Get filtered workers number from summary table.")
    head_elements = base.get_table_head_data(driver, "summary_table")
    column = [i for i, element in enumerate(head_elements) if element == filter_type][0]
    summary_table = base.find_element(driver, "summary_table")
    table_body = summary_table.find_element_by_tag_name("tbody")
    filtered_workers = int(table_body.find_elements_by_tag_name("td")[column].text)

    base.info("Click  filter , Check that it return right filtered workers only .")
    filter_element = base.find_element(driver, "{}_filter".format(filter_type))
    filter_element.click()

    if filtered_workers == 0:
        assert "There is no Workers matching your criteria" == base.find_element(driver, "no_workers").text
    else:
        table_rows = base.get_table_rows(driver, "workers_table")
        for i in range(len(table_rows)):
            assert state == base.get_table_row(driver, "workers_table", i)[1]
        assert len(table_rows) == filtered_workers
