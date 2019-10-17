from unittest import TestCase

from Jumpscale import j
import requests


class Wiki(TestCase):
    @classmethod
    def setUpClass(cls):
        cls.gedis = j.servers.threebot.local_start_default()

    def test001_check_threebot_ports(self):
        """
        Test case for checking threebot ports.

        **Test scenario**
        #. Check gedis port, should be found.
        #. Check zdb port, should be found.
        #. Check sonic port, should be found.
        """
        self.assertTrue(j.sal.nettools.tcpPortConnectionTest("localhost", 8901), "Gedis is not started.")
        self.assertTrue(j.sal.nettools.tcpPortConnectionTest("localhost", 9900), "zdb is not started.")
        self.assertTrue(j.sal.nettools.tcpPortConnectionTest("localhost", 1491), "sonic is not started.")

    def test002_check_gedis_is_started(self):
        """
        Test case for checking that gedis is started.

        **Test scenario**
        #. Ping gedis server, should return True.
        """
        self.assertTrue(self.gedis.ping())

    def test003_check_zdb_is_started(self):
        """
        Test case for checking that zdb is started.

        **Test scenario**
        #. Check that zdb process is started.
        #. Get zdb client and check zdb is started using ping.
        #. Check zdb is started using client ping.
        """
        self.assertTrue(j.sal.process.checkProcessRunning("zdb"))

        cl = j.clients.zdb.client_admin_get("test")
        self.assertTrue(cl.ping())

    def test004_check_sonic_is_started(self):
        """
        Test case for checking that sonic is started.

        **Test scenario**
        #. Check that sonic process is started.
        """
        self.assertTrue(j.sal.process.checkProcessRunning("sonic"))

    def test005_check_package_manager_actor_is_loaded(self):
        """
        Test case for checking that package manager actor is loaded.

        **Test scenario**
        #. Get gedis actors.
        #. Check that package manager is one of gedis actors.
        """
        actors = self.gedis.actors
        self.assertIn("package_manager", dir(actors))

    def test006_check_web_interfaces_is_loaded(self):
        """
        Test case for checking web interfaces is loaded.
        """
        raise RuntimeError("Not implemented yet")

    def test007_check_wiki_is_loaded(self):
        """
        Test case for checking wiki is loaded.

        **Test scenario**
        #. Check that wiki actor is loaded.
        #. Add test wiki using markdowndocs tool.
        #. Check that test wiki is loaded using bcdbfs.
        #. Remove the added test wiki using bcdbfs.
        #. Check that test wiki is removed.
        """
        actors = self.gedis.actors
        self.assertIn("content_wiki", dir(actors))

        url = "https://github.com/threefoldtech/jumpscaleX_threebot/tree/development/docs/wikis/examples/docs"
        docsite = j.tools.markdowndocs.load(url, name="test_example")
        docsite.write()

        dirs = j.sal.bcdbfs.list_dirs("/docsites")
        self.assertIn("/docsites/test_example", dirs)

        j.sal.bcdbfs.dir_remove("/docsites/test_example")

        dirs = j.sal.bcdbfs.list_dirs("/docsites")
        self.assertNotIn("/docsites/test_example", dirs)

    def test008_wiki_is_loaded(self):
        """
        Test case for checking wikis.

        **Test scenario**
        #. Load test wikis using markdowndocs.
        #. Check the wikis is loaded, should be found.
        #. Remove the added test wiki.
        #. Check the added wiki, should not be found.
        """
        url = "https://github.com/threefoldtech/jumpscaleX_threebot/tree/development/docs/wikis/examples/docs"
        docsite = j.tools.markdowndocs.load(url, name="test_example")
        docsite.write()

        r = requests.get("https://127.0.0.1/web/bcdbfs/docsites/test_example/test_include.md", verify=False)
        self.assertEqual(r.status_code, 200)

        j.sal.bcdbfs.dir_remove("/docsites/test_example")

        r = requests.get("https://127.0.0.1/web/bcdbfs/docsites/test_example/test_include.md", verify=False)
        self.assertEqual(r.status_code, 404)
