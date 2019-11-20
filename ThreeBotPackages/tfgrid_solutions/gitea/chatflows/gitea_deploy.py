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

    environment = {
        "APP_NAME": APP_NAME,
        "ADMIN_USER": ADMIN_USER,
        "ADMIN_PASSWORD": ADMIN_PASSWORD,
        "ADMIN_EMAIL": ADMIN_EMAIL,
        "POSTGRES_DB": POSTGRES_DB,
        "DB_TYPE": DB_TYPE,
        "DB_HOST": DB_HOST,
        "DB_USER": DB_USER,
        "DB_PASSWORD": DB_PASSWORD,
        "ROOT_URL": ROOT_URL,
    }

    # Create and register new reservation with container information(credentials will be obtained from threebot.me)
    reservation = j.tools.threebot.explorer.container_create(
        flist="gitea.flist", hub_url="https://hub.grid.tf/nashaatp", environment=environment, entrypoint="/bin/bash"
    )

    res = f"""# Gitea has been deployed successfully:
    """
    bot.md_show(res)
    bot.redirect("https://threefold.me")
