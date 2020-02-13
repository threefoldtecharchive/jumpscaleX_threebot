from Jumpscale import j


def chat(bot):
    """
    """

    progress = """\
    # Deploying your 3Bot
    {1}
     <div class="progress">
      <div class="progress-bar active" role="progressbar" aria-valuenow="{0}"
      aria-valuemin="0" aria-valuemax="100" style="width:{0}%">
        {0}%
      </div>
    </div>
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


    client = j.clients.gedis.get("provision",package_name='tfgrid.threebot_provisioning')
    bot.loading_show("progress", 20)
    resp = client.actors.provisioning.generate_schema_container(name=name,email=email,pub_key=pub_key, user_corex=user_corex,password_corex=password,ip_range=ip_range,ip_address=ip_address)

    bot.md_show_update(progress.format(50, "reservation sent. ID: %s" % resp))
    bot.md_show_update(progress.format(50, "use this template to configure the wg-quick config of your laptop:"))








