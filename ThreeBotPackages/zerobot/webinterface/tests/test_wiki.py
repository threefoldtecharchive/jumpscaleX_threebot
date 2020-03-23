from time import sleep

import requests
from Jumpscale import j

skip = j.baseclasses.testtools._skip


def info(message):
    j.tools.logger._log_info(message)


def before_all():
    global gedis
    gedis = j.servers.threebot.start(background=True)


def after_all():
    j.sal.process.killall("tmux")


def test001_check_threebot_ports():
    """
    Test case for checking threebot ports.

    **Test scenario**
    #. Check gedis port, should be found.
    #. Check zdb port, should be found.
    #. Check sonic port, should be found.
    """
    info("Check gedis port, should be found.")
    assert j.sal.nettools.tcpPortConnectionTest("localhost", 8901) is True, "Gedis is not started."

    info("Check zdb port, should be found.")
    assert j.sal.nettools.tcpPortConnectionTest("localhost", 9900) is True, "zdb is not started."

    info("Check sonic port, should be found.")
    assert j.sal.nettools.tcpPortConnectionTest("localhost", 1491) is True, "sonic is not started."


def test002_check_gedis_is_started():
    """
    Test case for checking that gedis is started.

    **Test scenario**
    #. Ping gedis server, should return True.
    """
    global gedis
    info("Ping gedis server, should return True.")
    assert gedis.ping() is True


def test003_check_zdb_is_started():
    """
    Test case for checking that zdb is started.

    **Test scenario**
    #. Check that zdb process is started.
    #. Get zdb client and check zdb is started using ping.
    """
    info("Check that zdb process is started.")
    assert j.sal.process.checkProcessRunning("zdb") is True

    info("Get zdb client and check zdb is started using ping.")
    adminsecret_ = j.core.myenv.adminsecret
    cl = j.clients.zdb.client_admin_get(name="test_wiki", port=9900, secret=adminsecret_)
    assert cl.ping() is True


def test004_check_sonic_is_started():
    """
    Test case for checking that sonic is started.

    **Test scenario**
    #. Check that sonic process is started.
    """
    info("Check that sonic process is started.")
    assert j.sal.process.checkProcessRunning("sonic") is True


def test005_check_package_manager_actor_is_loaded():
    """
    Test case for checking that package manager actor is loaded.

    **Test scenario**
    #. Get gedis client for package manager.
    #. Check that package manager is one of gedis client's actors.
    """
    info("Get gedis client for package manager.")
    gedis_client = j.clients.gedis.get(
        name="test_wiki", host="127.0.0.1", port=8901, package_name="zerobot.packagemanager"
    )

    info("Check that package manager is one of gedis client's actors.")
    actors = gedis_client.actors
    assert "package_manager" in dir(actors)


def test006_check_web_interfaces():
    """
    Test case for checking web interfaces is loaded.
    """
    info("Running bottle web server test")
    j.tools.packages.webinterface.test()
    j.servers.threebot.start(background=True)


def test007_wiki_is_loaded():
    """
    Test case for checking wikis.

    **Test scenario**
    #. Load test wikis using package manager.
    #. Check the wikis is loaded, should be found.
    #. Remove the added test wiki.
    #. Check the added wiki, should not be found.
    """

    info("Load test wikis using markdowndocs.")

    gedis_client = j.clients.gedis.get(
        name="test_wiki", host="127.0.0.1", port=8901, package_name="zerobot.packagemanager"
    )
    gedis_client.actors.package_manager.package_add(
        path=j.core.tools.text_replace(
            "{DIR_BASE}/code/github/threefoldtech/jumpscaleX_threebot/ThreeBotPackages/zerobot/wiki_examples")
    )
    sleep(20)

    info("Check the wikis is loaded, should be found.")
    r = requests.get("http://127.0.0.1/zerobot/wiki_examples/wiki")
    assert r.status_code == 200

    info("Remove the added test wiki.")
    gedis_client.actors.package_manager.package_delete("zerobot.wiki_examples")
    j.sal.fs.remove(j.sal.fs.joinPaths(j.tools.threegit.docsites_path, "zerobot.wiki_examples"))

    info("Check the added wiki, should not be found.")
    r = requests.get("http://127.0.0.1/3git/wikis/zerobot.wiki_examples/test_include.md")
    assert r.status_code == 404
