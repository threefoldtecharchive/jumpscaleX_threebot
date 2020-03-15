from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from testconfig import config
import unittest
import time
import uuid
from Elements import elements
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from Jumpscale import j

ALERTA_ACTOR = j.core.tools.text_replace(
    "{DIR_BASE}/code/github/threefoldtech/jumpscaleX_threebot/ThreeBotPackages/zerobot/alerta"
)
BLOG_ACTOR = j.core.tools.text_replace(
    "{DIR_BASE}/code/github/threefoldtech/jumpscaleX_threebot/ThreeBotPackages/threebot/blog"
)
PASTEBIN_ACTOR = j.core.tools.text_replace(
    "{DIR_BASE}/code/github/threefoldtech/jumpscaleX_threebot/ThreeBotPackages/demo/pastebin"
)
BLOG_EXAMPLE = "git@gitlab.com:xmonader/sample-blog-jsx.git"


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


def find_element(driver, element):
    method = elements[element][0]
    value = elements[element][1]
    element_value = driver.find_element(getattr(By, method), value)
    return element_value


def get_table_head_data(driver, element):
    table = find_element(driver, element)
    thead = table.find_elements_by_tag_name("thead")
    thead_row = thead[0].find_elements_by_tag_name("tr")
    head_elements = thead_row[0].find_elements_by_tag_name("th")
    return [x.text for x in head_elements]


def get_table_rows(driver, element=None):
    element = find_element(driver, element)
    tbody = element.find_element_by_tag_name("tbody")
    rows = tbody.find_elements_by_tag_name("tr")
    return rows


def get_table_row(driver, element, i):
    table_row = get_table_rows(driver, element)[i]
    row_cells = table_row.find_elements_by_tag_name("td")
    assert row_cells != []
    return [x.text for x in row_cells]


def wait_until_element_located(driver, element):
    method = elements[element][0]
    value = elements[element][1]
    for _ in range(3):
        try:
            wait = WebDriverWait(driver, 15)
            wait.until(EC.visibility_of_element_located((getattr(By, method), value)))
            return True
        except:
            time.sleep(1)
        else:
            return False


def info(message):
    j.tools.logger._log_info(message)


def rand_string(size=10):
    return str(uuid.uuid4()).replace("-", "")[1:size]
