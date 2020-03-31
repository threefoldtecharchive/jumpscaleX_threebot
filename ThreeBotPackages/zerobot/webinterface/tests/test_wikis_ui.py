from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from testconfig import config
import unittest
import time
import uuid
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from Jumpscale import j

wikis_url = "http://172.17.0.2/#!/main/wikis"


def info(message):
    j.tools.logger._log_info(message)


def set_browser():
    options = webdriver.ChromeOptions()
    options.add_argument("--no-sandbox")
    options.add_argument("--headless")
    options.add_argument("--window-size=1920,1080'")
    driver = webdriver.Chrome(options=options)
    return driver


def get_page(driver, page_url):
    try:
        driver.get(page_url)
    except Exception as e:
        info(" * %s Exception at get_page(%s) " % (str(e), page_url))
    else:
        maximize_window(driver)


def maximize_window(driver):
    time.sleep(1)
    screen_dimention = driver.get_window_size()
    screen_size = screen_dimention["width"] * screen_dimention["height"]
    if screen_size < 1800 * 1000:
        driver.set_window_size(1800, 1000)


def load_wikis():
    gedis_client = j.clients.gedis.get(
        name="test_wiki", host="127.0.0.1", port=8901, package_name="zerobot.packagemanager"
    )
    gedis_client.actors.package_manager.package_add(
        path=j.core.tools.text_replace(
            "{DIR_BASE}/code/github/threefoldtech/jumpscaleX_threebot/ThreeBotPackages/zerobot/wiki_examples"
        )
    )
    time.sleep(20)


driver = set_browser()


def before_all():

    j.servers.threebot.start(background=True)
    load_wikis()


def before():
    global driver
    driver = set_browser()
    get_page(driver, wikis_url)
    assert "Admin dashboard" in driver.title


def after():
    driver.close()


def test001_test_view_button():
    """
    Test case for checking view button.

    **Test scenario**
    #. Get wikis page.
    #. Click view button , should be found.
    #. Check that view button works successfully and redirect to right wikis files.

    """


def test002_test_reload_button():
    """
    Test case for checking reload button.

    **Test scenario**
    #. Get wikis page.
    #. Create new file in wikis_example directory.
    #. Click reload button in wikis_example wiki, should succeed.
    #. Click view button then check that reloaded file exist in wikis .
    
    """


def test003_test_pull_button():
    """
    Test case for checking pull button.

    **Test scenario**
    #. Get wikis page.
    #. Change to older commit in wikis_example directory.
    #. Click reload button in wikis_example wiki, should succeed.
    #. Click pull button then check that repo converted to latest commit.
    
    """
