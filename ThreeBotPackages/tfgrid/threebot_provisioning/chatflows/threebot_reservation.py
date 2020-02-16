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
    password = bot.string_ask("password of your coreX")
    ip_range = bot.string_ask("Please add ip range of the network")
    ip_address = bot.string_ask("Please add ip address of the container ")


    client = j.clients.gedis.get("provision",package_name='tfgrid.threebot_provisioning')
    bot.loading_show("progress", 20)
    result = client.actors.provisioning.generate_schema_container(name=name,email=email,pub_key=pub_key, user_corex=user_corex,password_corex=password,ip_range=ip_range,ip_address=ip_address)
    res = j.tools.jinja2.template_render(text=j.core.text.strip(result.decode()), **locals())
    bot.md_show(res)








