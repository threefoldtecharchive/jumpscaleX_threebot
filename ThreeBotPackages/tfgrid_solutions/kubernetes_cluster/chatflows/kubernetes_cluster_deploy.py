from Jumpscale import j


def chat(bot):
    """
    """
    user_form_data = {}
    user_info = bot.user_info()
    name = user_info["username"]
    email = user_info["email"]
    ips = ["IPv6", "IPv4"]
    default_cluster_name = name.split(".3bot")[0]
    model = j.threebot.packages.tfgrid_solutions.kubernetes_cluster.bcdb_model_get(
        "tfgrid.solutions.kubernetes.instance.1"
    )
    explorer = j.clients.explorer.default

    identity = j.sal.reservation_chatflow.validate_user(user_info)

    bot.md_show("This wizard will help you deploy a kubernetes cluster")
    user_form_data["Solution name"] = j.sal.reservation_chatflow.solution_name_add(bot, model)
    network = j.sal.reservation_chatflow.network_select(bot, identity.id)
    if not network:
        return
    user_form_data["Workers number"] = bot.int_ask(
        "Please specify the number of worker nodes", default=1
    )  # minimum should be 1
    cluster_size = user_form_data["Workers number"] + 1  # number of workers + the master node
    user_form_data["SSH keys"] = bot.upload_file(
        """"Please add your public ssh key, this will allow you to access the deployed container using ssh.
            Just upload the ssh keys file with each key on a seperate line"""
    )
    ssh_keys_list = user_form_data["SSH keys"].split("\n")

    expirationdelta = int(bot.time_delta_ask("Please enter solution expiration time.", default="1d"))
    user_form_data["Solution expiration"] = j.data.time.secondsToHRDelta(expirationdelta)
    expiration = j.data.time.epoch + expirationdelta

    user_form_data["Cluster secret"] = bot.string_ask("Please add the cluster secret", default="secret")

    # create new reservation
    reservation = j.sal.zosv2.reservation_create()

    # Select nodes
    nodes_selected = j.sal.reservation_chatflow.nodes_get(cluster_size)
    ipaddresses = list()
    network_changed = False
    for idx, node_selected in enumerate(nodes_selected):
        changed, node_ip_range = j.sal.reservation_chatflow.add_node_to_network(node_selected, network)
        network_changed |= changed

        if idx == 0:
            msg = "Please choose IP Address for master node of your kubernets cluster"
        else:
            msg = f"Please choose IP Address for worker node {idx}  master node of your kubernets cluster"
        ip_address = bot.drop_down_choice(msg, j.sal.reservation_chatflow.get_all_ips(node_ip_range))
        ipaddresses.append(ip_address)

    user_form_data["IP Address"] = ipaddresses

    bot.md_show_confirm(user_form_data)
    # update network

    if network_changed:
        if not j.sal.reservation_chatflow.network_update(bot, network, identity.id):
            return

    # Create master and workers
    # Master is in the first node from the selected nodes
    master = j.sal.zosv2.kubernetes.add_master(
        reservation=reservation,
        node_id=nodes_selected[0].node_id,
        network_name=network.name,
        cluster_secret=user_form_data["Cluster secret"],
        ip_address=ipaddresses[0],
        size=cluster_size,
        ssh_keys=ssh_keys_list,
    )

    # Workers are in the rest of the nodes
    for i in range(1, len(nodes_selected)):
        worker = j.sal.zosv2.kubernetes.add_worker(
            reservation=reservation,
            node_id=nodes_selected[i].node_id,
            network_name=network.name,
            cluster_secret=user_form_data["Cluster secret"],
            ip_address=ipaddresses[i],
            size=cluster_size,
            master_ip=master.ipaddress,
            ssh_keys=ssh_keys_list,
        )

    # register the reservation

    resv_id = j.sal.reservation_chatflow.reservation_register(reservation, expiration, customer_tid=identity.id)

    if not j.sal.reservation_chatflow.reservation_wait(bot, resv_id):
        return

    else:
        j.sal.reservation_chatflow.reservation_save(
            resv_id, user_form_data["Solution name"], "tfgrid.solutions.kubernetes.instance.1"
        )

        res = f"# Kubernetes cluster has been deployed successfully: your reservation id is: {resv_id} "
        bot.md_show(res)

        for i, ip in enumerate(ipaddresses):
            res = """
                kubernete {} IP : {}
                To connect ssh rancher@{}
            """.format(
                i + 1, ip, ip
            )
            res = j.tools.jinja2.template_render(text=res, **locals())
            bot.md_show(res)
