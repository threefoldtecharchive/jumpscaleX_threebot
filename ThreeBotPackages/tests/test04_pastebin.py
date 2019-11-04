from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from selenium.common.exceptions import NoSuchElementException
from testconfig import config
import unittest, time, os
from .base_test import BaseTest
from parameterized import parameterized
import random, pyperclip

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


class Pastebin(BaseTest):
    def setUp(self):
        super().setUp()
        self.get_page(self.pastebin_page)

        self.info("get pastebin page. ")
        self.assertIn("pastebin", self.driver.current_url)
        self.assertTrue(self.wait_until_element_located("pastebin_header"))

    def tearDown(self):
        super().setUp()

    def test01_create_new_paste(self):
        """
        * Test Creation of new paste and the result linkk. *

        - Get pastebin page .
        - Add Python code to code input.
        - Click on submit button.
        - Get the result link.
        - Copy resutl link from copy icon, chek it works successfully.
        - Check that link contain right code.
        """
        self.info("Add Python code to code input.")
        code_input = self.find_element("code_input")
        code_input.send_keys(python_script)

        self.info("Click on submit button ")
        submit_button = self.find_element("submit_button")
        submit_button.click()

        self.info("Get the result link.")
        try:
            result_url = self.find_element("result_url").text
        except NoSuchElementException:
            self.fail("there is no result link .")

        self.info("Copy resutl link from copy icon, chek it works successfully.")
        self.find_element("copy_link").click()
        copied_link = pyperclip.paste()
        self.assertEqual(result_url, copied_link)

        self.info("Check that link contain right code.")
        self.driver.get(result_url)
        code = self.find_element("result_code")
        code_lines = code.find_elements_by_tag_name("span")
        self.assertEqual("CODE_FIRST_LINE", code_lines[0].text)
        self.assertEqual(CODE_LAST_LINE, code_lines[len(code_lines) - 1].text)

    def test02_edit_button(self):
        """
        * Test Edit button *

        - Get pastebin page .
        - Add Python code to code input.
        - Click on submit button.
        - Click on edit putton and add more code lines .
        - Click sumbit again and check it code added successfully.
        """
        self.info("Add Python code to code input.")
        code_input = self.find_element("code_input")
        code_input.send_keys(python_script)

        self.info("Click on submit button ")
        self.find_element("submit_button").click()

        self.info("Click on edit button and add more code lines .")
        self.find_element("edit_button").click()

        code = """ Click on edit button and add more code lines . """
        code_input.send_keys(code)

        self.info("Click sumbit again and check it code added successfully.")
        self.find_element("submit_button").click()
        result_url = self.find_element("result_url").text
        self.driver.get(result_url)
        code = self.find_element("result_code")
        code_lines = code.find_elements_by_tag_name("span")
        self.assertIn(code, code_lines[len(code_lines) - 1].text)

    def test03_download_button(self):
        """
        * Test Download button *

        - Get pastebin page .
        - Add Python code to code input.
        - Click on submit button.
        - Click on download button .
        - Check downloaded file has right info.
        
        """
        self.info("Add Python code to code input.")
        code_input = self.find_element("code_input")
        code_input.send_keys(python_script)

        self.info("Click on submit button ")
        self.find_element("submit_button").click()

        self.info("Click on download button .")
        self.find_element("download_button").click()

        self.info("Check downloaded file has right info.")
        for file_name in os.listdir(os.path.expanduser("~/Downloads")):
            if "orgional_code" in file_name:
                file_dir = os.path.expanduser("~/Downloads/") + file_name
                break
        f = open(file_dir, "r")
        content = f.read()
        self.assertIn(CODE_FIRST_LINE, content)
        f.close()
        os.remove(f.name)

    @unittest.skip("https://github.com/threefoldtech/jumpscaleX_threebot/issues/172")
    def test04_copy_code(self):
        """
        * Test copy codefrom code input . *

        - Get pastebin page .
        - Add Python code to code input.
        - Click on submit button.
        - Click on copy code button.
        - Check that code copied successfully.
        """
        self.info("Add Python code to code input.")
        code_input = self.find_element("code_input")
        code_input.send_keys(python_script)

        self.info("Click on submit button ")
        self.find_element("submit_button").click()

        self.info("Click on copy code button.")
        self.find_element("copy_code").click()

        self.info(" Check that code copied successfully.")
        copied_code = pyperclip.paste()
        self.assertIn(CODE_FIRST_LINE, copied_code)

