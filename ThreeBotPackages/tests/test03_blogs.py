from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from testconfig import config
import unittest, time
from .base_test import BaseTest
import random
from selenium.common.exceptions import NoSuchElementException
from parameterized import parameterized


@unittest.skip("https://github.com/threefoldtech/jumpscaleX_threebot/issues/188")
class Blog(BaseTest):
    def setUp(self):
        super().setUp()
        self.get_page(self.blog_page)
        self.assertIn("Blogs", self.driver.title)
        self.assertTrue(self.wait_until_element_located("blogs_list"))
        self.get_blogs_number()

    def get_blogs_number(self):
        self.blogs = self.find_element("blogs_list")
        self.rows = self.blogs.find_elements_by_class_name("row")
        self.columns = []
        if self.rows:
            self.columns = self.rows[0].find_elements_by_class_name("col-md-4")
        self.blogs_number = len(self.rows) * len(self.columns)

    def get_random_blog(self):
        row = random.choice(self.rows)
        random_blog = random.choice(row.find_elements_by_class_name("col-md-4"))
        return random_blog

    def open_random_blog(self):
        self.blog = self.get_random_blog()
        self.blog.find_element_by_class_name("post-thumbnail").click()

    def test01_blogs_headers(self):
        """
        * Get blog bage. *
        - Check heads and exist of blogs description.
        """
        self.info("Check heads and exist of blogs description..")
        header = self.blogs.find_element_by_tag_name("header")
        self.assertEqual("Blogs", header.text)

        self.blog = self.get_random_blog()
        try:
            text = self.blog.find_element_by_class_name("post-details")
            self.assertTrue(text)
        except NoSuchElementException:
            self.fail("no details for blog exist")

    def test02_blog_search_box(self):
        """
        * test search in home bage in blogs package. *
        - Get blog bage .
        - Use Search box in home bage.
        - Check search box works successfully.
        - Try to get one of results, should works successfully.
        """
        self.info("Use Search box in home bage.")
        self.find_element("blogs_home_search").click()
        search_box = self.find_element("blogs_search_box")
        search_box.send_keys("test")
        search_icon = self.find_element("blogs_icon_search")
        search_icon.click()

        self.info("Check search box works successfully. ")
        search_results = self.find_element("blogs_search_result")
        results = search_results.find_elements_by_tag_name("li")
        results_text = self.find_element("blogs_result_text")
        self.assertIn(str(len(results)), results_text)

        self.info("Try to get one of results, should works successfully.")
        if results:
            random_post = random.choice(results)
            tmp = random_post.text
            post_name = tmp[tmp.find(":") + 2 :]
            random_post.find_element_by_tag_name("a").click()
            self.assertIn(post_name, self.driver.current_url)

    def test03_search_page_close(self):
        """
        * test close icon in search page  *

        - Get blog page .
        - Open search page.
        - Use close icon on search page, Check it redirect to home page again successfully.

        """
        self.info(" Open search page.")
        self.find_element("blogs_home_search").click()

        self.info("Use close icon on search page, Check it redirect to home page again successfully.")
        close_icon = self.find_element("blogs_search_close")
        close_icon.click()
        self.assertTrue(self.wait_until_element_located("blogs_list"))

    def test04_blog_posts_navigation(self):
        """
        * Test navigation bar elements [about, contact, tags]. *

        - Get one of blogs posts .
        - Test [About, Contact, Tags] in navigation bar elements [about]. 
        """
        self.info("Get one of blogs posts")
        self.open_random_blog()
        self.assertIn("posts", self.driver.current_url)

        self.info("Test about in navigation bar elements")
        about_elem = self.find_element("blog_about_page")
        about_elem.click()
        self.assertIn("about", self.driver.current_url)

        self.info("Test contact in navigation bar elements")
        contact_elem = self.find_element("blog_contact_page")
        contact_elem.click()
        self.assertIn("contactus", self.driver.current_url)

        self.info("Test tags in navigation bar elements")
        tags_elem = self.find_element("blog_tags_page")
        tags_elem.click()
        self.assertIn("tags", self.driver.current_url)

    @parameterized.expand(["home_tags", "blogs_tags"])
    def test05_tags(self, tags_location):
        """
        * Test Tags in tags page and blog page. *

        - Get one of blogs posts .
        - Get tags page, get one of tags[TAG].
        - Check that posts have [TAG].
        """
        self.info("Open one of blogs posts")
        self.open_random_blog()
        self.assertIn("posts", self.driver.current_url)

        self.info("Get tags page, get one of tags[TAG].")
        if tags_location == "blogs_tags":
            self.find_element("blog_tags_page").click()

        self.info("Check that posts have [TAG].")
        tmp = self.find_element(tags_location)
        tags = tmp.find_element_by_tag_name("li")
        if tags:
            tag = random.choice(tags)
            tag_name = tag.text
            tag.click()
            self.assertIn(tag_name, self.driver.current_url)
            posts_with_tags = self.find_element("posts_with_tags")
            post = random.choice(posts_with_tags.find_elements_by_class_name("post"))
            post_name = post.text
            post.click()
            self.assertIn(post_name, self.driver.current_url)
            self.assertIn(tag_name, self.driver.page_source)

    @parameterized.expand(["facebook", "twitter", "github", "instagram"])
    def test06_categories_pages(self, icon):
        """
        * Test categories pages [ facebook, instagram, github,twirtter]. *
        
        - Get one of blogs posts .
        - Click on one of icons check it redirect to right page.
        """
        import ipdb

        ipdb.set_trace()
        if icon == "instagram":
            self.skipTest("https://github.com/threefoldtech/jumpscaleX_threebot/issues/179")
        self.info("oprn one of blogs posts")
        self.open_random_blog()
        self.assertIn("posts", self.driver.current_url)

        categories_pages = self.find_element("categories_pages")
        self.info("Click on {} icon check it redirect to right page.".format(icon))
        if icon == "facebook":
            categories_pages.find_element_by_link_text(icon).click()
        else:
            categories_pages.find_element_by_class_name("fa-{}".format(icon)).click()
        self.assertIn(icon, self.driver.current_url)
