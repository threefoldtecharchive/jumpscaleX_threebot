from Jumpscale import j


def chat(bot):
    """
    to call http://localhost:5050/chat/session/wordpress_deploy
    """

    # all the required data related to the database so they will be static

    bot.loading_show("wordpress", 5)

    # j.builders.apps.wordpress.install(path, host_url, title, admin_user, admin_password, admin_email)

    res = f"""# Wordpress has been deployed successfully:
    """
    bot.md_show(res)
    bot.redirect("https://threefold.me")
