from Jumpscale import j

import time


def deploy_zdbs():
    j.clients.threebot.explorer_addr_set("explorer.testnet.grid.tf")
    explorer = j.clients.threebot.explorer
    me = j.tools.threebot.me.default

    # list all nodes that have 10 GiB of SSD
    nodes = explorer.actors_all.nodes.list(sru=10).nodes
    node_1 = nodes[0]
    node_2 = nodes[1]

    reservation_model = j.data.schema.get_from_url("tfgrid.reservation.1")

    reservation = reservation_model.new()
    reservation.customer_tid = me.tid
    reservation.data_reservation.expiration_provisioning = j.data.time.epoch + (60 * 5)  # 5 minutes
    reservation.data_reservation.expiration_reservation = j.data.time.epoch + (60 * 5)  # 5 minutes

    # network
    zdb_1 = reservation.data_reservation.zdbs.new()
    zdb_1.workload_id = 1
    zdb_1.node_id = node_1.node_id
    zdb_1.size = 10
    zdb_1.mode = "user"
    zdb_1.password = "supersecret"
    zdb_1.disk_type = "ssd"
    zdb_1.public = False

    zdb_2 = reservation.data_reservation.zdbs.new()
    zdb_2.workload_id = 2
    zdb_2.node_id = node_2.node_id
    zdb_2.size = 10
    zdb_2.mode = "user"
    zdb_2.password = "supersecret"
    zdb_2.disk_type = "ssd"
    zdb_2.public = False

    print(reservation.data_reservation._json)

    reservation.json = reservation.data_reservation._json
    reservation.customer_signature = me.nacl.sign_hex(reservation.json.encode())

    print("sending reservation")
    resp = explorer.actors_all.workload_manager.reservation_register(reservation)
    print("reservation sent. ID: %s" % resp.id)
    print("wait for reservation to be deployed")
    time.sleep(20)

    reservation = explorer.actors_all.workload_manager.reservation_get(resp.id)
    for i, result in enumerate(reservation.results):
        if result.state == "ERROR":
            print(f"failed to zdb {i}: {result.message}")
        else:
            data = j.data.serializers.json.loads(result.data_json)
            print(f"ZDB deployed at {data['IP']}:{data['Port']} namespace {data['Namespace']}")
