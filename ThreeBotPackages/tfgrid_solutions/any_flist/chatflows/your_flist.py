from Jumpscale import j
import netaddr


def chat(bot):
    """
    """

    user_form_data = {}
    user_info = bot.user_info()
    name = user_info["username"]
    email = user_info["email"]
    ips = ["IPv6", "IPv4"]
    env = dict()
    expiration = j.data.time.epoch + (60 * 60 * 24)  # for one day
    explorer = j.clients.explorer.default
    if not email:
        raise j.exceptions.Value("Email shouldn't be empty")

    form = bot.new_form()
    user_form_data["Flist link"] = form.string_ask(
        "This wizard will help you deploy a container using any flit provided\n Please add the link to your flist to be deployed. For example: https://hub.grid.tf/usr/example.flist"
    ).value
    while not user_form_data.get("Public key"):
        user_form_data["Public key"] = form.string_ask(
            "Please add your public ssh key, this will allow you to access the deployed container using ssh. Just copy your key from ~/.ssh/id_rsa.pub"
        ).value
    user_form_data["Env variables"] = form.string_ask(
        """To set environment variables on your deployed container, enter comma-separated variable=value
        For example: var1=value1, var2=value2.
        Leave empty if not needed"""
    ).value
    form.ask()

    user_form_data["Interactive"] = bot.single_choice(
        "Would you like access to your container through the web browser (coreX)?", ["YES", "NO"]
    )

    env.update({"pub_key": user_form_data["Public key"]})
    if user_form_data["Env variables"]:
        var_list = user_form_data["Env variables"].split(",")
        var_dict = {}
        for item in var_list:
            splitted_item = item.split("=")
            if len(splitted_item) == 2:
                var_dict[splitted_item[0]] = splitted_item[1]

        env.update(var_dict)

    user_form_data["IP version"] = bot.single_choice(
        "Do you prefer to access your 3bot using IPv4 or IPv6? If unsure, choose IPv4", ips
    )

    bot.md_show_confirm(user_form_data)

    # create new reservation
    reservation = j.sal.zosv2.reservation_create()
    identity = explorer.users.get(name=name, email=email)

    node_selected = j.sal.reservation_chatflow.nodes_get(1, ip_version=user_form_data["IP version"])[0]

    reservation, config = j.sal.reservation_chatflow.network_configure(
        bot, reservation, [node_selected], customer_tid=identity.id, ip_version=user_form_data["IP version"]
    )
    ip_address = config["ip_addresses"][0]

    conatiner_flist = user_form_data["Flist link"]
    storage_url = "zdb://hub.grid.tf:9900"
    if user_form_data["Interactive"] == "YES":
        interactive = True
    else:
        interactive = False

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

    if j.sal.reservation_chatflow.reservation_failed(bot=bot, category="CONTAINER", resv_id=resv_id):
        return
    else:
        res = f"# Container has been deployed successfully: your reservation id is: {resv_id} "

        bot.md_show(res)

        filename = "{}_{}.conf".format(name.split(".3bot")[0], resv_id)

        res = """
                # Use the following template to configure your wireguard connection. This will give you access to your 3bot.
                ## Make sure you have <a href="https://www.wireguard.com/install/">wireguard</a> installed
                Click next
                to download your configuration
                """
        res = j.tools.jinja2.template_render(text=j.core.text.strip(res), **locals())
        bot.md_show(res)

        res = j.tools.jinja2.template_render(text=config["wg"], **locals())
        bot.download_file(res, filename)
        res = """
                # In order to have the network active and accessible from your local machine. To do this, execute this command: 
                ## ```wg-quick up /etc/wireguard/{}```
                Click next
                """.format(
            filename
        )

        res = j.tools.jinja2.template_render(text=j.core.text.strip(res), **locals())
        bot.md_show(res)

        if interactive:
            res = "# Open your browser at ```{}:7681```".format(ip_address)
            res = j.tools.jinja2.template_render(text=res, **locals())
            bot.md_show(res)
        else:
            res = "# Your IP is  ```{}```".format(ip_address)
            res = j.tools.jinja2.template_render(text=res, **locals())
            bot.md_show(res)
