from Jumpscale import j
import netaddr
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


def chat(bot):
    """
    """
    user_info = bot.user_info()
    name = user_info["username"]
    email = user_info["email"]
    ips = ["IPV6", "IPV4"]
    default_cluster_name = name.split(".3bot")[0]

    explorer = j.clients.threebot.explorer
    if not email:
        raise j.exceptions.BadRequest("Email shouldn't be empty")

    ip_version = bot.single_choice("Choose your ip version to be used", ips)

    workers_number = bot.int_ask("Please add the number of worker nodes")  # minimum should be 1
    cluster_size = workers_number + 1  # number of workers + the master node
    ssh_keys = bot.upload_file("Please upload the ssh keys file with each key on a seperate line").split("\n")
    cluster_secret = bot.string_ask("Please add the cluster secret", default="secret")

    # create new reservation
    reservation = j.sal.zosv2.reservation_create()
    identity = explorer.actors_all.phonebook.get(name=name, email=email)

    # Select nodes
    nodes_selected = j.sal.chatflow.nodes_get(workers_number + 1, ip_version)

    # Create network of reservation and add peers
    reservation, configs, rid = j.sal.chatflow.network_configure(bot, reservation, nodes_selected)

    # Create master and workers
    # Master is in the first node from the selected nodes
    master = j.sal.zosv2.kubernetes.add_master(
        reservation=reservation,
        node_id=nodes_selected[0].node_id,
        network_name=configs["name"],
        cluster_secret=cluster_secret,
        ip_address=configs["ip_addresses"][0],
        size=cluster_size,
        ssh_keys=ssh_keys,
    )

    # Workers are in the rest of the nodes
    for i in range(1, len(nodes_selected)):
        worker = j.sal.zosv2.kubernetes.add_worker(
            reservation=reservation,
            node_id=nodes_selected[i].node_id,
            network_name=configs["name"],
            cluster_secret=cluster_secret,
            ip_address=configs["ip_addresses"][i],
            size=cluster_size,
            master_ip=master.ipaddress,
            ssh_keys=ssh_keys,
        )

    # register the reservation
    expiration = j.data.time.epoch + (3600 * 24 * 365)
    resv_id = j.sal.zosv2.reservation_register(reservation, expiration)

    res = f"# Kubernetes cluster has been deployed successfully: your reservation id is: {resv_id} Click next to proceed the wireguard configurations that need to be setup on your machine"

    bot.md_show(res)
    filename = "{}_{}.conf".format(f"{default_cluster_name}_{i}", resv_id)

    res = """
            # use the next template to configure the wg-quick config of your laptop:
            ### ```wg-quick up /etc/wireguard/{}```
            Click next
            to download your configuration
            """.format(
        filename
    )
    res = j.tools.jinja2.template_render(text=j.core.text.strip(res), **locals())
    bot.md_show(res)

    res = j.tools.jinja2.template_render(text=configs["wg"], **locals())
    bot.download_file(res, filename)
