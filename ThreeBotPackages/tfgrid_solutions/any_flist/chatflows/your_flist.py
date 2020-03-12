from Jumpscale import j
import netaddr


def chat(bot):
    """
    """

    user_info = bot.user_info()
    name = user_info["username"]
    email = user_info["email"]
    ips = ["IPV6", "IPV4"]
    env = dict()

    explorer = j.clients.threebot.explorer
    if not email:
        raise j.exceptions.BadRequest("Email shouldn't be empty")

    form = bot.new_form()
    flist = form.string_ask(
        "Please add link of your flist to deploy it for example: https://hub.grid.tf/usr/example.flist"
    )
    pub_key = form.string_ask(
        "Please add your public ssh-key (that will allow you to access the deployed container using ssh)"
    )
    env_vars = form.string_ask(
        "Environment variables (optional. Comma-seperated env variables on container startup. For example: var1=value1, var=value2)"
    )
    form.ask()

    inetractive = bot.single_choice("DO you want to use this container using web browser or not ?", ["YES", "NO"])

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
    identity = explorer.actors_all.phonebook.get(name=name, email=email)

    ip = bot.single_choice("choose your IP version", ips)
    node_selected = j.sal.chatflow.nodes_get(1, ip)[0]

    reservation, config = j.sal.chatflow.network_configure(bot, reservation, [node_selected])
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

    expiration = j.data.time.epoch + (24)

    resv_id = j.sal.zosv2.reservation_register(reservation, expiration)

    res = f"# Container has been deployed successfully: your reservation id is: {resv_id} "

    bot.md_show(res)

    filename = "{}_{}.conf".format(name, resv_id)

    res = """
            # Use the next template to configure the wg-quick config of your laptop:
            ### ```wg-quick up /etc/wireguard/{}```
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
