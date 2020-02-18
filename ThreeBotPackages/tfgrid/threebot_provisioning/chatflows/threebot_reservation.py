from Jumpscale import j


def chat(bot):
    """
    """

    user_info = bot.user_info()
    name = user_info["username"]
    email = user_info["email"]


    if not name or not email:
        bot.md_show("Username or email not found in session. Please log in properly")

    pub_key = bot.string_ask("Please add your public ssh-key ")
    user_corex = bot.string_ask("username of your coreX")
    password = bot.secret_ask("password of your coreX")

    ip_range = bot.string_ask("Please add ip range of the network")

    ip_address = bot.string_ask("Please add ip address of the container ")

    while not j.sal.zosv2.check_ip_in_network(ip_address,ip_range):

        ip_address = bot.string_ask("Please add ip address of the container ")

    filename = bot.string_ask("write name of wireguard configuration with (.conf) ")

    resp, result = j.sal.zosv2.reservation(name=name,email=email,pub_key=pub_key, user_corex=user_corex,password_corex=password,ip_range=ip_range,ip_address=ip_address)

    res = """
            # reservation sent. ID: {}"
        """.format(resp)
    bot.md_show(res)
    res = """
    
            # use the next template to configure the wg-quick config of your laptop:
            ## wg-quick up /etc/wireguard/{}
            ### Click next
            to download your configuration
            """.format(filename)
    res = j.tools.jinja2.template_render(text=j.core.text.strip(res), **locals())
    bot.md_show(res)

    res = j.tools.jinja2.template_render(text=result, **locals())
    bot.download_file(res, filename)








