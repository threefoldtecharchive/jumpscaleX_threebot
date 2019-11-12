from Jumpscale import j


def chat(bot):
    """
    to call http://localhost:5050/chat/session/odoo_deploy
    """

    USER = "odoo"
    HOST_IP = ""  # IP or domain

    bot.loading_show("odoo", 4)

    res = f"""# Odoo has been deployed successfully:
    """
    bot.md_show(res)
    bot.redirect("https://threefold.me")
