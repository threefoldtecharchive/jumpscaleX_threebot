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
    HUB_URL = "https://hub.grid.tf/tf-bootable"
    IMAGES = ["ubuntu:16.04", "ubuntu:18.04"]
    expiration = j.data.time.epoch + (60 * 60 * 24)  # for one day
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

    user_form_data["Version"] = bot.single_choice(
        "This wizard will help you deploy an ubuntu container, please choose ubuntu version", IMAGES
    )
    user_form_data["Env variables"] = bot.string_ask(
        """To set environment variables on your deployed container, enter comma-separated variable=value
        For example: var1=value1, var2=value2.
        Leave empty if not needed"""
    )
    user_form_data["IP version"] = bot.single_choice(
        "Do you prefer to access your 3bot using IPv4 or IPv6? If unsure, choose IPv4", ips
    )

    var_list = user_form_data["Env variables"].split(",")
    var_dict = {}
    for item in var_list:
        splitted_item = item.split("=")
        if len(splitted_item) == 2:
            var_dict[splitted_item[0]] = splitted_item[1]

    # create new reservation
    reservation = j.sal.zosv2.reservation_create()
    identity = explorer.users.get(name=name, email=email)

    node_selected = j.sal.reservation_chatflow.nodes_get(1, ip_version=user_form_data["IP version"])[0]

    reservation, config = j.sal.reservation_chatflow.network_configure(
        bot, reservation, [node_selected], customer_tid=identity.id, ip_version=user_form_data["IP version"]
    )
    ip_address = config["ip_addresses"][0]
    bot.md_show_confirm(user_form_data)

    container_flist = f"{HUB_URL}/{user_form_data['Version']}.flist"
    storage_url = "zdb://hub.grid.tf:9900"

    # create container
    cont = j.sal.zosv2.container.create(
        reservation=reservation,
        node_id=node_selected.node_id,
        network_name=config["name"],
        ip_address=ip_address,
        flist=container_flist,
        storage_url=storage_url,
        env=var_dict,
        interactive=True,
    )

    resv_id = j.sal.reservation_chatflow.reservation_register(reservation, expiration, customer_tid=identity.id)

    if j.sal.reservation_chatflow.reservation_failed(bot=bot, category="CONTAINER", resv_id=resv_id):
        return

    else:

        res = f"# Ubuntu has been deployed successfully: your reservation id is: {resv_id} "

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

        res = "# Open your browser at ```{}:7681``` It may take a few minutes.".format(ip_address)
        res = j.tools.jinja2.template_render(text=res, **locals())
        bot.md_show(res)
