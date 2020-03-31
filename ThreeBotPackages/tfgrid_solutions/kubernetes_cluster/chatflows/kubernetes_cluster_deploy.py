from Jumpscale import j
import netaddr
import ipaddress


def chat(bot):
    """
    """
    user_form_data = {}
    user_info = bot.user_info()
    name = user_info["username"]
    email = user_info["email"]
    ips = ["IPv6", "IPv4"]
    default_cluster_name = name.split(".3bot")[0]
    expiration = j.data.time.epoch + (60 * 60 * 24)  # for one day

    explorer = j.clients.explorer.default
    if not email:
        raise j.exceptions.Value("Email shouldn't be empty")
    if not name:
        raise j.exceptions.Value("Name of logged in user shouldn't be empty")

    user_form_data["IP version"] = bot.single_choice(
        "This wizard will help you deploy a kubernetes cluster, do you prefer to access your 3bot using IPv4 or IPv6? If unsure, choose IPv4",
        ips,
    )

    user_form_data["Workers number"] = bot.int_ask(
        "Please specify the number of worker nodes", default=1
    )  # minimum should be 1
    cluster_size = user_form_data["Workers number"] + 1  # number of workers + the master node
    user_form_data["SSH keys"] = bot.upload_file(
        """"Please add your public ssh key, this will allow you to access the deployed container using ssh.
            Just upload the ssh keys file with each key on a seperate line"""
    )
    ssh_keys_list = user_form_data["SSH keys"].split("\n")

    user_form_data["Cluster secret"] = bot.string_ask("Please add the cluster secret", default="secret")



    # create new reservation
    reservation = j.sal.zosv2.reservation_create()
    identity = explorer.users.get(name=name, email=email)

    # Select nodes
    nodes_selected = j.sal.reservation_chatflow.nodes_get(
        cluster_size, farm_id=71, ip_version=user_form_data["IP version"]
    )

    # Create network of reservation and add peers
    reservation, configs = j.sal.reservation_chatflow.network_configure(
        bot, reservation, nodes_selected, customer_tid=identity.id, ip_version=user_form_data["IP version"]
    )
    rid = configs["rid"]

    bot.md_show_confirm(user_form_data)
    # Create master and workers
    # Master is in the first node from the selected nodes
    master = j.sal.zosv2.kubernetes.add_master(
        reservation=reservation,
        node_id=nodes_selected[0].node_id,
        network_name=configs["name"],
        cluster_secret=user_form_data["Cluster secret"],
        ip_address=configs["ip_addresses"][0],
        size=cluster_size,
        ssh_keys=ssh_keys_list,
    )

    # Workers are in the rest of the nodes
    for i in range(1, len(nodes_selected)):
        worker = j.sal.zosv2.kubernetes.add_worker(
            reservation=reservation,
            node_id=nodes_selected[i].node_id,
            network_name=configs["name"],
            cluster_secret=user_form_data["Cluster secret"],
            ip_address=configs["ip_addresses"][i],
            size=cluster_size,
            master_ip=master.ipaddress,
            ssh_keys=ssh_keys_list,
        )

    # register the reservation

    resv_id = j.sal.reservation_chatflow.reservation_register(reservation, expiration, customer_tid=identity.id)

    if j.sal.reservation_chatflow.reservation_failed(bot=bot, category="ZDB", resv_id=resv_id):
        return

    else:
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
                # Use the following template to configure your wireguard connection. This will give you access to your 3bot.
                ## Make sure you have <a href="https://www.wireguard.com/install/">wireguard</a> installed
                Click next
                to download your configuration
                """
        res = j.tools.jinja2.template_render(text=j.core.text.strip(res), **locals())
        bot.md_show(res)

        res = j.tools.jinja2.template_render(text=configs["wg"], **locals())
        bot.download_file(res, filename)
        res = """
                # In order to have the network active and accessible from your local machine. To do this, execute this command:
                ## ```wg-quick up /etc/wireguard/{}```
                Click next
                """.format(
            filename
        )

        res = j.tools.jinja2.template_render(text=j.core.text.strip(res), **locals())
        bot.md_show(res)
        for i, ip in enumerate(configs["ip_addresses"]):
            res = """
                kubernete {} IP : {}
                To connect ssh rancher@{}
            """.format(
                i + 1, ip, ip
            )

            res = j.tools.jinja2.template_render(text=res, **locals())
            bot.md_show(res)
