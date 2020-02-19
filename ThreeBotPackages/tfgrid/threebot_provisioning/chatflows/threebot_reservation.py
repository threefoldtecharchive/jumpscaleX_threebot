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

    user = j.sal.zosv2.get_user(name=name, email=email)
    reservation = j.sal.zosv2.new_reservation(user)
    ip = bot.single_choice("choose your ip version", ips)

    ip_address = bot.drop_down_choice("Please choose ip address of the container", j.sal.zosv2.get_all_ips(ip_range))

    if ip == "IPV4":
        node, public_ip = j.sal.zosv2.get_node(4)
    else:
        node, public_ip = j.sal.zosv2.get_node(6)

    reservation, network = j.sal.zosv2.create_network(reservation,ip_range,node.node_id)

    network, network_config = j.sal.zosv2.access_node(network,ip_range,node)

    env = {"corex_password":password,"corex_user":user_corex,"pub_key":pub_key}
    entrypoint = "/usr/bin/zinit init -d"
    flist = "https://hub.grid.tf/bola_nasr_1/threefoldtech-3bot-corex.flist"

    reservation =  j.sal.zosv2.create_container(network.name,ip_address,node.node_id, reservation, flist, env, entrypoint,volume_size=10)

    resv_id = j.sal.zosv2.register(reservation)
    res = """# reservation sent. ID: {}
        """.format(resv_id)
    bot.md_show(res)
    if j.sal.zosv2.reservation_result(resv_id) == []:
        res = """# You have error in reservation , Please Try again
        """
        bot.md_show(res)
        return

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






