from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from testconfig import config
import unittest, time
import base, os
from parameterized import parameterized
import random
from loguru import logger
from Jumpscale import j
import random, pyperclip

skip = j.baseclasses.testtools._skip

page_url = "http://172.17.0.2/jumpscale/pastebin"

driver = base.set_browser()


python_script = """
    # Solve the quadratic equation ax**2 + bx + c = 0
    # import complex math module
    import cmath
    a = 1
    b = 5
    c = 6
    # To take coefficient input from the users
    # a = float(input('Enter a: '))
    # b = float(input('Enter b: '))
    # c = float(input('Enter c: '))

    # calculate the discriminant
    d = (b**2) - (4*a*c)

    # find two solutions
    sol1 = (-b-cmath.sqrt(d))/(2*a)
    sol2 = (-b+cmath.sqrt(d))/(2*a)

    print('The solution are {0} and {1}'.format(sol1,sol2))
    """
CODE_FIRST_LINE = "# Solve the quadratic equation ax**2 + bx + c = 0"
CODE_LAST_LINE = "print('The solution are {0} and {1}'.format(sol1,sol2))"


@skip("https://github.com/threefoldtech/jumpscaleX_threebot/issues/373")
def before_all():
    j.servers.threebot.start(background=True)
    cl = j.clients.gedis.get(name="test", port=8901, package_name="zerobot.packagemanager")
    cl.actors.package_manager.package_add(
        path="/sandbox/code/github/threefoldtech/jumpscaleX_threebot/ThreeBotPackages/demo/pastebin"
    )


def before():
    global driver
    driver = base.set_browser()
    base.get_page(driver, page_url)
    assert "pastebin " in driver.current_url
    assert base.wait_until_element_located(driver, "pastebin_header") is True


def after():
    driver.close()


def test01_create_new_paste():
    """
    * Test Creation of new paste and the result linkk. *

    - Get pastebin page .
    - Add Python code to code input.
    - Click on submit button.
    - Get the result link.
    - Copy resutl link from copy icon, chek it works successfully.
    - Check that link contain right code.
    """
    base.info("Add Python code to code input.")
    code_input = base.find_element(driver, "code_input")
    code_input.send_keys(python_script)

    base.info("Click on submit button ")
    submit_button = base.find_element(driver, "submit_button")
    submit_button.click()

    base.info("Get the result link.")
    result_url = base.find_element(driver, "result_url").text

    base.info("Copy resutl link from copy icon, chek it works successfully.")
    base.find_element(driver, "copy_link").click()
    copied_link = pyperclip.paste()
    assert result_url == copied_link

    base.info("Check that link contain right code.")
    driver.get(result_url)
    code = base.find_element(driver, "result_code")
    code_lines = code.find_elements_by_tag_name("span")
    assert "CODE_FIRST_LINE" == code_lines[0].text
    assert CODE_LAST_LINE == code_lines[len(code_lines) - 1].text


def test02_edit_button():
    """
    * Test Edit button *

    - Get pastebin page .
    - Add Python code to code input.
    - Click on submit button.
    - Click on edit putton and add more code lines .
    - Click sumbit again and check it code added successfully.
    """
    base.info("Add Python code to code input.")
    code_input = base.find_element(driver, "code_input")
    code_input.send_keys(python_script)

    base.info("Click on submit button ")
    base.find_element(driver, "submit_button").click()

    base.info("Click on edit button and add more code lines .")
    base.find_element(driver, "edit_button").click()

    code = """ Click on edit button and add more code lines . """
    code_input.send_keys(code)

    base.info("Click sumbit again and check it code added successfully.")
    base.find_element(driver, "submit_button").click()
    result_url = base.find_element(driver, "result_url").text
    driver.get(result_url)
    code = base.find_element(driver, "result_code")
    code_lines = code.find_elements_by_tag_name("span")
    assert code in code_lines[len(code_lines) - 1].text


def test03_download_button():
    """
    * Test Download button *

    - Get pastebin page .
    - Add Python code to code input.
    - Click on submit button.
    - Click on download button .
    - Check downloaded file has right info.

    """
    base.info("Add Python code to code input.")
    code_input = base.find_element(driver, "code_input")
    code_input.send_keys(python_script)

    base.info("Click on submit button ")
    base.find_element(driver, "submit_button").click()

    base.info("Click on download button .")
    base.find_element(driver, "download_button").click()

    base.info("Check downloaded file has right info.")
    for file_name in os.listdir(os.path.expanduser("~/Downloads")):
        if "orgional_code" in file_name:
            file_dir = os.path.expanduser("~/Downloads/") + file_name
            break
    f = open(file_dir, "r")
    content = f.read()
    assert CODE_FIRST_LINE in content
    f.close()
    os.remove(f.name)


@unittest.skip("https://github.com/threefoldtech/jumpscaleX_threebot/issues/172")
def test04_copy_code():
    """
    * Test copy codefrom code input . *

    - Get pastebin page .
    - Add Python code to code input.
    - Click on submit button.
    - Click on copy code button.
    - Check that code copied successfully.
    """
    base.info("Add Python code to code input.")
    code_input = base.find_element(driver, "code_input")
    code_input.send_keys(python_script)

    base.info("Click on submit button ")
    base.find_element(driver, "submit_button").click()
    base.info("Click on copy code button.")
    base.find_element(driver, "copy_code").click()

    base.info(" Check that code copied successfully.")
    copied_code = pyperclip.paste()
    assert CODE_FIRST_LINE in copied_code
