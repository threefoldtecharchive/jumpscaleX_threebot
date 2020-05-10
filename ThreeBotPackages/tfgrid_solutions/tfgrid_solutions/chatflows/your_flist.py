from Jumpscale import j
import math
import requests


def chat(bot):
    """
    """
    user_form_data = {}
    user_info = bot.user_info()
    user_form_data["chatflow"] = "flist"
    env = dict()
    model = j.threebot.packages.tfgrid_solutions.tfgrid_solutions.bcdb_model_get("tfgrid.solutions.flist.1")
    j.sal.reservation_chatflow.validate_user(user_info)
    bot.md_show("# This wizard will help you deploy a container using any flist provided")
    network = j.sal.reservation_chatflow.network_select(bot, j.me.tid)
    if not network:
        return
    currency = network.currency

    user_form_data["Solution name"] = j.sal.reservation_chatflow.solution_name_add(bot, model)
    while True:
        user_form_data["Flist link"] = bot.string_ask(
            "Please add the link to your flist to be deployed. For example: https://hub.grid.tf/usr/example.flist",
            allow_empty=False,
        )

        if "hub.grid.tf" not in user_form_data["Flist link"]:
            res = "This flist is not correct. Please make sure you enter a valid link to an existing flist"
            bot.md_show(res)
            continue

        response = requests.head(user_form_data["Flist link"])
        if response.status_code == 200:
            break
        else:
            res = "This flist doesn't exist. Please make sure you enter a valid link to an existing flist"
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
        user_form_data["Entry point"] = bot.string_ask("Please add your entrypoint for your flist")
    else:
        user_form_data["Port"] = "7681"
        user_form_data["Entry point"] = ""
    user_form_data["Env variables"] = bot.string_ask(
        """To set environment variables on your deployed container, enter comma-separated variable=value
        For example: var1=value1, var2=value2.
        Leave empty if not needed"""
    )

    expiration = bot.datetime_picker("Please enter solution expiration time.")
    user_form_data["Solution expiration"] = j.data.time.secondsToHRDelta(expiration - j.data.time.epoch)

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
    hru = math.ceil(memory.value / 1024)
    cru = cpu.value
    sru = 1  # needed space for a container is 250MiB
    farms = j.sal.reservation_chatflow.farm_names_get(1, bot, hru=hru, cru=cru, sru=sru, currency=currency)
    node = j.sal.reservation_chatflow.nodes_get(1, farm_names=farms, hru=hru, cru=cru, sru=sru, currency=currency)[0]
    network.add_node(node)
    ip_address = network.ask_ip_from_node(node, "Please choose your IP Address for this solution")
    user_form_data["IP Address"] = ip_address

    conatiner_flist = user_form_data["Flist link"]
    storage_url = "zdb://hub.grid.tf:9900"
    if user_form_data["Interactive"] == "YES":
        interactive = True
    else:
        interactive = False

    bot.md_show_confirm(user_form_data)

    # update network
    network.update(j.me.tid, currency=currency, bot=bot)

    # create container
    j.sal.zosv2.container.create(
        reservation=reservation,
        node_id=node.node_id,
        network_name=network.name,
        ip_address=ip_address,
        flist=conatiner_flist,
        storage_url=storage_url,
        env=env,
        interactive=interactive,
        entrypoint=user_form_data["Entry point"],
        cpu=user_form_data["CPU"],
        memory=user_form_data["Memory"],
    )
    metadata = dict()
    metadata["chatflow"] = user_form_data["chatflow"]
    metadata["Solution name"] = user_form_data["Solution name"]
    metadata["Solution expiration"] = user_form_data["Solution expiration"]

    res = j.sal.reservation_chatflow.solution_model_get(
        user_form_data["Solution name"], "tfgrid.solutions.flist.1", metadata
    )
    reservation = j.sal.reservation_chatflow.reservation_metadata_add(reservation, res)
    resv_id = j.sal.reservation_chatflow.reservation_register_and_pay(
        reservation, expiration, customer_tid=j.me.tid, currency=currency, bot=bot
    )
    j.sal.reservation_chatflow.reservation_save(
        resv_id, user_form_data["Solution name"], "tfgrid.solutions.flist.1", user_form_data
    )

    if interactive:
        res = f"""\
            # Container has been deployed successfully: your reservation id is: {resv_id}
            Open your browser at [http://{ip_address}:7681](http://{ip_address}:7681)
            """
        bot.md_show(j.core.text.strip(res))
    else:
        res = f"""\
            # Container has been deployed successfully: your reservation id is: {resv_id}
            Your IP is  ```{ip_address}```
            """
        bot.md_show(j.core.text.strip(res))
