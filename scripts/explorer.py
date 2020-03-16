import binascii
import click
import gevent
import time

from nacl import signing
from Jumpscale import j


def reservation_index_model():
    class IndexTable(j.clients.peewee.Model):
        class Meta:
            database = None

        pw = j.clients.peewee
        id = pw.PrimaryKeyField()
        reservation_id = pw.IntegerField(index=True, default=0)
        workload_id = pw.IntegerField(index=True, default=0)
        node_id = pw.TextField(index=True, default="")

    return IndexTable


def reservation_index_create():
    def index_create(model, obj, action, **kwargs):
        if action == "set_post":
            index = model.IndexTable.get_or_none(reservation_id=obj.id)
            if not index:
                for wt, workload in iterate_over_workloads(obj):
                    if wt == "network":
                        for nr in workload.network_resources:
                            index = model.IndexTable.create(
                                reservation_id=obj.id, workload_id=workload.workload_id, node_id=nr.node_id
                            )
                    else:
                        index = model.IndexTable.create(
                            reservation_id=obj.id, workload_id=workload.workload_id, node_id=workload.node_id
                        )
        if action == "delete":
            query = model.IndexTable.delete().where(model.IndexTable.reservation_id == obj.id)
            query.execute()

    return index_create


@click.group()
def cli():
    pass


@click.command(name="stress-explorer", help="stress explorer by creating nodes and reservations")
@click.option("--count", help="number of nodes and reservations to create", default=100)
def stress_explorer(count=100, interactive=True):
    if "testnet" in j.clients.threebot.explorer_addr or "prod" in j.clients.threebot.explorer_addr:
        raise RuntimeError("please configure your stress test to work against your own explorer")

    cl = j.clients.threebot.explorer.actors_get("tfgrid.directory")
    # create a farmer
    print("*********************** creating farmer ********************")
    farms = len(cl.farms.list().farms)
    farm = {
        "threebot_id": 1,
        "name": f"stresstest{j.data.idgenerator.generateXCharID(5)}",
        "email": "farm@tf.com",
        "wallet_addresses": ["address"],
    }
    farm_id = cl.farms.register(farm).farm_id
    assert len(cl.farms.list().farms) == farms + 1

    farm_get = cl.farms.get(farm_id)
    assert farm_get.name == farm["name"]

    # create a 100 nodes
    print(f"*********************** creating {count} nodes ********************")
    node_ids = []
    for _ in range(count):
        node_id = f"stresstest{j.data.idgenerator.generateXCharID(5)}"
        print(f"creating node {node_id}")
        nodes = len(cl.nodes.list().nodes)
        node = {
            "node_id": node_id,
            "farm_id": farm_id,
            "os_version": "v2",
            "location": {"city": "Cairo", "country": "Egypt"},
            "total_resources": {"cru": 1, "mru": 1, "hru": 1, "sru": 1},
            "used_resources": {"cru": 1, "mru": 1, "hru": 1, "sru": 1},
            "reserved_resources": {"cru": 1, "mru": 1, "hru": 1, "sru": 1},
        }
        node_add = cl.nodes.add(node)
        assert len(cl.nodes.list(sru=0).nodes) == nodes + 1
        node_get = cl.nodes.get(node_add.node_id)
        assert node_get.node_id == node["node_id"]
        cl.nodes.uptime_update(node_get.node_id, 1000000)
        node_ids.append(node_id)

    customer_signing_key = signing.SigningKey.generate()
    farmer_signing_key = signing.SigningKey.generate()
    signer_signing_key = signing.SigningKey.generate()

    cl = j.clients.threebot.explorer.actors_get("tfgrid.phonebook")

    stress_signer_uid = f"stress_signer_{j.data.idgenerator.generateXCharID(5)}"
    stress_farmer_uid = f"stress_farmer_{j.data.idgenerator.generateXCharID(5)}"
    stress_customer_id = f"stress_customer_{j.data.idgenerator.generateXCharID(5)}"

    threebots = [
        {"role": stress_signer_uid, "pubkey": binascii.hexlify(signer_signing_key.verify_key.encode())},
        {"role": stress_farmer_uid, "pubkey": binascii.hexlify(farmer_signing_key.verify_key.encode())},
        {"role": stress_customer_id, "pubkey": binascii.hexlify(customer_signing_key.verify_key.encode())},
    ]
    tbots = {}
    for threebot in threebots:
        tbot = {}
        role = threebot["role"]
        tbot["name"] = role
        tbot["email"] = "{}@{}.com".format(role, role)
        tbot["pubkey"] = threebot["pubkey"]
        tbots[role] = cl.phonebook.name_register(**tbot)

    # create a reservation for each node
    print("*********************** creating reservations ********************")

    def create_reservation(node_id):
        print(f"creating reservations for {node_id}")
        reservation = {}
        reservation["customer_tid"] = tbots[stress_customer_id].id

        # create container
        container = {}
        container["node_id"] = node_id
        container["workload_id"] = 2
        container["farmer_tid"] = tbots[stress_farmer_uid].id

        # create volume
        volume = {}
        volume["node_id"] = node_id
        volume["workload_id"] = 1
        volume["farmer_tid"] = tbots[stress_signer_uid].id

        # create zdb
        zdb = {}
        zdb["node_id"] = node_id
        zdb["workload_id"] = 3
        zdb["farmer_tid"] = tbots[stress_farmer_uid].id

        # create network
        network = {}
        network["workload_id"] = 4
        network["farmer_tid"] = tbots[stress_farmer_uid].id

        resource_one = {}
        resource_one["node_id"] = node_id

        network["network_resources"] = [resource_one]

        reservation["data_reservation"] = {}
        # add workloads to reservation
        reservation["data_reservation"]["containers"] = [container]
        reservation["data_reservation"]["volumes"] = [volume]
        reservation["data_reservation"]["zdbs"] = [zdb]
        reservation["data_reservation"]["networks"] = [network]

        request = {"signers": [tbots[stress_signer_uid].id], "quorum_min": 1}

        reservation["data_reservation"]["signing_request_provision"] = request
        reservation["data_reservation"]["signing_request_delete"] = request
        reservation["data_reservation"]["expiration_provisioning"] = int(j.data.time.epoch + 3 * 60)
        reservation["data_reservation"]["expiration_reservation"] = int(j.data.time.epoch + 5 * 60)
        reservation["json"] = j.data.serializers.json.dumps(reservation["data_reservation"])

        cl = j.clients.threebot.explorer.actors_get("tfgrid.workloads")

        reservation = cl.workload_manager.reservation_register(reservation)
        assert reservation.next_action == "CREATE"

        # TEST02: GET RESERVATION
        reservation = cl.workload_manager.reservation_get(reservation.id)
        assert reservation.next_action == "CREATE"

        # TEST03: LIST RESERVATION
        reservations = cl.workload_manager.reservations_list(node_id=node_id).reservations
        assert len(reservations) == 1

        # TEST04: SIGN RESERVATION
        signature = customer_signing_key.sign(reservation.json.encode())
        cl.workload_manager.sign_customer(reservation.id, binascii.hexlify(signature.signature))
        reservation = cl.workload_manager.reservation_get(reservation.id)
        assert reservation.next_action == "SIGN"

        # TEST05: FILL SIGNING REQUESTS
        signature = signer_signing_key.sign(reservation.json.encode())
        cl.workload_manager.sign_provision(
            reservation.id, tbots[stress_signer_uid].id, binascii.hexlify(signature.signature)
        )
        reservation = cl.workload_manager.reservation_get(reservation.id)
        assert reservation.next_action == "DEPLOY"

        # TEST07: LIST WORKLOADS
        workloads = cl.workload_manager.workloads_list(node_id=node_id).workloads
        assert len(workloads) == 4
        assert [workload.type for workload in workloads] == ["zdb", "volume", "container", "network"]

        # TEST08: FILL SING DELETE
        signature = signer_signing_key.sign(reservation.json.encode())
        cl.workload_manager.sign_delete(
            reservation.id, tbots[stress_signer_uid].id, binascii.hexlify(signature.signature)
        )
        reservation = cl.workload_manager.reservation_get(reservation.id)
        assert reservation.next_action == "DELETE"

    greenlets = []
    for node_id in node_ids:
        greenlets.append(gevent.spawn(create_reservation, node_id=node_id))

    gevent.wait(greenlets)


@click.command(name="send-heartbeats", help="send heart beats from all the nodes on the explorer every ten mins")
@click.option("--rounds", help="number of rounds", default=6)
def send_heartbeats(rounds):
    cl = j.clients.threebot.explorer.actors_get("tfgrid.directory")
    nodes = cl.nodes.list().nodes

    for i in range(rounds):
        print("*********************** sending heartbeats ********************")
        for node in nodes:
            cl.nodes.uptime_update(node.node_id, 1000000)

        if i == rounds - 1:
            return
        time.sleep(600)


@click.command(
    name="cleanup",
    help="cleanup farms, nodes, and reservations created by stress-explorer. This needs to run on the explorer.",
)
def cleanup():
    bcdb = j.data.bcdb.get("threebot_ZDB_workloads")
    reservation_model = bcdb.model_get(url="tfgrid.workloads.reservation.1")
    signature_model = bcdb.model_get(url="tfgrid.workloads.reservation.signing.signature.1")

    index_table = reservation_index_model()
    index_table._meta.database = reservation_model.bcdb.sqlite_index_client
    index_table.create_table(safe=True)

    reservation_model.IndexTable = index_table
    reservation_model.trigger_add(reservation_index_create())

    bcdb = j.data.bcdb.get("threebot_ZDB_phonebook")
    user_model = bcdb.model_get(url="tfgrid.phonebook.user.1")

    bcdb = j.data.bcdb.get("threebot_ZDB_tfgrid")
    node_model = bcdb.model_get(url="tfgrid.directory.node.2")
    farm_model = bcdb.model_get(url="tfgrid.directory.farm.1")

    print("*********************** deleting nodes and reservations ********************")
    for node in node_model.find():
        if node.node_id.startswith("stresstest"):
            query = reservation_model.IndexTable.node_id == node.node_id
            result = reservation_model.IndexTable.select().where(query).execute()
            reservations_ids = set([item.reservation_id for item in result])
            for reservation_id in reservations_ids:
                try:
                    reservation_model.get(reservation_id).delete()
                except j.exceptions.NotFound:
                    print(f"reservation {reservation_id} not found")
            try:
                node.delete()
            except j.exceptions.NotFound:
                pass

    print("*********************** deleting farm ********************")
    farm_model = bcdb.model_get(url="tfgrid.directory.farm.1")
    for farm in farm_model.find():
        if farm.name.startswith("stresstest"):
            try:
                farm.delete()
            except j.exceptions.NotFound:
                print(f"farm {farm.id} not found")

    print("*********************** deleting users ********************")
    names = [stress_customer_id, stress_signer_uid, stress_farmer_uid]
    for name in names:
        users = user_model.find(name=name)
        if users:
            try:
                users[0].delete()
            except j.exceptions.NotFound:
                print(f"user {users[0].id} not found")


if __name__ == "__main__":
    cli.add_command(stress_explorer)
    cli.add_command(send_heartbeats)
    cli.add_command(cleanup)
    cli()
