from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from testconfig import config
import unittest, time
import base
from parameterized import parameterized
import random
from loguru import logger
from Jumpscale import j

skip = j.baseclasses.testtools._skip
page_url = "http://172.17.0.2/zerobot/blog/"

driver = base.set_browser()
blogs = ""
rows = ""


@skip("https://github.com/threefoldtech/jumpscaleX_threebot/issues/188")
def before_all():
    j.servers.threebot.start(background=True)
    cl = j.clients.gedis.get(name="test", port=8901, package_name="zerobot.packagemanager")
    cl.actors.package_manager.package_add(
        path="/sandbox/code/github/threefoldtech/jumpscaleX_threebot/ThreeBotPackages/zerobot/blog"
    )


def before():
    global driver
    global rows, blogs
    driver = base.set_browser()
    base.get_page(driver, page_url)
    blogs = base.find_element("blogs_list")
    rows = blogs.find_elements_by_class_name("row")
    assert "Blogs " in driver.title


def after():
    driver.close()


def get_blogs_number():

    columns = []
    if rows:
        columns = rows[0].find_elements_by_class_name("col-md-4")
    blogs_number = len(rows) * len(columns)
    return blogs_number


def get_random_blog():
    row = random.choice(rows)
    random_blog = random.choice(row.find_elements_by_class_name("col-md-4"))
    return random_blog


def open_random_blog():
    blog = get_random_blog()
    blog.find_element_by_class_name("post-thumbnail").click()


def test01_blogs_headers():
    """
    * Get blog bage. *
    - Check heads and exist of blogs description.
    """
    base.info("Check heads and exist of blogs description..")
    header = blogs.find_element_by_tag_name("header")
    assert "Blogs" == header.text

    blog = get_random_blog()
    text = blog.find_element_by_class_name("post-details")
    assert text is True


def test02_blog_search_box():
    """
    * test search in home bage in blogs package. *
    - Get blog bage .
    - Use Search box in home bage.
    - Check search box works successfully.
    - Try to get one of results, should works successfully.
    """
    base.info("Use Search box in home bage.")
    base.find_element(driver, "blogs_home_search").click()
    search_box = base.find_element(driver, "blogs_search_box")
    search_box.send_keys("test")
    search_icon = base.find_element(driver, "blogs_icon_search")
    search_icon.click()

    base.info("Check search box works successfully. ")
    search_results = base.find_element(driver, "blogs_search_result")
    results = search_results.find_elements_by_tag_name("li")
    results_text = base.find_element(driver, "blogs_result_text")
    assert str(len(results)) in results_text

    base.info("Try to get one of results, should works successfully.")
    if results:
        random_post = random.choice(results)
        tmp = random_post.text
        post_name = tmp[tmp.find(":") + 2 :]
        random_post.find_element_by_tag_name("a").click()
        assert post_name in driver.current_url


def test03_search_page_close():
    """
    * test close icon in search page  *

    - Get blog page .
    - Open search page.
    - Use close icon on search page, Check it redirect to home page again successfully.

    """
    base.info(" Open search page.")
    base.find_element("blogs_home_search").click()

    base.info("Use close icon on search page, Check it redirect to home page again successfully.")
    close_icon = base.find_element(driver, "blogs_search_close")
    close_icon.click()
    assert base.wait_until_element_located(driver, "blogs_list") is True


def test04_blog_posts_navigation():
    """
    * Test navigation bar elements [about, contact, tags]. *

    - Get one of blogs posts .
    - Test [About, Contact, Tags] in navigation bar elements [about]. 
    """
    base.info("Get one of blogs posts")
    base.open_random_blog()
    assertIn("posts", driver.current_url)

    base.info("Test about in navigation bar elements")
    about_elem = base.find_element(driver, "blog_about_page")
    about_elem.click()
    assert "about" in driver.current_url

    base.info("Test contact in navigation bar elements")
    contact_elem = base.find_element(driver, "blog_contact_page")
    contact_elem.click()
    assert "contactus" in driver.current_url

    base.info("Test tags in navigation bar elements")
    tags_elem = base.find_element(driver, "blog_tags_page")
    tags_elem.click()
    assert "tags" in driver.current_url


@parameterized.expand(["home_tags", "blogs_tags"])
def test05_tags(tags_location):
    """
    * Test Tags in tags page and blog page. *

    - Get one of blogs posts .
    - Get tags page, get one of tags[TAG].
    - Check that posts have [TAG].
    """
    base.info("Open one of blogs posts")
    base.open_random_blog()
    assert "posts" in driver.current_url

    base.info("Get tags page, get one of tags[TAG].")
    if tags_location == "blogs_tags":
        base.find_element(driver, "blog_tags_page").click()

    base.info("Check that posts have [TAG].")
    tmp = base.find_element(tags_location)
    tags = tmp.find_element_by_tag_name("li")
    if tags:
        tag = random.choice(tags)
        tag_name = tag.text
        tag.click()
        assert tag_name in driver.current_url
        posts_with_tags = base.find_element(driver, "posts_with_tags")
        post = random.choice(posts_with_tags.find_elements_by_class_name("post"))
        post_name = post.text
        post.click()
        assert post_name in driver.current_url
        assert tag_name in driver.page_source


@parameterized.expand(["facebook", "twitter", "github", "instagram"])
def test_06_categories_pages(icon):
    """
    * Test categories pages [ facebook, instagram, github,twitter]. *
    
    - Get one of blogs posts .
    - Click on one of icons check it redirect to right page.
    """

    base.info("oprn one of blogs posts")
    open_random_blog()
    assert "posts" in driver.current_url

    categories_pages = base.find_element(driver, "categories_pages")
    base.info("Click on {} icon check it redirect to right page.".format(icon))
    if icon == "facebook":
        categories_pages.find_element_by_link_text(icon).click()
    else:
        categories_pages.find_element_by_class_name("fa-{}".format(icon)).click()
    assert icon in driver.current_url
