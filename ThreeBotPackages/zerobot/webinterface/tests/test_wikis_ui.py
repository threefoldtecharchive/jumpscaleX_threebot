import requests
import os
import random
import subprocess
import time
import unittest
import uuid

from Jumpscale import j
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
from testconfig import config

wikis_url = "http://127.0.0.1/wiki/"


def info(message):
    j.tools.logger._log_info(message)


def change_wiki_dir(action_name):
    info("Change in sidebar in wiki_example page")
    with open("/sandbox/var/docsites/zerobot.wiki_examples/test_wiki_{}.md".format(action_name), "a") as test_wiki:
        test_wiki.write("test wiki {}".format(action_name))

    with open("/sandbox/var/docsites/zerobot.wiki_examples/_sidebar.md", "a") as sidebar:
        sidebar.write("* [Test wiki {}](test_wiki_{}.md)".format(action_number, action_number))


def find_wiki_example_card():
    for i in range(len(driver.find_elements_by_class_name("card-title"))):
        if driver.find_elements_by_class_name("card-title")[i].text == 'zerobot.wiki_examples':
            card = driver.find_elements_by_class_name("card-title")[i]
    return card


def os_command(command):
    process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    output, error = process.communicate()
    return output, error


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
    os_command("eval `ssh-agent -s` && ssh-add /{}/.ssh/id_rsa".format(os.environ['HOME']))
    j.servers.threebot.start(background=True)
    load_wikis()


def before():
    global driver
    driver = set_browser()
    info("Get wikis page")
    get_page(driver, wikis_url)
    assert "Home" in driver.title


def after():
    driver.close()


def after_all():
    j.sal.process.killall("tmux")


def test001_test_view_button():
    """
    Test case for checking view button.

    **Test scenario**
    #. Get wikis page.
    #. Click view button , should be found.
    #. Check that view button works successfully and redirect to right wikis files.
    """
    info("Click view button")
    cards = driver.find_elements_by_class_name("card-title")
    random_card = random.choice(cards)

    card_name = random_card.find_element_by_class_name("card-title").text

    random_card.find_element_by_link_text("View").click()

    info("Check that view button works successfully and redirect to right wikis files")
    assert driver.current_url == "{}/{}#".format(wikis_url, card_name)


def test002_test_reload_button():
    """
    Test case for checking reload button.

    **Test scenario**
    #. Get wikis page.
    #. Create new file in wikis_example directory.
    #. Click reload button in wikis_example wiki, should succeed.
    #. Click view button.
    #. Check that sidebar is changed.
    """
    change_wiki_dir("reload")
    info("Click reload button in wikis_example wiki, should succeed")

    card = find_wiki_example_card()
    card.find_element_by_xpath("/html/body/div/div/div/div[2]/div/ul/li[6]/div/div/div/a[2]").click()

    info("Click view button")
    card.find_element_by_link_text("View").click()

    info("Check that sidebar is changed")
    wiki_reload_page = requests.get("https://127.0.0.1/wiki/zerobot.wiki_examples#/test_wiki_reload")
    assert wiki_reload_page.status_code == 200


def test003_test_pull_button():
    """
    Test case for checking pull button.

    **Test scenario**
    #. Get wikis page.
    #. Change in wiki directory.
    #. Click pull button.
    #. Check that the changed file is removed.
    
    """
    info("Change in wiki directory")
    change_wiki_dir("pull")

    info("Click pull button")
    card = find_wiki_example_card()
    card.find_element_by_xpath("/html/body/div/div/div/div[2]/div/ul/li[6]/div/div/div/a[3]").click()

    info("Check that the changed file is removed")
    wiki_reload_page = requests.get("https://127.0.0.1/wiki/zerobot.wiki_examples#/test_wiki_pull")
    assert wiki_reload_page.status_code == 404

