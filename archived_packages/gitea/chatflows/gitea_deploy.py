from Jumpscale import j

import netaddr


def get_all_ips(ip_range):
    networks = netaddr.IPNetwork(ip_range)
    ips = []
    for ip in list(networks.iter_hosts()):
        ips.append(ip.format())
    return ips


def chat(bot):
    """
    to call http://localhost:5050/chat/session/gitea_deploy
    """
    # User parameters and env variables preperation to be passed to new container
    APP_NAME = bot.string_ask("Instance title:")
    ADMIN_USER = bot.string_ask("Admin username:")
    ADMIN_PASSWORD = bot.string_ask("Admin user password:")
    ADMIN_EMAIL = bot.string_ask("Admin Email:")
    POSTGRES_DB = "gitea"
    DB_TYPE = "postgres"
    DB_HOST = "localhost:5432"
    DB_USER = "postgres"
    DB_PASSWORD = "postgres"
    ROOT_URL = ""  # IP or domain

    bot.loading_show("gitea", 4)

    environment = {
        "APP_NAME": APP_NAME,
        "ADMIN_USER": ADMIN_USER,
        "ADMIN_PASSWORD": ADMIN_PASSWORD,
        "ADMIN_EMAIL": ADMIN_EMAIL,
        "POSTGRES_DB": POSTGRES_DB,
        "DB_TYPE": DB_TYPE,
        "DB_HOST": DB_HOST,
        "DB_USER": DB_USER,
        "DB_PASSWORD": DB_PASSWORD,
        "ROOT_URL": ROOT_URL,
    }

    # Create and register new reservation with container information(credentials will be obtained from threebot.me)
    # reservation = j.tools.threebot.explorer.container_create(
    #     flist="gitea.flist", hub_url="https://hub.grid.tf/nashaatp", environment=environment, entrypoint="/bin/bash"
    # )

    # res = f"""# Gitea has been deployed successfully:
    # """
    # bot.md_show(res)
    # bot.redirect("https://threefold.me")

    # Reservation
    user_info = bot.user_info()
    name = user_info["username"]
    email = user_info["email"]
    ips = ["IPV6", "IPV4"]
    HUB_URL = "https://hub.grid.tf/nashaatp/gitea.flist.md"
    entry_point = "/bin/bash"
    explorer = j.clients.threebot.explorer
    if not email:
        raise j.exceptions.Value("Email shouldn't be empty")

    ip_range = bot.string_ask("Please add ip range of the network")

    # Get reservation object to be configured
    reservation = j.sal.zosv2.reservation_create()
    identity = explorer.actors_all.phonebook.get(name=name, email=email)
    nodes = j.sal.zosv2.nodes_finder.nodes_search()
    # Get Ip from user either ipv4 or ipv6
    ip = bot.single_choice("choose your ip version", ips)

    if ip == "IPV4":
        for node in filter(j.sal.zosv2.nodes_finder.filter_public_ip4, nodes):
            node_selected = node
    else:
        for node in filter(j.sal.zosv2.nodes_finder.filter_public_ip6, nodes):
            node_selected = node

    # Create network of reservation and add peers
    network = j.sal.zosv2.network.create(reservation, ip_range)
    network_range = netaddr.IPNetwork(ip_range).ip
    network_range += 256
    network_node = str(network_range) + "/24"

    # Get availabe IPs to allow the user to choose the container IP
    avalible_ip = get_all_ips(network_node)
    string_ips = []
    for ip in avalible_ip:
        string_ips.append(ip.format())

    ip_address = bot.drop_down_choice("Please choose ip address of the container", string_ips)

    j.sal.zosv2.network.add_node(network, node_selected.node_id, network_node)
    network_range += 256
    network_node = str(network_range) + "/24"

    # Wireguard configuration
    wg_quick = j.sal.zosv2.network.add_access(network, node_selected.node_id, network_node, ipv4=True)
    expiration = j.data.time.epoch + (3600 * 24 * 365)
    # register the reservation
    rid = j.sal.chatflow.reservation_register(reservation, expiration)

    # TODO:change the entry point and this configuration

    # create container
    cont = j.sal.zosv2.container.create(
        reservation=reservation,
        node_id=node_selected.node_id,
        network_name=network.name,
        ip_address=ip_address,
        flist=HUB_URL,
        env=environment,
        entrypoint=entry_point,
    )

    expiration = j.data.time.epoch + (3600 * 24 * 365)
    resv_id = j.sal.chatflow.reservation_register(reservation, expiration)

    res = f"# Gitea has been deployed successfully: your reservation id is: {resv_id} "

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

    res = j.tools.jinja2.template_render(text=wg_quick, **locals())
    bot.download_file(res, filename)
