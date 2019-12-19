from Jumpscale import j
import ipaddress


def find_node_public(nodes):
    # search a node that has a public ipv6 address
    for node in nodes:
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


def deploy_ubuntu_container():
    j.clients.threebot.explorer_addr_set("explorer.testnet.grid.tf")
    explorer = j.clients.threebot.explorer
    me = j.tools.threebot.me.default

    nodes = explorer.actors_all.nodes.list().nodes

    selected_nodes = []
    for i in range(3):
        selected_node = find_node_public(nodes)
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
    reservation.data_reservation.expiration_provisioning = j.data.time.epoch + (60 * 5)  # 5 minutes
    reservation.data_reservation.expiration_reservation = j.data.time.epoch + (60 * 5)  # 5 minutes

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
    nr1_peer_user.public_key = "VHrmA1licqbB5ysAOu/uIVyJfz4="  # change this with your wireguard public key

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

    # configure network resource 3
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

    # # container
    cont = reservation.data_reservation.containers.new()
    cont.node_id = selected_nodes[1].node_id
    cont.workload_id = 2
    # This flist is a basic ubuntu flist that already have your ssh key authorized inside.
    # TODO: add link to flist manipulation tool
    cont.flist = "https://hub.grid.tf/zaibon/zaibon-ubuntu-ssh-0.0.2.flist"
    cont.storage_url = "zdb://hub.grid.tf:9900"
    cont.environment = {}
    cont.entrypoint = "/sbin/my_init"
    cont.interactive = False

    net = cont.network_connection.new()
    net.network_id = network.name
    net.ipaddress = "172.22.1.10"

    print(reservation.data_reservation._json)

    reservation.json = reservation.data_reservation._json
    reservation.customer_signature = me.nacl.sign_hex(reservation.json.encode())

    print("sending reservation")
    # resp = explorer.actors_all.workload_manager.reservation_register(reservation)
    # print("reservation sent. ID: %s" % resp.id)
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
    deploy_ubuntu_container()
