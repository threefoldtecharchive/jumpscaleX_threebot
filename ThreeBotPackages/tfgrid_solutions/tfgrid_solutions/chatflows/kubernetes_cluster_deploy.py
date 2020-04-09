from Jumpscale import j


def chat(bot):
    """
    """
    user_form_data = {}
    user_info = bot.user_info()
    model = j.threebot.packages.tfgrid_solutions.tfgrid_solutions.bcdb_model_get("tfgrid.solutions.kubernetes.1")

    identity = j.sal.reservation_chatflow.validate_user(user_info)

    bot.md_show("# This wizard will help you deploy a kubernetes cluster")
    network = j.sal.reservation_chatflow.network_select(bot, identity.id)
    user_form_data["Solution name"] = j.sal.reservation_chatflow.solution_name_add(bot, model)
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
    for idx, node_selected in enumerate(nodes_selected):
        network.add_node(node_selected)
        if idx == 0:
            msg = "Please choose IP Address for master node of your kubernets cluster"
        else:
            msg = f"Please choose IP Address for worker node {idx}  master node of your kubernets cluster"
        ip_address = network.ask_ip_from_node(node_selected, msg)
        ipaddresses.append(ip_address)

    user_form_data["IP Address"] = ipaddresses

    bot.md_show_confirm(user_form_data)
    # update network

    network.update(identity.id)

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
        j.sal.zosv2.kubernetes.add_worker(
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
    j.sal.reservation_chatflow.reservation_wait(bot, resv_id)

    j.sal.reservation_chatflow.reservation_save(
        resv_id, user_form_data["Solution name"], "tfgrid.solutions.kubernetes.1"
    )

    res = f"# Kubernetes cluster has been deployed successfully: your reservation id is: {resv_id}"
    for i, ip in enumerate(ipaddresses):
        res += f"""
## kubernete {i +1} IP : {ip}
To connect ssh rancher@{ip}
        """
    bot.md_show(res)
