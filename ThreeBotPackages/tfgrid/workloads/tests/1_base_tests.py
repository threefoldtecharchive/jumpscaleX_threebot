import pytest
import logging
import binascii

from nacl import signing
from Jumpscale import j


def test():
    customer_signing_key = signing.SigningKey.generate()
    farmer_signing_key = signing.SigningKey.generate()
    signer_signing_key = signing.SigningKey.generate()

    workload_package = j.tools.threebot_packages.get("tfgrid.workloads")
    phonebook_package = j.tools.threebot_packages.get("tfgrid.phonebook")
    directory_package = j.tools.threebot_packages.get("tfgrid.directory")

    reservation_model = workload_package.models.reservation__1
    container_model = workload_package.models.reservation__container__1
    volume_model = workload_package.models.reservation__volume__1
    zdb_model = workload_package.models.reservation__zdb__1
    user_model = phonebook_package.models.user__1
    actionable_model = workload_package.models.reservation_actionable__1
    farm_model = directory_package.models.farm__1
    node_model = directory_package.models.node__2
    request_model = j.clients.bcdbmodel.get(
        url="tfgrid.workloads.reservation.signing.request.1", name="tfgrid_workloads"
    )

    for reservation in reservation_model.find():
        reservation.delete()

    actionable_model.destroy()
    user_model.destroy()
    farm_model.destroy()
    node_model.destroy()

    threebots = [
        {"role": "signer", "pubkey": binascii.hexlify(signer_signing_key.verify_key.encode())},
        {"role": "farmer", "pubkey": binascii.hexlify(farmer_signing_key.verify_key.encode())},
        {"role": "customer", "pubkey": binascii.hexlify(customer_signing_key.verify_key.encode())},
    ]
    tbots = {}
    for i, threebot in enumerate(threebots):
        tbot = user_model.new()
        role = threebot["role"]
        tbot.name = role
        tbot.tid = i + 1
        tbot.email = "{}@{}.com".format(role, role)
        tbot.pubkey = threebot["pubkey"]
        tbot.save()
        tbots[role] = tbot

    farm = farm_model.new()
    farm.name = "test-farm"
    farm.threebot_id = tbots["farmer"].id
    farm.save()

    nodes = []
    for i in range(2):
        node = node_model.new()
        node.node_id = i + 1
        node.farm_id = farm.id
        node.os_version = 1
        node.save()
        nodes.append(node)

    def sign_customer(reservation):
        signature = customer_signing_key.sign(reservation.json.encode())
        cl.actors.workload_manager.sign_customer(reservation.id, binascii.hexlify(signature.signature))
        return cl.actors.workload_manager.reservation_get(reservation.id)

    def sign_farmer(reservation):
        signature = farmer_signing_key.sign(reservation.json.encode())
        cl.actors.workload_manager.sign_farmer(
            reservation.id, tbots["farmer"].id, binascii.hexlify(signature.signature)
        )
        return cl.actors.workload_manager.reservation_get(reservation.id)

    def sign_provision(reservation):
        signature = signer_signing_key.sign(reservation.json.encode())
        cl.actors.workload_manager.sign_provision(
            reservation.id, tbots["signer"].id, binascii.hexlify(signature.signature)
        )
        return cl.actors.workload_manager.reservation_get(reservation.id)

    def sign_delete(reservation):
        signature = signer_signing_key.sign(reservation.json.encode())
        cl.actors.workload_manager.sign_delete(
            reservation.id, tbots["signer"].id, binascii.hexlify(signature.signature)
        )
        return cl.actors.workload_manager.reservation_get(reservation.id)

    # TEST01: REGISTER RESERVATION
    reservation = reservation_model.new()
    reservation.customer_tid = tbots["customer"].id

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

    # add workloads to reservation
    reservation.data_reservation.containers.append(container)
    reservation.data_reservation.volumes.append(volume)
    reservation.data_reservation.zdbs.append(zdb)

    # create sigining request
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
    cl = j.clients.gedis.get("workloads", package_name="tfgrid.workloads")
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

    reservations = cl.actors.workload_manager.reservations_list(cursor=reservation.id).reservations
    assert len(reservations) == 1

    reservations = cl.actors.workload_manager.reservations_list(cursor=reservation.id + 1).reservations
    assert len(reservations) == 0

    assert sign_customer(reservation).next_action == "SIGN"
    assert sign_provision(reservation).next_action == "PAY"
    assert sign_farmer(reservation).next_action == "DEPLOY"

    # TEST07: LIST WORKLOADS
    cursor = reservation.id
    workloads = cl.actors.workload_manager.workloads_list(node_id=1, cursor=cursor).workloads
    assert len(workloads) == 2

    reservation_2 = cl.actors.workload_manager.reservation_register(reservation_data)

    assert sign_customer(reservation_2).next_action == "SIGN"
    assert sign_provision(reservation_2).next_action == "PAY"
    assert sign_farmer(reservation_2).next_action == "DEPLOY"

    assert sign_delete(reservation).next_action == "DELETE"

    cursor = reservation_2.id
    workloads = cl.actors.workload_manager.workloads_list(node_id=1, cursor=cursor).workloads
    assert len(workloads) == 4

    for i in range(3):
        workload_uid = "{}-{}".format(reservation.id, i + 1)
        cl.actors.workload_manager.workload_deleted(workload_id=workload_uid)

    assert cl.actors.workload_manager.reservation_get(reservation.id).next_action == "DELETED"

    workloads = cl.actors.workload_manager.workloads_list(node_id=1, cursor=cursor).workloads
    assert len(workloads) == 2

    # TEST09: REGISTER RESERVATION WITH INEXISTANT CUSTOMER
    reservation = reservation_model.new()
    reservation.customer_tid = 1000000  # id of inexistant customer

    # create container
    container = container_model.new()
    container.node_id = "1"
    container.workload_id = 1
    container.farmer_tid = tbots["farmer"].id

    # add workloads to reservation
    reservation.data_reservation.containers.append(container)

    # create sigining request
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
    assert reservation.next_action == "PAY"

    # FINAL: clean up created reservations
    for reservation in reservation_model.find():
        reservation.delete()

    print("ALL TESTS ARE OK")


test()
