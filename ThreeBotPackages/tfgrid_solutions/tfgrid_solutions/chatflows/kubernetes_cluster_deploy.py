from Jumpscale import j
from Jumpscale.servers.gedis.GedisChatBot import StopChatFlow


def chat(bot):
    """
    """
    user_form_data = {}
    user_info = bot.user_info()
    user_form_data["chatflow"] = "kubernetes"
    model = j.threebot.packages.tfgrid_solutions.tfgrid_solutions.bcdb_model_get("tfgrid.solutions.kubernetes.1")

    j.sal.reservation_chatflow.validate_user(user_info)

    bot.md_show("# This wizard will help you deploy a kubernetes cluster")
    network = j.sal.reservation_chatflow.network_select(bot, j.me.tid)
    if not network:
        return
    currency = network.currency
    farms = j.sal.reservation_chatflow.farms_select(bot)
    user_form_data["Solution name"] = j.sal.reservation_chatflow.solution_name_add(bot, model)

    while True:
        form = bot.new_form()
        sizes = ["1 vCPU 2 GiB ram 50GiB disk space", "2 vCPUs 4 GiB ram 100GiB disk space"]
        cluster_size_string = form.drop_down_choice("Choose the size of your nodes", sizes)
        masternodes = form.int_ask("Please specify the number of master nodes", default=1)  # minimum should be 1
        workernodes = form.int_ask("Please specify the number of worker nodes", default=1)  # minimum should be 1

        form.ask()
        cluster_size = sizes.index(cluster_size_string.value) + 1  # sizes are index 1
        # Select nodes
        if cluster_size == 1:
            nodequery = {"sru": 50, "mru": 2, "cru": 1, "currency": currency}
        else:
            nodequery = {"sru": 100, "mru": 4, "cru": 2, "currency": currency}
        try:
            master_nodes_selected = j.sal.reservation_chatflow.nodes_get(
                masternodes.value, farm_names=farms, **nodequery
            )
            worker_nodes_selected = j.sal.reservation_chatflow.nodes_get(
                workernodes.value, farm_names=farms, **nodequery
            )
            break
        except StopChatFlow as e:
            bot.md_show(e.msg)

    user_form_data["Master number"] = masternodes.value
    user_form_data["Workers number"] = workernodes.value
    user_form_data["Cluster size"] = cluster_size_string.value
    user_form_data["SSH keys"] = bot.upload_file(
        """Please add your public ssh key, this will allow you to access the deployed container using ssh.
            Just upload the ssh keys file with each key on a seperate line"""
    )
    ssh_keys_list = user_form_data["SSH keys"].split("\n")

    expirationdelta = int(bot.time_delta_ask("Please enter solution expiration time.", default="1d"))
    user_form_data["Solution expiration"] = j.data.time.secondsToHRDelta(expirationdelta)
    expiration = j.data.time.epoch + expirationdelta

    user_form_data["Cluster secret"] = bot.string_ask("Please add the cluster secret", default="secret")

    # create new reservation
    reservation = j.sal.zosv2.reservation_create()

    ipaddresses = list()
    for idx, node_selected in enumerate(master_nodes_selected):
        network.add_node(node_selected)
        msg = f"Please choose IP Address for master node {idx + 1} of your kubernets cluster"
        ip_address = network.ask_ip_from_node(node_selected, msg)
        ipaddresses.append(ip_address)

    for idx, node_selected in enumerate(worker_nodes_selected):
        if node_selected not in master_nodes_selected:
            network.add_node(node_selected)
        msg = f"Please choose IP Address for worker node {idx + 1} of your kubernets cluster"
        ip_address = network.ask_ip_from_node(node_selected, msg)
        ipaddresses.append(ip_address)

    user_form_data["IP Address"] = ipaddresses

    bot.md_show_confirm(user_form_data)
    # update network

    network.update(j.me.tid, currency=currency, bot=bot)

    # Create master and workers
    # Master is in the first node from the selected nodes
    for idx, master_node in enumerate(master_nodes_selected):
        master = j.sal.zosv2.kubernetes.add_master(
            reservation=reservation,
            node_id=master_node.node_id,
            network_name=network.name,
            cluster_secret=user_form_data["Cluster secret"],
            ip_address=ipaddresses[idx],
            size=cluster_size,
            ssh_keys=ssh_keys_list,
        )

    # Workers are in the rest of the nodes
    for i, worker_node in enumerate(worker_nodes_selected):
        j.sal.zosv2.kubernetes.add_worker(
            reservation=reservation,
            node_id=worker_node.node_id,
            network_name=network.name,
            cluster_secret=user_form_data["Cluster secret"],
            ip_address=ipaddresses[i + masternodes.value],
            size=cluster_size,
            master_ip=master.ipaddress,
            ssh_keys=ssh_keys_list,
        )

    # register the reservation
    metadata = user_form_data.copy()
    metadata.pop("SSH keys")
    res = j.sal.reservation_chatflow.solution_model_get(
        user_form_data["Solution name"], "tfgrid.solutions.kubernetes.1", metadata
    )
    reservation = j.sal.reservation_chatflow.reservation_metadata_add(reservation, res)
    resv_id = j.sal.reservation_chatflow.reservation_register_and_pay(
        reservation, expiration, customer_tid=j.me.tid, currency=currency, bot=bot
    )
    j.sal.reservation_chatflow.reservation_save(
        resv_id, user_form_data["Solution name"], "tfgrid.solutions.kubernetes.1", user_form_data
    )

    res = f"# Kubernetes cluster has been deployed successfully: your reservation id is: {resv_id}"
    for i, ip in enumerate(ipaddresses):
        res += f"""
## kubernete {i +1} IP : {ip}
To connect ssh rancher@{ip}
        """
    bot.md_show(res)
