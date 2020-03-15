from Jumpscale import j
import netaddr


def chat(bot):
    """
    """

    user_info = bot.user_info()
    name = user_info["username"]
    email = user_info["email"]
    ips = ["IPV6", "IPV4"]
    HUB_URL = "https://hub.grid.tf/tf-bootable"
    IMAGES = ["ubuntu:16.04", "ubuntu:18.04"]

    explorer = j.clients.threebot.explorer
    if not email:
        raise j.exceptions.BadRequest("Email shouldn't be empty")

    version = bot.single_choice("Version", IMAGES)
    env_vars = bot.string_ask(
        "Environment variables (optional. Comma-seperated env variables on container startup. For example: var1=value1, var=value2)"
    )
    var_list = env_vars.split(",")
    var_dict = {}
    for item in var_list:
        splitted_item = item.split("=")
        if len(splitted_item) == 2:
            var_dict[splitted_item[0]] = splitted_item[1]

    # create new reservation
    reservation = j.sal.zosv2.reservation_create()
    identity = explorer.actors_all.phonebook.get(name=name, email=email)

    ip_version = bot.single_choice("choose your ip version", ips)
    node_selected = j.sal.chatflow.nodes_get(1, ip_version)[0]

    reservation, config = j.sal.chatflow.network_configure(
        bot, reservation, [node_selected], customer_tid=identity.id, ip_version=ip_version
    )

    ip_address = config["ip_addresses"][0]

    conatiner_flist = f"{HUB_URL}/{version}.flist"
    storage_url = "zdb://hub.grid.tf:9900"

    # create container
    cont = j.sal.zosv2.container.create(
        reservation=reservation,
        node_id=node_selected.node_id,
        network_name=config["name"],
        ip_address=ip_address,
        flist=conatiner_flist,
        storage_url=storage_url,
        env=var_dict,
        interactive=True,
    )

    expiration = j.data.time.epoch + (3600 * 24 * 365)

    resv_id = j.sal.zosv2.reservation_register(reservation, expiration, customer_tid=identity.id)

    res = f"# Ubuntu has been deployed successfully: your reservation id is: {resv_id} "

    bot.md_show(res)

    filename = "{}_{}.conf".format(name, resv_id)

    res = """
            # use the next template to configure the wg-quick config of your laptop:
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

    res = "# Open your browser at ```{}:7681```".format(ip_address)
    res = j.tools.jinja2.template_render(text=res, **locals())
    bot.md_show(res)
