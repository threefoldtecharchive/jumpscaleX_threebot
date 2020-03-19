from Jumpscale import j
import netaddr


def chat(bot):
    """
    """

    user_info = bot.user_info()
    name = user_info["username"]
    email = user_info["email"]
    ips = ["IPv6", "IPv4"]
    env = dict()
    expiration = j.data.time.epoch + (60 * 60 * 24)  # for one day
    explorer = j.clients.explorer.explorer
    if not email:
        raise j.exceptions.BadRequest("Email shouldn't be empty")

    form = bot.new_form()
    flist = form.string_ask(
        "Please add the link to your flist to be deployed. For example: https://hub.grid.tf/usr/example.flist"
    )
    pub_key = None
    while not pub_key:
        pub_key = bot.string_ask(
            "Please add your public ssh key, this will allow you to access the deployed container using ssh. Just copy your key from ~/.ssh/id_rsa.pub"
        )
    env_vars = form.string_ask(
        """To set environment variables on your deployed container, enter comma-separated variable=value
        For example: var1=value1, var2=value2.
        Leave empty if not needed"""
    )
    form.ask()

    inetractive = bot.single_choice(
        "Would you like access to your container through the web browser (coreX)?", ["YES", "NO"]
    )

    env.update({"pub_key": pub_key.value})
    if env_vars.value:
        var_list = env_vars.value.split(",")
        var_dict = {}
        for item in var_list:
            splitted_item = item.split("=")
            if len(splitted_item) == 2:
                var_dict[splitted_item[0]] = splitted_item[1]

        env.update(var_dict)

    # create new reservation
    reservation = j.sal.zosv2.reservation_create()
    identity = explorer.users.get(name=name, email=email)

    ip_version = bot.single_choice("Do you prefer to access your 3bot using IPv4 or IPv6? If unsure, chooose IPv4", ips)
    node_selected = j.sal.reservation_chatflow.nodes_get(1, ip_version=ip_version)[0]

    reservation, config = j.sal.reservation_chatflow.network_configure(
        bot, reservation, [node_selected], customer_tid=identity.id, ip_version=ip_version
    )
    ip_address = config["ip_addresses"][0]

    conatiner_flist = flist.value
    storage_url = "zdb://hub.grid.tf:9900"
    if inetractive.value == "YES":
        interactive = True
    else:
        inetractive = False

    # create container
    cont = j.sal.zosv2.container.create(
        reservation=reservation,
        node_id=node_selected.node_id,
        network_name=config["name"],
        ip_address=ip_address,
        flist=conatiner_flist,
        storage_url=storage_url,
        env=env,
        interactive=interactive,
    )

    resv_id = j.sal.reservation_chatflow.reservation_register(reservation, expiration, customer_tid=identity.id)

    res = f"# Container has been deployed successfully: your reservation id is: {resv_id} "

    bot.md_show(res)

    filename = "{}_{}.conf".format(name, resv_id)

    res = """
            # Use the following template to configure your wireguard connection. This will give you access to your 3bot.
            ## Make sure you have wireguard ```https://www.wireguard.com/install/``` installed:
            ## ```wg-quick up /etc/wireguard/{}```
            Click next
            to download your configuration
            """.format(
        filename
    )
    res = j.tools.jinja2.template_render(text=j.core.text.strip(res), **locals())
    bot.md_show(res)

    res = j.tools.jinja2.template_render(text=config["wg"], **locals())
    bot.download_file(res, filename)
    if interactive:
        res = "# Open your browser at ```{}:7681```".format(ip_address)
        res = j.tools.jinja2.template_render(text=res, **locals())
        bot.md_show(res)
    else:
        res = "# Your IP is  ```{}```".format(ip_address)
        res = j.tools.jinja2.template_render(text=res, **locals())
        bot.md_show(res)
