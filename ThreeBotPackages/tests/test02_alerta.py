from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from testconfig import config
import unittest, time
import base
from parameterized import parameterized
import random
from loguru import logger
from Jumpscale import j


page_url = "http://172.17.0.2/zerobot/alerta/"

driver = base.set_browser()


def before_all():
    j.servers.threebot.start(background=True)
    cl = j.clients.gedis.get(name="test", port=8901, package_name="zerobot.packagemanager")
    cl.actors.package_manager.package_add(
        path="/sandbox/code/github/threefoldtech/jumpscaleX_threebot/ThreeBotPackages/zerobot/alerta"
    )


def before():
    global driver
    driver = base.set_browser()
    base.get_page(driver, page_url)
    assert "Alerta" in driver.title


def after():
    driver.close()


def test_001_search_box():
    """
    * test search box *
    - Get alerts page.
    - Use search box with not exist value, should return that value doesn't exist.
    - Use Search box with exist value, should return right value.
    """
    base.wait_until_element_located(driver, "alerts_table") is True
    rows_count = len(base.get_table_rows(driver, "alerts_table"))

    base.info(" Use search box with not exist value, should return that value doesn't exist.")
    alerta_search_box = base.find_element(driver, "alerta_search_box")
    random_value = base.rand_string()
    alerta_search_box.send_keys(random_value)
    elem = base.find_element(driver, "no_alerts")
    assert "There is no alerts matching your criteria" == elem.text
    base.info(" Use Search box with exist value, should return right value")
    alerta_search_box.clear()
    alerta_search_box.send_keys(" ")
    base.wait_until_element_located(driver, "alerts_table") is True

    ramdom_row_number = random.randint(1, rows_count)
    table_row = base.get_table_row(driver, "alerts_table", ramdom_row_number - 1)
    alerta_search_box.clear()
    alerta_search_box.send_keys(table_row[7].split()[2])
    alerta_table_after_search = base.get_table_rows(driver, "alerts_table")
    for i in range(len(alerta_table_after_search)):
        assert table_row[7].split()[2] in base.get_table_row(driver, "alerts_table", i)[7]


def test_002_delete_alerts():
    """
    * test delete alerts. *
    - Get alerts page.
    - Use delete button, check that all alerts has been deleted.
    """
    base.info("Use delete button, check that all alerts has been deleted.")
    delete_button = base.find_element(driver, "delete_alerts")
    delete_button.click()
    base.find_element(driver, "confirm_delete_alert").click()
    assert "All the alerts have been deleted." == base.find_element(driver, "no_alerts").text
