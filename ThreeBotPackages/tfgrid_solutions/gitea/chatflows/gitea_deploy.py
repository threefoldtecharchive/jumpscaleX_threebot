from Jumpscale import j


def chat(bot):
    """
    to call http://localhost:5050/chat/session/gitea_deploy
    """
    # User parameters and env variables preperation to be passed to new container
    APP_NAME = bot.string_ask("Instance title:")
    ADMIN_USER = bot.string_ask("Admin username:")
    ADMIN_PASSWORD = bot.string_ask("Admin user password:")
    ADMIN_EMAIL = bot.string_ask("Admin Email:")
    POSTGRES_DB = "gitea"
    DB_TYPE = "postgres"
    DB_HOST = "localhost:5432"
    DB_USER = "postgres"
    DB_PASSWORD = "postgres"
    ROOT_URL = ""  # IP or domain

    bot.loading_show("gitea", 4)

    # TODO: send reservation, get container, start from flist.

    res = f"""# Gitea has been deployed successfully:
    """
    bot.md_show(res)
    bot.redirect("https://threefold.me")
