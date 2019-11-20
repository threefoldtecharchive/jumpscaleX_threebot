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

    # Create and register new reservation with container information(credentials will be obtained from threebot.me)
    reservation = j.tools.threebot.explorer.container_create(
        flist=f"{version}.flist", hub_url=HUB_URL, environment=var_dict, entrypoint="/bin/bash"
    )

    res = f"Ubuntu has been deployed successfully: your reservation id is: {reservation.id} "
    bot.md_show(res)
    bot.redirect("https://threefold.me")
