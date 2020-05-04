from Jumpscale import j
import math


def chat(bot):
    """
    """
    user_form_data = {}
    user_info = bot.user_info()
    HUB_URL = "https://hub.grid.tf/tf-bootable"
    IMAGES = ["ubuntu:16.04", "ubuntu:18.04"]
    model = j.threebot.packages.tfgrid_solutions.tfgrid_solutions.bcdb_model_get("tfgrid.solutions.ubuntu.1")
    user_form_data["chatflow"] = "ubuntu"

    j.sal.reservation_chatflow.validate_user(user_info)
    bot.md_show("# This wizard wil help you deploy an ubuntu container")
    network = j.sal.reservation_chatflow.network_select(bot, j.me.tid)
    if not network:
        return
    currency = network.currency
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
            """Please add your public ssh key, this will allow you to access the deployed container using ssh.
                Just upload the file with the key"""
        ).split("\n")[0]

    expirationdelta = int(bot.time_delta_ask("Please enter solution expiration time.", default="1d"))
    user_form_data["Solution expiration"] = j.data.time.secondsToHRDelta(expirationdelta)
    expiration = j.data.time.epoch + expirationdelta

    var_dict = {"pub_key": user_form_data["Public key"]}
    query = {"mru": math.ceil(memory.value / 1024), "cru": cpu.value, "sru": 1}
    # create new reservation
    reservation = j.sal.zosv2.reservation_create()
    nodeid = bot.string_ask(
        "Please enter the nodeid you would like to deploy on if left empty a node will be chosen for you"
    )
    while nodeid:
        try:
            node_selected = j.sal.reservation_chatflow.validate_node(nodeid, query, currency)
            break
        except (j.exceptions.Value, j.exceptions.NotFound) as e:
            message = "<br> Please enter a different nodeid to deploy on or leave it empty"
            nodeid = bot.string_ask(str(e) + message)

    query["currency"] = currency
    if not nodeid:
        farms = j.sal.reservation_chatflow.farm_names_get(1, bot, **query)
        node_selected = j.sal.reservation_chatflow.nodes_get(1, farm_names=farms, **query)[0]
    network.add_node(node_selected)
    ip_address = network.ask_ip_from_node(node_selected, "Please choose IP Address for your solution")
    user_form_data["IP Address"] = ip_address
    bot.md_show_confirm(user_form_data)
    network.update(j.me.tid, currency=currency, bot=bot)

    container_flist = f"{HUB_URL}/{user_form_data['Version']}-r1.flist"
    storage_url = "zdb://hub.grid.tf:9900"
    entry_point = "/bin/bash /start.sh"

    # create container
    j.sal.zosv2.container.create(
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
        memory=user_form_data["Memory"],
    )
    metadata = dict()
    metadata["chatflow"] = user_form_data["chatflow"]
    metadata["Solution name"] = user_form_data["Solution name"]
    metadata["Version"] = user_form_data["Version"]
    metadata["Solution expiration"] = user_form_data["Solution expiration"]

    res = j.sal.reservation_chatflow.solution_model_get(
        user_form_data["Solution name"], "tfgrid.solutions.ubuntu.1", metadata
    )
    reservation = j.sal.reservation_chatflow.reservation_metadata_add(reservation, res)
    resv_id = j.sal.reservation_chatflow.reservation_register_and_pay(
        reservation, expiration, customer_tid=j.me.tid, currency=currency, bot=bot
    )

    j.sal.reservation_chatflow.reservation_save(
        resv_id, user_form_data["Solution name"], "tfgrid.solutions.ubuntu.1", user_form_data
    )

    res = f"""\
        # Ubuntu has been deployed successfully: your reservation id is: {resv_id}
        To connect ```ssh root@{ip_address}``` .It may take a few minutes.
        """
    bot.md_show(j.core.text.strip(res))
