from Jumpscale import j


def chat(bot):
    """
    to call http://localhost:5050/chat/session/taiga_deploy
    """
    # User parameters and env variables preperation to be passed to new container
    USER = "taiga"
    PORT = "4321"
    SECRET_KEY = "taiga"
    email_host = bot.string_ask("Email host:")
    email_host_user = bot.string_ask("Email host user:")
    email_host_password = bot.string_ask("Email host password:")
    HOST_IP = ""  # IP or domain

    bot.loading_show("taiga", 4)

    res = f"""# Taiga has been deployed successfully:
    """

    bot.md_show(res)
    bot.redirect("https://threefold.me")
