from Jumpscale import j


def chat(bot):
    admin_user = bot.string_ask("Admin user:")
    admin_password = bot.string_ask("Admin password:")
    admin_email = bot.string_ask("Admin Email:")

    # TODO: send reservation, get container, start from flist.

    res = f"""
    # Gitea has been deployed successfully: 
    """
    bot.md_show(res)
    bot.redirect("https://threefold.me")
