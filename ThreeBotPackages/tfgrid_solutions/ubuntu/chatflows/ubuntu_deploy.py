from Jumpscale import j


def chat(bot):
    """
    """
    user_form_data = {}
    user_info = bot.user_info()
    name = user_info["username"]
    email = user_info["email"]
    ips = ["IPv6", "IPv4"]
    HUB_URL = "https://hub.grid.tf/tf-bootable"
    IMAGES = ["ubuntu:16.04", "ubuntu:18.04"]
    explorer = j.clients.explorer.default
    model = j.threebot.packages.tfgrid_solutions.ubuntu.bcdb_model_get("tfgrid.solutions.ubuntu.instance.1")

    identity = j.sal.reservation_chatflow.validate_user(user_info)
    bot.md_show("This wizard wil help you deploy an ubuntu container")
    network = j.sal.reservation_chatflow.network_select(bot, identity.id)
    if not network:
        return
    user_form_data["Solution name"] = j.sal.reservation_chatflow.solution_name_add(bot, model)
    user_form_data["Version"] = bot.single_choice("Please choose ubuntu version", IMAGES)

    form = bot.new_form()
    cpu = form.int_ask("Please add how many CPU cores are needed", default=1)
    memory = form.int_ask("Please add the amount of memory in MB", default=1024)
    form.ask()
    user_form_data["CPU"] = cpu.value
    user_form_data["Memory"] = memory.value

    while not user_form_data.get("Public key"):
        user_form_data["Public key"] = bot.upload_file(
            """"Please add your public ssh key, this will allow you to access the deployed container using ssh.
                Just upload the file with the key"""
        ).split("\n")[0]

    user_form_data["Env variables"] = bot.string_ask(
        """To set environment variables on your deployed container, enter comma-separated variable=value
        For example: var1=value1, var2=value2.
        Leave empty if not needed"""
    )

    expirationdelta = int(bot.time_delta_ask("Please enter solution expiration time.", default="1d"))
    user_form_data["Solution expiration"] = j.data.time.secondsToHRDelta(expirationdelta)
    expiration = j.data.time.epoch + expirationdelta

    var_list = user_form_data["Env variables"].split(",")
    var_dict = {}
    for item in var_list:
        splitted_item = item.split("=")
        if len(splitted_item) == 2:
            var_dict[splitted_item[0]] = splitted_item[1]

    var_dict.update({"pub_key": user_form_data["Public key"]})
    # create new reservation
    reservation = j.sal.zosv2.reservation_create()

    node_selected = j.sal.reservation_chatflow.nodes_get(1)[0]
    network_changed, node_ip_range = j.sal.reservation_chatflow.add_node_to_network(node_selected, network)
    ip_address = bot.drop_down_choice(
        f"Please choose IP Address for your solution", j.sal.reservation_chatflow.get_all_ips(node_ip_range)
    )
    user_form_data["IP Address"] = ip_address
    bot.md_show_confirm(user_form_data)

    if network_changed:
        if not j.sal.reservation_chatflow.network_update(bot, network, identity.id):
            return

    container_flist = f"{HUB_URL}/{user_form_data['Version']}-r1.flist"
    storage_url = "zdb://hub.grid.tf:9900"
    entry_point = "/bin/bash /start.sh"

    # create container
    cont = j.sal.zosv2.container.create(
        reservation=reservation,
        node_id=node_selected.node_id,
        network_name=network.name,
        ip_address=ip_address,
        flist=container_flist,
        storage_url=storage_url,
        env=var_dict,
        interactive=False,
        entrypoint=entry_point,
        cpu=user_form_data["CPU"],
        public_ipv6=True,
        memory=user_form_data["Memory"],
    )

    resv_id = j.sal.reservation_chatflow.reservation_register(reservation, expiration, customer_tid=identity.id)

    if not j.sal.reservation_chatflow.reservation_wait(bot, resv_id):
        return
    else:
        j.sal.reservation_chatflow.reservation_save(
            resv_id, user_form_data["Solution name"], "tfgrid.solutions.ubuntu.instance.1"
        )

        res = f"""
            # Ubuntu has been deployed successfully: your reservation id is: {resv_id}
            To connect ```ssh root@{ip_address}``` .It may take a few minutes.
            """
        res = j.tools.jinja2.template_render(text=j.core.text.strip(res), **locals())
        bot.md_show(res)
