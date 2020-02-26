from Jumpscale import j
import  netaddr

def get_all_ips(ip_range):
    networks = netaddr.IPNetwork(ip_range)
    ips = []
    for ip in list(networks.iter_hosts()):
        ips.append(ip.format())
    return ips

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
    env_vars = bot.string_ask("Environment variables comma separated var1=value1, var=value2: ")
    var_list = env_vars.split(",")
    var_dict = {}
    for item in var_list:
        splitted_item = item.split("=")
        if len(splitted_item) == 2:
            var_dict[splitted_item[0]] = splitted_item[1]

    ip_range = bot.string_ask("Please add ip range of the network")

    #create new reservation
    reservation = j.sal.zosv2.reservation_create()
    identity = explorer.actors_all.phonebook.get(name=name, email=email)
    nodes = j.sal.zosv2.nodes_finder.nodes_search()

    ip = bot.single_choice("choose your ip version", ips)

    if ip == "IPV4":
        for node in filter(j.sal.zosv2.nodes_finder.filter_public_ip4, nodes):
            node_selected = node
    else:
        for node in filter(j.sal.zosv2.nodes_finder.filter_public_ip6, nodes):
            node_selected = node

    #Create network of reservation and add peers
    network = j.sal.zosv2.network.create(reservation, ip_range)
    network_range = netaddr.IPNetwork(ip_range).ip
    network_range += 256
    network_node = str(network_range) + "/24"

    avalible_ip = get_all_ips(network_node)
    string_ips = []
    for ip in avalible_ip:
        string_ips.append(ip.format())

    ip_address = bot.drop_down_choice("Please choose ip address of the container", string_ips)

    j.sal.zosv2.network.add_node(network, node_selected.node_id, network_node)
    network_range += 256
    network_node = str(network_range) + "/24"

    wg_quick = j.sal.zosv2.network.add_access(
        network, node_selected.node_id, network_node, ipv4=True
    )
    expiration = j.data.time.epoch + (3600 * 24 * 365)
    # register the reservation
    rid = j.sal.zosv2.reservation_register(reservation, expiration)

    entry_point = "/bin/bash"
    conatiner_flist = f"{HUB_URL}/{version}.flist"
    storage_url ="zdb://hub.grid.tf:9900"

    # create container
    cont = j.sal.zosv2.container.create(reservation=reservation, node_id=node_selected.node_id, network_name=network.name, ip_address=ip_address, flist=conatiner_flist,
                                        storage_url=storage_url, env=var_dict, entrypoint=entry_point)

    expiration = j.data.time.epoch + (3600 * 24 * 365)

    resv_id = j.sal.zosv2.reservation_register(reservation, expiration)

    res = f"# Ubuntu has been deployed successfully: your reservation id is: {resv_id} "

    bot.md_show(res)

    filename = "{}_{}.conf".format(name,resv_id)

    res = """
            # use the next template to configure the wg-quick config of your laptop:
            ### ```wg-quick up /etc/wireguard/{}```
            Click next
            to download your configuration
            """.format(filename)
    res = j.tools.jinja2.template_render(text=j.core.text.strip(res), **locals())
    bot.md_show(res)

    res = j.tools.jinja2.template_render(text=wg_quick, **locals())
    bot.download_file(res, filename)