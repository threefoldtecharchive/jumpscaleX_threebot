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
    identity = j.sal.reservation_chatflow.validate_user(user_info)
    bot.md_show("This wizard will help you deploy a container using any flist provided")
    network = j.sal.reservation_chatflow.network_select(bot, identity.id)
    if not network:
        return
    currency = network.currency

    user_form_data["Solution name"] = j.sal.reservation_chatflow.solution_name_add(bot, model)
    while True:
        user_form_data["Flist link"] = bot.string_ask(
            "Please add the link to your flist to be deployed. For example: https://hub.grid.tf/usr/example.flist"
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
        user_form_data["Entry point"] = ""
    user_form_data["Env variables"] = bot.string_ask(
        """To set environment variables on your deployed container, enter comma-separated variable=value
        For example: var1=value1, var2=value2.
        Leave empty if not needed"""
    )

    expirationdelta = int(bot.time_delta_ask("Please enter solution expiration time.", default="1d"))
    user_form_data["Solution expiration"] = j.data.time.secondsToHRDelta(expirationdelta)
    expiration = j.data.time.epoch + expirationdelta

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
    node = j.sal.reservation_chatflow.nodes_get(1, hru=hru, cru=cru, sru=sru, currency=currency)[0]
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
    network.update(identity.id, currency=currency)

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
        public_ipv6=True,
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
    reservation_create = j.sal.reservation_chatflow.reservation_register(
        reservation, expiration, customer_tid=identity.id, currency=currency
    )
    resv_id = reservation_create.reservation_id
    wallet = j.sal.reservation_chatflow.payments_show(bot, reservation_create)
    if wallet:
        j.sal.zosv2.billing.payout_farmers(wallet, reservation_create)

    j.sal.reservation_chatflow.payment_wait(bot, resv_id)
    j.sal.reservation_chatflow.reservation_wait(bot, resv_id)
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
