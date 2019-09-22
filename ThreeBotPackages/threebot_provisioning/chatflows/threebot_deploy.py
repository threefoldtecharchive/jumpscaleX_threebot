from Jumpscale import j


def chat(bot):
    """
    to call http://localhost:5050/chat/session/threebot_deploy
    """
    name = bot.string_ask("Please enter your 3BOT name:")
    do_token = bot.string_ask("Please enter your DigitalOcean Token:")
    do_project_name = bot.string_ask("Please enter your DigitalOcean project name:")
    ssh_key = bot.string_ask(
        "Please enter your DigitalOcean sshkey name:\nThis is the last step please be patient it will take some time"
    )

    threebot_machine = j.tools.threebot_deploy.get(
        name, do_machine_name=f"threebot-{name}", do_token=do_token, do_project_name=do_project_name, ssh_key=ssh_key
    )
    if not threebot_machine.exists():
        threebot_machine.create_new_do_machine()
    threebot_machine.machine_init()
    threebot_machine.jsx_install()
    threebot_machine.threebot_start()

    res = f"""
    # Your 3bot has been deployed successfully: 
    your threebot ip is: {threebot_machine.ip_address}
    """
    bot.md_show(res)
    bot.redirect("https://threefold.me")
