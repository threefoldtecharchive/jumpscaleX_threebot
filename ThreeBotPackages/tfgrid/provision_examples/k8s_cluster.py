from Jumpscale import j
import ipaddress
from nacl import public
from nacl.signing import VerifyKey, SigningKey
from nacl.encoding import Base64Encoder
from nacl.public import SealedBox


def is_up(node):
    ago = j.data.time.epoch - (60 * 10)
    return node.updated > ago


def find_node_public(nodes, exclude):
    # search a node that has a public ipv6 address
    for node in filter(is_up, nodes):
        if node.node_id in exclude:
            continue
        for iface in node.ifaces:
            for addr in iface.addrs:
                ip = ipaddress.ip_interface(addr).ip
                if ip.version != 6:
                    continue
                if ip.is_global:
                    return (node, str(ip))


def find_free_wg_port(node):
    ports = set(list(range(6000, 9000)))
    used = set(node.wg_ports)
    free = ports - used
    return free.pop()


def encrypt_password(password, public_key):
    node_public_bin = j.data.hash.hex2bin(public_key)
    node_public = VerifyKey(node_public_bin)
    box = SealedBox(node_public.to_curve25519_public_key())

    pasword_encrypted = box.encrypt(password.encode())
    pasword_encrypted_hex = j.data.hash.bin2hex(pasword_encrypted)
    return pasword_encrypted_hex


def deploy_k8s_cluster():
    j.clients.threebot.explorer_addr_set("explorer.testnet.grid.tf")
    explorer = j.clients.threebot.explorer
    me = j.me_identities.me.default

    nodes = explorer.actors_all.nodes.list().nodes

    selected_nodes = []
    for i in range(3):
        selected_node = find_node_public(nodes, exclude=[n["node"].node_id for n in selected_nodes])
        if selected_node is None:
            raise j.exceptions.NotFound("no node found with public ipv6")

        node, public_ip = selected_node
        _, wg_private_encrypted, wg_public = j.tools.wireguard.generate_zos_keys(node.public_key_hex)
        wg_port = find_free_wg_port(node)
        selected_nodes.append(
            {
                "node": node,
                "public_ip": public_ip,
                "wg_port": wg_port,
                "wg_private": wg_private_encrypted,
                "wg_public": wg_public,
            }
        )

    reservation_model = j.data.schema.get_from_url("tfgrid.workloads.reservation.1")

    reservation = reservation_model.new()
    reservation.customer_tid = me.tid
    reservation.data_reservation.expiration_provisioning = j.data.time.epoch + (60 * 15)
    reservation.data_reservation.expiration_reservation = j.data.time.epoch + (60 * 15)

    # network
    network = reservation.data_reservation.networks.new()
    network.node_id = node.node_id
    network.workload_id = 1
    network.name = j.data.idgenerator.generateXCharID(16)
    network.iprange = "172.22.0.0/16"

    # configure network resource 1
    nr1 = network.network_resources.new()
    nr1.iprange = "172.22.1.0/24"
    nr1.node_id = selected_nodes[0]["node"].node_id
    nr1.wireguard_listen_port = selected_nodes[0]["wg_port"]
    nr1.wireguard_public_key = selected_nodes[0]["wg_public"]
    nr1.wireguard_private_key_encrypted = selected_nodes[0]["wg_private"]

    nr1_peer1 = nr1.peers.new()
    nr1_peer1.iprange = "172.22.2.0/24"
    nr1_peer1.allowed_iprange = ["100.64.22.2/32", "172.22.2.0/24"]
    nr1_peer1.public_key = selected_nodes[1]["wg_public"]
    nr1_peer1.endpoint = "[%s]:%d" % (selected_nodes[1]["public_ip"], selected_nodes[1]["wg_port"])

    nr1_peer2 = nr1.peers.new()
    nr1_peer2.iprange = "172.22.3.0/24"
    nr1_peer2.allowed_iprange = ["100.64.22.3/32", "172.22.3.0/24"]
    nr1_peer2.public_key = selected_nodes[2]["wg_public"]
    nr1_peer2.endpoint = "[%s]:%d" % (selected_nodes[2]["public_ip"], selected_nodes[2]["wg_port"])

    nr1_peer_user = nr1.peers.new()
    nr1_peer_user.iprange = "172.22.4.0/24"
    nr1_peer_user.allowed_iprange = ["100.64.0.0/16", "172.22.0.0/16"]
    nr1_peer_user.public_key = (
        "UDTtHEwRJ3dkDPzjLlqCBkT64/Gr74fA6oz2jl2FFzg="  # change this with your wireguard public key
    )

    # configure network resource 2
    nr2 = network.network_resources.new()
    nr2.iprange = "172.22.2.0/24"
    nr2.node_id = selected_nodes[1]["node"].node_id
    nr2.wireguard_listen_port = selected_nodes[1]["wg_port"]
    nr2.wireguard_public_key = selected_nodes[1]["wg_public"]
    nr2.wireguard_private_key_encrypted = selected_nodes[1]["wg_private"]

    nr2_peer1 = nr2.peers.new()
    nr2_peer1.iprange = "172.22.1.0/24"
    nr2_peer1.allowed_iprange = ["100.64.22.1/32", "172.22.1.0/24"]
    nr2_peer1.public_key = selected_nodes[0]["wg_public"]
    nr2_peer1.endpoint = "[%s]:%d" % (selected_nodes[0]["public_ip"], selected_nodes[0]["wg_port"])

    nr2_peer2 = nr2.peers.new()
    nr2_peer2.iprange = "172.22.3.0/24"
    nr2_peer2.allowed_iprange = ["100.64.22.3/32", "172.22.3.0/24"]
    nr2_peer2.public_key = selected_nodes[2]["wg_public"]
    nr2_peer2.endpoint = "[%s]:%d" % (selected_nodes[2]["public_ip"], selected_nodes[2]["wg_port"])

    # # configure network resource 3
    nr3 = network.network_resources.new()
    nr3.iprange = "172.22.3.0/24"
    nr3.node_id = selected_nodes[2]["node"].node_id
    nr3.wireguard_listen_port = selected_nodes[2]["wg_port"]
    nr3.wireguard_public_key = selected_nodes[2]["wg_public"]
    nr3.wireguard_private_key_encrypted = selected_nodes[2]["wg_private"]

    nr3_peer1 = nr3.peers.new()
    nr3_peer1.iprange = "172.22.1.0/24"
    nr3_peer1.allowed_iprange = ["100.64.22.1/32", "172.22.1.0/24"]
    nr3_peer1.public_key = selected_nodes[0]["wg_public"]
    nr3_peer1.endpoint = "[%s]:%d" % (selected_nodes[0]["public_ip"], selected_nodes[0]["wg_port"])

    nr3_peer2 = nr3.peers.new()
    nr3_peer2.iprange = "172.22.2.0/24"
    nr3_peer2.allowed_iprange = ["100.64.22.2/32", "172.22.2.0/24"]
    nr3_peer2.public_key = selected_nodes[1]["wg_public"]
    nr3_peer2.endpoint = "[%s]:%d" % (selected_nodes[1]["public_ip"], selected_nodes[1]["wg_port"])

    # k8s cluster
    k8s_master = reservation.data_reservation.kubernetes.new()
    node = selected_nodes[0]["node"]
    k8s_master.node_id = node.node_id
    k8s_master.workload_id = 2
    k8s_master.cluster_secret = encrypt_password("supersecret", node.public_key_hex)
    k8s_master.network_id = network.name
    k8s_master.ipaddress = "172.22.1.10"
    k8s_master.size = 1
    k8s_master.sshkeys = [
        "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCtRRg+Hj3CB/1kPaWMExXFmUAIti6wirVrURsEvz/d0eJeQJok7Fy1npoAgtBEGn9LVrmL2jyefAZSggPkxtRLbUvWBDraZoJGRtzrEo9nf5z6YrCnGG+Od+HbP5aoHkq9ykEsyDcdTNInvW+qeClE0vtA4zuQ/QxcAV293yq+4HQRRoH1EosodONjsLDb8D20Z36Fmc6VTxtMC5yvvNal+si/XelKha7ri/Su/mCSV+IwnA2Ph5XZPe4JYUdD529CTdfjcwyN3CShtwNNFG72YYWwxKPHQFs/5QlwvbXUmLEjz7gF50qaeeGKibDRWOkxjV8wnBUXKShC5waZCRTd zaibon@zaibon.be"
    ]

    k8s_node1 = reservation.data_reservation.kubernetes.new()
    node = selected_nodes[1]["node"]
    k8s_node1.node_id = node.node_id
    k8s_node1.workload_id = 3
    k8s_node1.cluster_secret = encrypt_password("supersecret", node.public_key_hex)
    k8s_node1.network_id = network.name
    k8s_node1.ipaddress = "172.22.2.10"
    k8s_node1.master_ips = ["172.22.1.10"]
    k8s_node1.size = 1
    k8s_node1.sshkeys = [
        "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCtRRg+Hj3CB/1kPaWMExXFmUAIti6wirVrURsEvz/d0eJeQJok7Fy1npoAgtBEGn9LVrmL2jyefAZSggPkxtRLbUvWBDraZoJGRtzrEo9nf5z6YrCnGG+Od+HbP5aoHkq9ykEsyDcdTNInvW+qeClE0vtA4zuQ/QxcAV293yq+4HQRRoH1EosodONjsLDb8D20Z36Fmc6VTxtMC5yvvNal+si/XelKha7ri/Su/mCSV+IwnA2Ph5XZPe4JYUdD529CTdfjcwyN3CShtwNNFG72YYWwxKPHQFs/5QlwvbXUmLEjz7gF50qaeeGKibDRWOkxjV8wnBUXKShC5waZCRTd zaibon@zaibon.be"
    ]

    k8s_node2 = reservation.data_reservation.kubernetes.new()
    node = selected_nodes[2]["node"]
    k8s_node2.node_id = node.node_id
    k8s_node2.workload_id = 4
    k8s_node2.cluster_secret = encrypt_password("supersecret", node.public_key_hex)
    k8s_node2.network_id = network.name
    k8s_node2.ipaddress = "172.22.3.10"
    k8s_node2.master_ips = ["172.22.1.10"]
    k8s_node2.size = 1
    k8s_node2.sshkeys = [
        "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCtRRg+Hj3CB/1kPaWMExXFmUAIti6wirVrURsEvz/d0eJeQJok7Fy1npoAgtBEGn9LVrmL2jyefAZSggPkxtRLbUvWBDraZoJGRtzrEo9nf5z6YrCnGG+Od+HbP5aoHkq9ykEsyDcdTNInvW+qeClE0vtA4zuQ/QxcAV293yq+4HQRRoH1EosodONjsLDb8D20Z36Fmc6VTxtMC5yvvNal+si/XelKha7ri/Su/mCSV+IwnA2Ph5XZPe4JYUdD529CTdfjcwyN3CShtwNNFG72YYWwxKPHQFs/5QlwvbXUmLEjz7gF50qaeeGKibDRWOkxjV8wnBUXKShC5waZCRTd zaibon@zaibon.be"
    ]

    reservation.json = reservation.data_reservation._json
    reservation.customer_signature = me.encryptor.sign_hex(reservation.json.encode())

    print(reservation)

    print("sending reservation")
    resp = explorer.actors_all.workload_manager.reservation_register(reservation)
    print("reservation sent. ID: %s" % resp.id)
    print("use this template to configure the wg-quick config of your laptop:")
    print(
        f"""
        [Interface]
        Address = 100.64.22.4/16, 172.22.4.0/16
        PrivateKey = <your private key>

        [Peer]
        PublicKey = {selected_nodes[0]['wg_public']}
        Endpoint = [{selected_nodes[0]['public_ip']}]:{selected_nodes[0]['wg_port']}
        AllowedIPs = 172.22.0.0/16, 100.64.0.0/16
        PersistentKeepalive = 25
        """
    )


if __name__ == "__main__":
    deploy_k8s_cluster()
