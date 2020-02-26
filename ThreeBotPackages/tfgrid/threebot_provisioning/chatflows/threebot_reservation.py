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
    choose = ["New","Restore"]
    explorer = j.clients.threebot.explorer

    if not name or not email:
        bot.md_show("Username or email not found in session. Please log in properly")
    user_choice = bot.single_choice("you want new container or restore previous one ?", choose)
    if user_choice == "Restore":
        res = "# This Feature still in progress"
        res = j.tools.jinja2.template_render(text=res, **locals())
        bot.md_show(res)

    else:
        pub_key = bot.string_ask("Please add your public ssh-key ")
        user_corex = bot.string_ask("username of your coreX")
        password = bot.secret_ask("password of your coreX")

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

        env = {"corex_password":password,"corex_user":user_corex,"pub_key":pub_key}
        entry_point = "/usr/bin/zinit init -d"
        conatiner_flist = "https://hub.grid.tf/bola_nasr_1/threefoldtech-3bot-corex.flist"
        storage_url ="zdb://hub.grid.tf:9900"

        #Add volume and create container schema
        vol = j.sal.zosv2.volume.create(reservation, node_selected.node_id,volume_size=10)
        # create container
        cont = j.sal.zosv2.container.create(reservation=reservation, node_id=node_selected.node_id, network_name=network.name, ip_address=ip_address, flist=conatiner_flist,
                                            storage_url=storage_url, env=env, entrypoint=entry_point)
        j.sal.zosv2.volume.attach(reservation, cont, vol, "/sandbox/var")

        expiration = j.data.time.epoch + (3600 * 24 * 365)

        resv_id = j.sal.zosv2.reservation_register(reservation, expiration)

        res = """# reservation sent. ID: {}
            """.format(resv_id)
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

        res = "# Open your browser at ```{}:1500```".format(ip_address)
        res = j.tools.jinja2.template_render(text=j.core.text.strip(res), **locals())
        bot.md_show(res)





