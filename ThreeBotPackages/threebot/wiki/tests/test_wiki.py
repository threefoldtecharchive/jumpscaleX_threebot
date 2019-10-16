from Jumpscale import j
from unittest import TestCase
import requests


class Wiki(TestCase):
    def test001_wiki(self):
        """
        Test case for checking wikis.

        **Test scenario**
        #. Start threebot server.
        #. Load test wikis using markdowndocs.
        #. Check the wikis is loaded.
        """
        j.servers.threebot.local_start_default()

        url = "https://github.com/threefoldtech/jumpscaleX_threebot/tree/development/docs/wikis/examples/docs"
        docsite = j.tools.markdowndocs.load(url, name="test_example")
        docsite.write()

        r = requests.get("https://127.0.0.1/web/bcdbfs/docsites/test_example/test_include.md", verify=False)
        self.assertEqual(r.status_code, 200)
