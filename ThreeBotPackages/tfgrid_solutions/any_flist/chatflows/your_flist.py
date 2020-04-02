from Jumpscale import j
import netaddr
import requests


def chat(bot):
    """
    """
    user_form_data = {}
    user_info = bot.user_info()
    name = user_info["username"]
    email = user_info["email"]
    ips = ["IPv6", "IPv4"]
    env = dict()
    explorer = j.clients.explorer.default

    if not j.tools.threebot.with_threebotconnect:
        error_msg = """
        This chatflow is not supported when Threebot is in dev mode.
        To enable Threebot connect : `j.tools.threebot.threebotconnect_disable()`
        """
        raise j.exceptions.Runtime(error_msg)
    if not email:
        raise j.exceptions.Value("Email shouldn't be empty")
    if not name:
        raise j.exceptions.Value("Name of logged in user shouldn't be empty")
    not_found = True
    while not_found:
        user_form_data["Flist link"] = bot.string_ask(
            "This wizard will help you deploy a container using any flist provided\n Please add the link to your flist to be deployed. For example: https://hub.grid.tf/usr/example.flist"
        )

        flist_split = user_form_data["Flist link"].split("/")
        if len(flist_split) != 5:
            res = "# This flist doesn't correct. Please make sure you enter a valid link to an existing flist"
            res = j.tools.jinja2.template_render(text=res, **locals())
            bot.md_show(res)
            continue

        url = f"https://hub.grid.tf/api/flist/{flist_split[3]}/{flist_split[4]}"
        response = requests.get(url)

        if response.status_code == 200:
            not_found = False
        else:
            res = "# This flist doesn't exist. Please make sure you enter a valid link to an existing flist"
            res = j.tools.jinja2.template_render(text=res, **locals())
            bot.md_show(res)

    while not user_form_data.get("Public key"):
        user_form_data["Public key"] = bot.string_ask(
            "Please add your public ssh key, this will allow you to access the deployed container using ssh. Just copy your key from ~/.ssh/id_rsa.pub"
        )
    user_form_data["Env variables"] = bot.string_ask(
        """To set environment variables on your deployed container, enter comma-separated variable=value
        For example: var1=value1, var2=value2.
        Leave empty if not needed"""
    )

    user_form_data["Interactive"] = bot.single_choice(
        "Would you like access to your container through the web browser (coreX)?", ["YES", "NO"]
    )

    user_form_data["Solution expiration"] = bot.time_delta_ask("Please enter solution expiration time.", default="1d")

    expiration = j.data.time.epoch + int(user_form_data["Solution expiration"])

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
    bot.md_show_confirm(user_form_data)
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
