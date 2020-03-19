from Jumpscale import j
import netaddr
import ipaddress


def chat(bot):
    """
    """
    user_info = bot.user_info()
    name = user_info["username"]
    email = user_info["email"]
    ips = ["IPv6", "IPv4"]
    default_cluster_name = name.split(".3bot")[0]
    expiration = j.data.time.epoch + (60 * 60 * 24)  # for one day

    explorer = j.clients.explorer.explorer
    if not email:
        raise j.exceptions.BadRequest("Email shouldn't be empty")

    ip_version = bot.single_choice(
        "This wizard will help you deploy a kubernetes cluster, do you prefer to access your 3bot using IPv4 or IPv6? If unsure, chooose IPv4",
        ips,
    )

    workers_number = bot.int_ask("Please specify the number of worker nodes")  # minimum should be 1
    cluster_size = workers_number + 1  # number of workers + the master node
    ssh_keys = bot.upload_file(
        """"Please add your public ssh key, this will allow you to access the deployed container using ssh. 
            Just upload the ssh keys file with each key on a seperate line"""
    ).split("\n")

    cluster_secret = bot.string_ask("Please add the cluster secret", default="secret")

    # create new reservation
    reservation = j.sal.zosv2.reservation_create()
    identity = explorer.users.get(name=name, email=email)

    # Select nodes
    nodes_selected = j.sal.reservation_chatflow.nodes_get(workers_number + 1, farm_id=71, ip_version=ip_version)

    # Create network of reservation and add peers
    reservation, configs = j.sal.reservation_chatflow.network_configure(
        bot, reservation, nodes_selected, customer_tid=identity.id, ip_version=ip_version
    )
    rid = configs["rid"]

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

    resv_id = j.sal.reservation_chatflow.reservation_register(reservation, expiration, customer_tid=identity.id)

    res = """
            ## Kubernetes cluster has been deployed successfully
            # your reservation id is: {}
            Click next to proceed the wireguard configurations that need to be setup on your machine
            """.format(
        resv_id
    )
    res = j.tools.jinja2.template_render(text=j.core.text.strip(res), **locals())
    bot.md_show(res)

    filename = "{}_{}.conf".format(f"{default_cluster_name}_{i}", resv_id)

    res = """
            ## Use the following template to configure your wireguard connection. This will give you access to your 3bot.
            # Make sure you have wireguard ```https://www.wireguard.com/install/``` installed
            ## ```wg-quick up /etc/wireguard/{}```
            Click next
            to download your configuration
            """.format(
        filename
    )
    res = j.tools.jinja2.template_render(text=j.core.text.strip(res), **locals())
    bot.md_show(res)

    res = j.tools.jinja2.template_render(text=configs["wg"], **locals())
    bot.download_file(res, filename)

    for i, ip in enumerate(configs["ip_addresses"]):
        res = """
            kubernete {} IP : {}
            To connect ssh rancher@{}
        """.format(
            i + 1, ip, ip
        )

        res = j.tools.jinja2.template_render(text=res, **locals())
        bot.md_show(res)
