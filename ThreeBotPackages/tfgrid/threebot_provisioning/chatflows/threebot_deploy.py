from Jumpscale import j


def chat(bot):
    """
    to call http://localhost:5050/chat/session/threebot_deploy
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
    explorer = j.clients.gedis.get(name="explorer", port=8901, host="explorer.testnet.grid.tf")
    token = j.clients.digitalocean.provisioning.token_
    user_info = bot.user_info()
    name = user_info["username"]
    email = user_info["email"]

    if not name or not email:
        bot.md_show("Username or email not found in session. Please log in properly")

    url = f"https://{name}.3bot.testnet.grid.tf"

    deployer = j.tools.threebot_deploy.get()

    question = "Please enter a description for your 3BOT:"
    description = bot.string_ask(question)
    bot.md_show("Deployment will start this might take several minutes")

    bot.md_show_update(progress.format(0, "Creating 3Bot"))
    try:
        container = deployer.get_by_double_name(name)
    except j.exceptions.NotFound:
        machine = deployer.machines.get_available()
        bot.md_show_update(progress.format(10, "Configuring 3Bot"))
        container = machine.threebot_deploy(name, start=False)

    bot.md_show_update(progress.format(70, "Starting 3Bot"))
    container.threebot_start()

    print("Finished installing threebot")
    print("Start registering threebot")

    bot.md_show_update(progress.format(90, "Registering 3Bot"))
    client = container.threebot_client
    client.actors.registration.register(name, email, description)
    record = explorer.actors.phonebook.get(name=name)
    container.set_identity(record)
    bot.md_show_update(progress.format(100, "Registering 3Bot completed"))

    res = f"""\
# Your 3bot has been registered successfully you can find it here [{url}]({url})
    """
    bot.md_show(res)
