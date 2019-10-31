from Jumpscale import j


def chat(bot):
    """
    to call http://localhost:5050/chat/session/ubuntu_deploy
    """

    HUB_URL = "https://hub.grid.tf/tf-bootable"
    IMAGES = ["ubuntu:16.04", "ubuntu:18.04"]

    email = bot.user_info().get("email")
    if not email:
        raise j.exceptions.BadRequest("Email shouldn't be empty")
    env_vars = bot.string_ask("Environment variables comma separated var1=value1, var=value2: ")
    version = bot.single_choice("Version", IMAGES)
    node_id = bot.string_ask("node_id: ")

    # create a new reservation
    var_list = env_vars.split(",")
    var_dict = {}
    for item in var_list:
        splitted_item = var_list.split("=")
        if len(splitted_item) == 2:
            var_dict[splitted_item[0]] = splitted_item[1]

    cl = j.clients.gedis.get(name="threebot")
    tid = cl.actors.phonebook.get(email=email).id
    bcdb = j.servers.threebot.default.bcdb_get("tf_workloads")
    reservation_model = bcdb.model_get(url="tfgrid.reservation.1")
    reservation = reservation_model.new()
    reservation.customer_tid = tid

    # create container
    container_model = bcdb.model_get(url="tfgrid.reservation.container.1")
    container = container_model.new()
    container.flist = f"{version}.flist"
    container.hub_url = HUB_URL
    container.workload_id = 1
    container.environment = var_dict
    reservation.data_reservation.containers.append(container)
    reservation_data = reservation._ddict
    # Register reservation
    reservation = cl.actors.workload_manager.reservation_register(reservation_data)

    res = f"Ubuntu has been deployed successfully: your reservation id is: {reservation.id} "
    bot.md_show(res)
    bot.redirect("https://threefold.me")
