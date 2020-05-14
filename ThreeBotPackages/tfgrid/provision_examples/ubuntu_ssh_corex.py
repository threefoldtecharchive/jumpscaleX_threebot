from Jumpscale import j
import ipaddress


# consider a node up if it has received update during the last 10 minute
def is_up(node):
    ago = j.data.time.epoch - (60 * 10)
    return node.updated > ago


def find_node_public(nodes):
    # search a node that has a public ipv6 address
    for node in filter(is_up, nodes):
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


def deploy_ubuntu_container_corex():
    j.clients.threebot.explorer_addr_set("explorer.testnet.grid.tf")
    explorer = j.clients.threebot.explorer
    me = j.me

    nodes = explorer.actors_all.nodes.list().nodes
    selected_node = find_node_public(nodes)
    if selected_node is None:
        raise j.exceptions.NotFound("no node found with public ipv6")
    node, public_ip = selected_node

    _, wg_private_encrypted, wg_public = j.tools.wireguard.generate_zos_keys(node.public_key_hex)
    wg_port = find_free_wg_port(node)

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

    nr1 = network.network_resources.new()

    nr1.iprange = "172.22.1.0/24"
    nr1.node_id = node.node_id
    nr1.wireguard_listen_port = wg_port
    nr1.wireguard_public_key = wg_public
    nr1.wireguard_private_key_encrypted = wg_private_encrypted

    # add a peer to the network, this peer is your laptop
    peer = nr1.peers.new()
    peer.iprange = "172.22.2.0/24"
    peer.allowed_iprange = ["100.64.22.2/32", "172.22.2.0/24"]
    # this is your wireguard public key from your laptop
    peer.public_key = "jL8br0N6svygj2nGZ7rXNJDs5XCz9x2KaR6klDWfQW0="

    # # container
    cont = reservation.data_reservation.containers.new()
    cont.node_id = node.node_id
    cont.workload_id = 2
    # This flist is a basic ubuntu flist that already have your ssh key authorized inside.
    # TODO: add link to flist manipulation tool
    cont.flist = "https://hub.grid.tf/zaibon/zaibon-ubuntu-ssh-0.0.2.flist"
    cont.storage_url = "zdb://hub.grid.tf:9900"
    cont.environment = {}
    cont.entrypoint = "/sbin/my_init"
    # enable coreX on the container
    cont.interactive = True

    net = cont.network_connection.new()
    net.network_id = network.name
    net.ipaddress = "172.22.1.11"

    print(reservation.data_reservation._json)

    reservation.json = reservation.data_reservation._json
    reservation.customer_signature = me.encryptor.sign_hex(reservation.json.encode())

    print("sending reservation")
    resp = explorer.actors_all.workload_manager.reservation_register(reservation)
    print("reservation sent. ID: %s" % resp.id)
    print("use this template to configure the wg-quick config of your laptop:")
    print(
        f"""
        [Interface]
        Address = 100.64.22.2/16, 172.22.2.0/16
        PrivateKey = <your private key>

        [Peer]
        PublicKey = {wg_public}
        Endpoint = [{public_ip}]:{wg_port}
        AllowedIPs = 172.22.0.0/16, 100.64.0.0/16
        PersistentKeepalive = 25
        """
    )
