import os
from unittest import TestCase, skip

from Jumpscale import j
from parameterized import parameterized

locations = []
for root, dirs, files in os.walk("/sandbox/code/github/threefoldtech/jumpscaleX_threebot/ThreeBotPackages"):
    for file in files:
        if file.endswith(".py"):
            file_path = os.path.join(root, file)
            with open(file_path, "r") as f:
                content = f.read()
            if "__jslocation__ =" in content:
                jslocation = content.find("__jslocation__")
                location = content[content.find("=", jslocation) + 1 : content.find("\n", jslocation)]
                locations.append(location.strip().strip("'").strip('"'))


class ThreeBotTests(TestCase):
    @parameterized.expand(locations)
    def test(self, location):
        module = eval(location)
        if "test" in dir(module):
            if "install" in dir(module):
                install = module.__getattribute__("install")
                install()
            test = module.__getattribute__("test")
            test()
        else:
            skip(f"{location} doesn't has test")
