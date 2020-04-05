from Jumpscale import j

from nacl import public
from nacl.signing import VerifyKey, SigningKey
from nacl.encoding import Base64Encoder
from nacl.public import SealedBox


import time

# consider a node up if it has received update during the last 10 minute
def is_up(node):
    ago = j.data.time.epoch - (60 * 10)
    return node.updated > ago


def encrypt_password(password, public_key):
    node_public_bin = j.data.hash.hex2bin(public_key)
    node_public = VerifyKey(node_public_bin)
    box = SealedBox(node_public.to_curve25519_public_key())

    pasword_encrypted = box.encrypt(password.encode())
    pasword_encrypted_hex = j.data.hash.bin2hex(pasword_encrypted)
    return pasword_encrypted_hex


def deploy_zdbs():
    j.clients.threebot.explorer_addr_set("explorer.testnet.grid.tf")
    explorer = j.clients.threebot.explorer
    me = j.myidentities.me.default

    # list all nodes that have 10 GiB of SSD
    nodes = explorer.actors_all.nodes.list(sru=10).nodes
    # filter out nodes that are down
    nodes = list(filter(is_up, nodes))
    # pick the 2 first one
    node_1 = nodes[0]
    node_2 = nodes[1]

    reservation_model = j.data.schema.get_from_url("tfgrid.workloads.reservation.1")

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
    zdb_1.password = encrypt_password("supersecret", node_1.public_key_hex)
    zdb_1.disk_type = "ssd"
    zdb_1.public = False

    zdb_2 = reservation.data_reservation.zdbs.new()
    zdb_2.workload_id = 2
    zdb_2.node_id = node_2.node_id
    zdb_2.size = 10
    zdb_2.mode = "user"
    zdb_2.password = encrypt_password("supersecret", node_2.public_key_hex)
    zdb_2.disk_type = "ssd"
    zdb_2.public = False

    print(reservation.data_reservation._json)

    reservation.json = reservation.data_reservation._json
    reservation.customer_signature = me.encryptor.sign_hex(reservation.json.encode())

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


if __name__ == "__main__":
    deploy_zdbs()
