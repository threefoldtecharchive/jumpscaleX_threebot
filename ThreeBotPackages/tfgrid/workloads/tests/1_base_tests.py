import gevent
from gevent import monkey

import pytest

monkey.patch_all(thread=False)
import logging
from nacl import signing

import binascii
from Jumpscale import j


def main(self):
    customer_signing_key = signing.SigningKey.generate()
    farmer_signing_key = signing.SigningKey.generate()
    signer_signing_key = signing.SigningKey.generate()

    bcdb = j.servers.threebot.default.bcdb_get("tf_workloads")
    reservation_model = bcdb.model_get(url="tfgrid.workloads.reservation.1")
    index_table = j.threebot.package.workloadmanager.reservation_index_model()
    index_table._meta.database = reservation_model.bcdb.sqlite_index_client
    index_table.create_table(safe=True)

    reservation_model.IndexTable = index_table
    reservation_model.trigger_add(j.threebot.package.workloadmanager.reservation_index_create())

    for reservation in reservation_model.find():
        reservation.delete()

    reservation_model.destroy()

    ph_bcdb = j.servers.threebot.default.bcdb_get("threebot_phonebook")
    model = ph_bcdb.model_get(url="tfgrid.workloads.phonebook.user.1")
    model.destroy()

    threebots = [
        {"role": "signer", "pubkey": binascii.hexlify(signer_signing_key.verify_key.encode())},
        {"role": "farmer", "pubkey": binascii.hexlify(farmer_signing_key.verify_key.encode())},
        {"role": "customer", "pubkey": binascii.hexlify(customer_signing_key.verify_key.encode())},
    ]
    tbots = {}
    for threebot in threebots:
        tbot = model.new()
        role = threebot["role"]
        tbot.name = role
        tbot.email = "{}@{}.com".format(role, role)
        tbot.pubkey = threebot["pubkey"]
        tbot.save()
        tbots[role] = tbot

    # TEST01: REGISTER RESERVATION
    reservation = reservation_model.new()
    reservation.customer_tid = tbots["customer"].id

    container_model = bcdb.model_get(url="tfgrid.workloads.reservation.container.1")
    volume_model = bcdb.model_get(url="tfgrid.workloads.reservation.volume.1")
    zdb_model = bcdb.model_get(url="tfgrid.workloads.reservation.zdb.1")
    network_model = bcdb.model_get(url="tfgrid.workloads.reservation.network.1")
    net_resource = bcdb.model_get(url="tfgrid.workloads.network.net_resource.1")

    # create container
    container = container_model.new()
    container.node_id = "1"
    container.workload_id = 2
    container.farmer_tid = tbots["farmer"].id
    # create volume
    volume = volume_model.new()
    volume.node_id = "1"
    volume.workload_id = 1
    volume.farmer_tid = tbots["farmer"].id
    # create zdb
    zdb = zdb_model.new()
    zdb.node_id = "2"
    zdb.workload_id = 3
    zdb.farmer_tid = tbots["farmer"].id

    # create network
    network = network_model.new()
    network.workload_id = 4
    network.farmer_tid = tbots["farmer"].id

    resource_one = net_resource.new()
    resource_one.node_id = "1"

    resource_two = net_resource.new()
    resource_two.node_id = "3"
    network.network_resources = [resource_one, resource_two]

    # add workloads to reservation
    reservation.data_reservation.containers.append(container)
    reservation.data_reservation.volumes.append(volume)
    reservation.data_reservation.zdbs.append(zdb)
    reservation.data_reservation.networks.append(network)

    # create sigining request
    request_model = bcdb.model_get(url="tfgrid.workloads.reservation.signing.request.1")
    request = request_model.new()
    request.signers = [tbots["signer"].id]
    request.quorum_min = 1
    request.save()
    reservation.data_reservation.signing_request_provision = request
    reservation.data_reservation.signing_request_delete = request
    reservation.data_reservation.expiration_provisioning = int(j.data.time.epoch + 3 * 60)
    reservation.data_reservation.expiration_reservation = int(j.data.time.epoch + 5 * 60)
    reservation.json = j.data.serializers.json.dumps(reservation.data_reservation._ddict)

    reservation_data = reservation._ddict
    # Register reservation
    cl = j.clients.gedis.get(name="threebot")
    reservation = cl.actors.workload_manager.reservation_register(reservation_data)
    assert reservation.next_action == "CREATE"

    # TEST02: GET RESERVATION
    reservation = cl.actors.workload_manager.reservation_get(reservation.id)
    assert reservation.next_action == "CREATE"

    # TEST03: LIST RESERVATION
    reservations = cl.actors.workload_manager.reservations_list().reservations
    assert len(reservations) == 1

    reservations = cl.actors.workload_manager.reservations_list(node_id="1").reservations
    assert len(reservations) == 1

    reservations = cl.actors.workload_manager.reservations_list(node_id="2").reservations
    assert len(reservations) == 1

    reservations = cl.actors.workload_manager.reservations_list(node_id="3").reservations
    assert len(reservations) == 1

    reservations = cl.actors.workload_manager.reservations_list(cursor=reservation.id).reservations
    assert len(reservations) == 1

    reservations = cl.actors.workload_manager.reservations_list(cursor=reservation.id + 1).reservations
    assert len(reservations) == 0

    # TEST04: SIGN RESERVATION
    signature = customer_signing_key.sign(reservation.json.encode())
    cl.actors.workload_manager.sign_customer(reservation.id, binascii.hexlify(signature.signature))
    reservation = cl.actors.workload_manager.reservation_get(reservation.id)
    assert reservation.next_action == "SIGN"

    # TEST05: FILL SIGNING REQUESTS
    signature = signer_signing_key.sign(reservation.json.encode())
    cl.actors.workload_manager.sign_provision(reservation.id, tbots["signer"].id, binascii.hexlify(signature.signature))
    reservation = cl.actors.workload_manager.reservation_get(reservation.id)
    assert reservation.next_action == "DEPLOY"

    # TEST07: LIST WORKLOADS
    workloads = cl.actors.workload_manager.workloads_list(node_id="1").workloads
    assert len(workloads) == 3
    assert [workload.type for workload in workloads] == ["volume", "container", "network"]

    workloads = cl.actors.workload_manager.workloads_list(node_id="2").workloads
    assert len(workloads) == 1
    assert [workload.type for workload in workloads] == ["zdb"]

    workloads = cl.actors.workload_manager.workloads_list(node_id="3").workloads
    assert len(workloads) == 1
    assert [workload.type for workload in workloads] == ["network"]

    # TEST08: FILL SING DELETE
    signature = signer_signing_key.sign(reservation.json.encode())
    cl.actors.workload_manager.sign_delete(reservation.id, tbots["signer"].id, binascii.hexlify(signature.signature))
    reservation = cl.actors.workload_manager.reservation_get(reservation.id)
    assert reservation.next_action == "DELETE"

    # TEST09: REGISTER RESERVATION WITH INEXISTANT CUSTOMER
    reservation = reservation_model.new()
    reservation.customer_tid = 1000000  # id of inexistant customer

    container_model = bcdb.model_get(url="tfgrid.workloads.reservation.container.1")

    # create container
    container = container_model.new()
    container.node_id = "1"
    container.workload_id = 1
    container.farmer_tid = tbots["farmer"].id

    # add workloads to reservation
    reservation.data_reservation.containers.append(container)

    # create sigining request
    request_model = bcdb.model_get(url="tfgrid.workloads.reservation.signing.request.1")
    request = request_model.new()
    request.signers = [tbots["signer"].id]
    request.quorum_min = 1
    request.save()
    reservation.data_reservation.signing_request_provision = request
    reservation.data_reservation.signing_request_delete = request
    reservation.data_reservation.expiration_provisioning = int(j.data.time.epoch + 3 * 60)
    reservation.data_reservation.expiration_reservation = int(j.data.time.epoch + 5 * 60)
    reservation.json = j.data.serializers.json.dumps(reservation.data_reservation._ddict)

    reservation_data = reservation._ddict

    # register reservation
    with pytest.raises(j.exceptions.RemoteException):
        reservation = cl.actors.workload_manager.reservation_register(reservation_data)

    # TEST10: CREATE RESERVATION WITH SINGLE API CALL
    container = container_model.new()
    container.node_id = "1"
    container.workload_id = 1
    container.farmer_tid = tbots["farmer"].id

    reservation = reservation_model.new()
    reservation.customer_tid = tbots["customer"].id
    reservation.data_reservation.containers.append(container)
    reservation.data_reservation.expiration_provisioning = int(j.data.time.epoch + 3 * 60)
    reservation.data_reservation.expiration_reservation = int(j.data.time.epoch + 5 * 60)
    reservation.json = j.data.serializers.json.dumps(reservation.data_reservation._ddict)
    signature = customer_signing_key.sign(reservation.json.encode())
    reservation.customer_signature = binascii.hexlify(signature.signature)
    reservation_data = reservation._ddict
    reservation = cl.actors.workload_manager.reservation_register(reservation_data)
    reservation = cl.actors.workload_manager.reservation_get(reservation.id)
    assert reservation.next_action == "DEPLOY"

    # FINAL: clean up created reservations
    for reservation in reservation_model.find():
        reservation.delete()

    print("ALL TESTS ARE OK")
