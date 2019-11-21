from Jumpscale import j


def chat(bot):
    """
    to call http://HOST:4321/chat/session/taiga_deploy
    """
    host = bot.string_ask("Host IP:")
    rabbitmq_password = bot.string_ask("Password:")
    email_host = bot.string_ask("Email host:")
    email_host_user = bot.string_ask("Email host user:")
    email_host_password = bot.string_ask("Email host password:")

    res = f"""
    # Taiga has been deployed successfully:
    """

    bot.md_show(res)
    bot.redirect("https://threefold.me")
