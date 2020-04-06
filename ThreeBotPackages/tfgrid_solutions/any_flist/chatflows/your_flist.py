from Jumpscale import j
import requests


def chat(bot):
    """
    """
    user_form_data = {}
    user_info = bot.user_info()
    env = dict()
    model = j.threebot.packages.tfgrid_solutions.any_flist.bcdb_model_get("tfgrid.solutions.flist.instance.1")
    explorer = j.clients.explorer.default

    identity = j.sal.reservation_chatflow.validate_user(user_info)
    bot.md_show("This wizard will help you deploy a container using any flist provided")
    network = j.sal.reservation_chatflow.network_select(bot, identity.id)
    if not network:
        return

    user_form_data["Solution name"] = j.sal.reservation_chatflow.solution_name_add(bot, model)
    found = False
    while not found:
        user_form_data["Flist link"] = bot.string_ask(
            "Please add the link to your flist to be deployed. For example: https://hub.grid.tf/usr/example.flist"
        )

        if "hub.grid.tf" not in user_form_data["Flist link"]:
            res = "# This flist doesn't correct. Please make sure you enter a valid link to an existing flist"
            res = j.tools.jinja2.template_render(text=res, **locals())
            bot.md_show(res)
            continue

        response = requests.head(user_form_data["Flist link"])
        if response.status_code == 200:
            found = True
        else:
            res = "# This flist doesn't exist. Please make sure you enter a valid link to an existing flist"
            res = j.tools.jinja2.template_render(text=res, **locals())
            bot.md_show(res)

    form = bot.new_form()
    cpu = form.int_ask("Please add how many CPU cores are needed", default=1)
    memory = form.int_ask("Please add the amount of memory in MB", default=1024)
    form.ask()
    user_form_data["CPU"] = cpu.value
    user_form_data["Memory"] = memory.value

    user_form_data["Interactive"] = bot.single_choice(
        "Would you like access to your container through the web browser (coreX)?", ["YES", "NO"]
    )
    if user_form_data["Interactive"] == "NO":
        while not user_form_data.get("Public key"):
            user_form_data["Public key"] = bot.upload_file(
                """"Please add your public ssh key, this will allow you to access the deployed container using ssh.
                    Just upload the file with the key"""
            ).split("\n")[0]
        user_form_data["Entry point"] = bot.string_ask("Please add your entrypoint for your flist")
    else:
        user_form_data["Public key"]=""
        user_form_data["Entry point"] = ""
    user_form_data["Env variables"] = bot.string_ask(
        """To set environment variables on your deployed container, enter comma-separated variable=value
        For example: var1=value1, var2=value2.
        Leave empty if not needed"""
    )

    expirationdelta = int(bot.time_delta_ask("Please enter solution expiration time.", default="1d"))
    user_form_data["Solution expiration"] = j.data.time.secondsToHRDelta(expirationdelta)
    expiration = j.data.time.epoch + expirationdelta

    env.update({"pub_key": user_form_data["Public key"]})
    if user_form_data["Env variables"]:
        var_list = user_form_data["Env variables"].split(",")
        var_dict = {}
        for item in var_list:
            splitted_item = item.split("=")
            if len(splitted_item) == 2:
                var_dict[splitted_item[0]] = splitted_item[1]

        env.update(var_dict)

    # create new reservation
    reservation = j.sal.zosv2.reservation_create()

    node = j.sal.reservation_chatflow.nodes_get(1)[0]
    network_reservation, node_ip_range = j.sal.reservation_chatflow.add_node_to_network(node, network)
    if network_reservation:
        j.sal.reservation_chatflow.reservation_register(network_reservation, network.expiration, identity.id)

    ip_address = bot.drop_down_choice(
        f"Please choose IP Address for your solution", j.sal.reservation_chatflow.get_all_ips(node_ip_range)
    )
    user_form_data["IP Address"] = ip_address

    conatiner_flist = user_form_data["Flist link"]
    storage_url = "zdb://hub.grid.tf:9900"
    if user_form_data["Interactive"] == "YES":
        interactive = True
    else:
        interactive = False

    bot.md_show_confirm(user_form_data)
    # create container
    cont = j.sal.zosv2.container.create(
        reservation=reservation,
        node_id=node.node_id,
        network_name=network.name,
        ip_address=ip_address,
        flist=conatiner_flist,
        storage_url=storage_url,
        env=env,
        interactive=interactive,
        public_ipv6=True,
        entrypoint=user_form_data["Entry point"],
        cpu=user_form_data["CPU"],
        memory=user_form_data["Memory"],
    )

    resv_id = j.sal.reservation_chatflow.reservation_register(reservation, expiration, customer_tid=identity.id)

    if j.sal.reservation_chatflow.reservation_failed(bot=bot, category="CONTAINER", resv_id=resv_id):
        return
    else:
        j.sal.reservation_chatflow.reservation_save(
            resv_id, user_form_data["Solution name"], "tfgrid.solutions.flist.instance.1"
        )

        if interactive:
            res = f"""
                # Container has been deployed successfully: your reservation id is: {resv_id}
                Open your browser at [http://{ip_address}:7681](http://{ip_address}:7681)
                """
            res = j.tools.jinja2.template_render(text=j.core.text.strip(res), **locals())
            bot.md_show(res)
        else:
            res = f"""
                # Container has been deployed successfully: your reservation id is: {resv_id}
                Your IP is  ```{ip_address}```
                """
            res = j.tools.jinja2.template_render(text=j.core.text.strip(res), **locals())
            bot.md_show(res)
