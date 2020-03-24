from Jumpscale import j

import requests
import json


class bcdbRest(j.baseclasses.object):
    __jslocation__ = "j.tools.packages.bcdbrest"

    def test(self):
        """
        kosmos `j.tools.packages.bcdbrest.test()'
        :return:
        """
        j.tools.threebot.threebotconnect_disable()

        # restart 3bot
        j.servers.threebot.start(background=True)

        gedis_client = j.clients.gedis.get(
            name="default", host="127.0.0.1", port=8901, package_name="zerobot.packagemanager"
        )

        gedis_client.actors.package_manager.package_add(
            path=j.core.tools.text_replace(
                "{DIR_BASE}/code/github/threefoldtech/jumpscaleX_threebot/ThreeBotPackages/examples/svelte"
            )
        )

        res = requests.get(f"https://127.0.0.1/jumpscale/svelte/model/jumpscale.svelte.company.1/", verify=False)
        res = res.json()
        for item in res:
            requests.delete(
                f"https://127.0.0.1/jumpscale/svelte/model/jumpscale.svelte.company.1/{item['id']}", verify=False
            )

        # add
        res = requests.post(
            "https://127.0.0.1/jumpscale/svelte/model/jumpscale.svelte.company.1",
            json={"name": "abc", "score": 1},
            verify=False,
        )
        assert res.status_code == 201
        res = res.json()
        cid = res["id"]

        # get
        res = requests.get(f"https://127.0.0.1/jumpscale/svelte/model/jumpscale.svelte.company.1/{cid}", verify=False)
        res = res.json()
        assert cid == res["id"]

        # add
        res = requests.post(
            "https://127.0.0.1/jumpscale/svelte/model/jumpscale.svelte.company.1",
            json={"name": "abcd", "score": 2},
            verify=False,
        )
        assert res.status_code == 201
        res = res.json()
        cid2 = res["id"]

        # list
        res = requests.get(f"https://127.0.0.1/jumpscale/svelte/model/jumpscale.svelte.company.1/", verify=False)
        res = res.json()
        assert {"name": "abc", "score": 1, "id": cid} in res
        assert {"name": "abcd", "score": 2, "id": cid2} in res
        assert len(res) == 2

        # find
        res = requests.get(
            f"https://127.0.0.1/jumpscale/svelte/model/jumpscale.svelte.company.1/?name=abcd", verify=False
        )
        res = res.json()
        assert len(res) == 1
        assert res[0]["name"] == "abcd"
        assert res[0]["score"] == 2
        assert res[0]["id"] == cid2

        # delete
        res = requests.delete(
            f"https://127.0.0.1/jumpscale/svelte/model/jumpscale.svelte.company.1/{cid}", verify=False
        )
        assert res.status_code == 204

        res = requests.get(f"https://127.0.0.1/jumpscale/svelte/model/jumpscale.svelte.company.1/{cid}", verify=False)
        assert res.status_code == 404

        # list
        res = requests.get(f"https://127.0.0.1/jumpscale/svelte/model/jumpscale.svelte.company.1/", verify=False)
        assert res.json() == [{"name": "abcd", "score": 2, "id": cid2}]

        # update
        res = requests.post(
            f"https://127.0.0.1/jumpscale/svelte/model/jumpscale.svelte.company.1/{cid2}",
            json={"name": "newname"},
            verify=False,
        )
        assert res.status_code == 204

        # get again
        res = requests.get(f"https://127.0.0.1/jumpscale/svelte/model/jumpscale.svelte.company.1/{cid2}", verify=False)
        res = res.json()
        assert cid2 == res["id"]
        assert res["name"] == "newname"
        assert res["score"] == 2

        print("OK")
