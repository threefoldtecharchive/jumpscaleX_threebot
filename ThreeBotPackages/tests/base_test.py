from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from testconfig import config
import unittest
import time
import uuid
from loguru import logger
from .Elements import elements
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


class BaseTest(unittest.TestCase):
    LOGGER = logger
    LOGGER.add("backages_{time}.log")

    @classmethod
    def setUpClass(CLS):
        BaseTest.info("add packages actors.")
        BaseTest.blog_name = BaseTest.rand_string()
        gedis_client = j.servers.threebot.start()
        BaseTest.add_actors(gedis_client)
        url = config["main"]["url"]
        BaseTest.browser = config["main"]["browser"]
        BaseTest.alerta_page = url + "/alerta"
        BaseTest.myjobs_page = url + "/myjobs"
        BaseTest.blog_page = url + "/blog"
        BaseTest.pastebin_page = url + "/pastebin"

    def setUp(self):
        self.set_browser()
        self.driver.set_window_size(1800, 1000)
        self.wait = WebDriverWait(self.driver, 15)

    def tearDown(self):
        self.driver.close()

    @staticmethod
    def add_actors(gedis_client):
        j.tools.blog_loader.add_blog(BaseTest.blog_name, BLOG_EXAMPLE)
        gedis_client.actors.package_manager.package_add(path=ALERTA_ACTOR)
        gedis_client.actors.package_manager.package_add(path=BLOG_ACTOR)
        gedis_client.actors.package_manager.package_add(path=PASTEBIN_ACTOR)
        gedis_client.reload()

    def set_browser(self):
        if self.browser == "chrome":
            options = webdriver.ChromeOptions()
            options.add_argument("--no-sandbox")
            options.add_argument("--headless")
            options.add_argument("--window-size=1920,1080'")
            self.driver = webdriver.Chrome(options=options)

        elif self.browser == "firefox":
            self.driver = webdriver.Firefox()
        else:
            self.fail("Invalid browser configuration [%s]" % self.browser)

    def get_page(self, page_url):
        try:
            self.driver.get(page_url)
        except Exception as e:
            self.info(" * %s Exception at get_page(%s) " % (str(e), page_url))
        else:
            self.maximize_window()

    def maximize_window(self):
        time.sleep(1)
        screen_dimention = self.driver.get_window_size()
        screen_size = screen_dimention["width"] * screen_dimention["height"]
        if screen_size < 1800 * 1000:
            self.driver.set_window_size(1800, 1000)

    def find_element(self, element):
        method = elements[element][0]
        value = elements[element][1]
        element_value = self.driver.find_element(getattr(By, method), value)
        return element_value

    def get_table_head_data(self, element):
        table = self.find_element(element)
        thead = table.find_elements_by_tag_name("thead")
        thead_row = thead[0].find_elements_by_tag_name("tr")
        head_elements = thead_row[0].find_elements_by_tag_name("th")
        return [x.text for x in head_elements]

    def get_table_rows(self, element=None):

        element = self.find_element(element)
        tbody = element.find_element_by_tag_name("tbody")
        rows = tbody.find_elements_by_tag_name("tr")
        return rows

    def get_table_row(self, element, i):
        table_row = self.get_table_rows(element)[i]
        row_cells = table_row.find_elements_by_tag_name("td")
        self.assertTrue(row_cells)
        return [x.text for x in row_cells]

    def wait_until_element_located(self, element):
        method = elements[element][0]
        value = elements[element][1]
        for _ in range(3):
            try:
                self.wait.until(EC.visibility_of_element_located((getattr(By, method), value)))
                return True
            except:
                time.sleep(1)
        else:
            return False

    @staticmethod
    def info(message):
        BaseTest.LOGGER.info(message)

    @staticmethod
    def rand_string(size=10):
        return str(uuid.uuid4()).replace("-", "")[1:size]
