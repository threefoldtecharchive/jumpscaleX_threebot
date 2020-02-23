from Jumpscale import j


def chat(bot):
    """
    """

    user_info = bot.user_info()
    name = user_info["username"]
    email = user_info["email"]
    ips = ["IPV6", "IPV4"]

    if not name or not email:
        bot.md_show("Username or email not found in session. Please log in properly")

    pub_key = bot.string_ask("Please add your public ssh-key ")
    user_corex = bot.string_ask("username of your coreX")
    password = bot.secret_ask("password of your coreX")

    ip_range = bot.string_ask("Please add ip range of the network")

    #create new reservation
    user = j.sal.zosv2.get_user(name=name, email=email)
    expiration_provisioning = j.data.time.epoch + (60 * 10)
    expiration_reservation = j.data.time.epoch + (60 * 10)
    reservation = j.sal.zosv2.new_reservation(expiration_provisioning, expiration_reservation)

    ip = bot.single_choice("choose your ip version", ips)

    avalible_ip =  j.sal.zosv2.get_all_ips(ip_range)
    string_ips = []
    for ip in avalible_ip:
        string_ips.append(ip.format())

    ip_address = bot.drop_down_choice("Please choose ip address of the container", string_ips)

    if ip == "IPV4":
        node, public_ip = j.sal.zosv2.get_node(4)
    else:
        node, public_ip = j.sal.zosv2.get_node(6)

    #Create network of reservation and add peers
    reservation, network = j.sal.zosv2.create_network(reservation,ip_range,node.node_id)
    network_resource = j.sal.zosv2.add_network(network,ip_range,node)
    network_config = j.sal.zosv2.add_peer_network(network_resource, ip_range)

    env = {"corex_password":password,"corex_user":user_corex,"pub_key":pub_key}
    entry_point = "/usr/bin/zinit init -d"
    conatiner_flist = "https://hub.grid.tf/bola_nasr_1/threefoldtech-3bot-corex.flist"
    storage_url ="zdb://hub.grid.tf:9900"

    #Add volume and create container schema
    vol1 = j.sal.zosv2.add_volume(reservation, node.node_id,volume_size=10)
    cont = j.sal.zosv2.create_container(network.name,ip_address, ip_range, node.node_id, reservation, conatiner_flist, storage_url,env, entry_point)
    j.sal.zosv2.attach_volume(cont, vol1)

    resv_id = j.sal.zosv2.register(user, reservation)

    res = """# reservation sent. ID: {}
        """.format(resv_id)
    bot.md_show(res)

    filename = "{}_{}.conf".format(name,resv_id)
    result = j.sal.zosv2.wg_config(ip_range,network_config)
    res = """
            # use the next template to configure the wg-quick config of your laptop:
            ### ```wg-quick up /etc/wireguard/{}```
            Click next
            to download your configuration
            """.format(filename)
    res = j.tools.jinja2.template_render(text=j.core.text.strip(res), **locals())
    bot.md_show(res)

    res = j.tools.jinja2.template_render(text=result, **locals())
    bot.download_file(res, filename)






