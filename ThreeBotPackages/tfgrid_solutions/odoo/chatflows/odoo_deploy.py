from Jumpscale import j


def chat(bot):
    """
    to call http://localhost:5050/chat/session/odoo_deploy
    """

    USER = "odoo"
    HOST_IP = ""  # IP or domain

    bot.loading_show("odoo", 4)

    # Create and register new reservation with container information(credentials will be obtained from threebot.me)
    reservation = j.tools.threebot.explorer.container_create(
        flist="bishoyabdo-odoo-latest.flist",
        hub_url="https://hub.grid.tf/mikhaieb",
        environment={},
        entrypoint="/bin/bash",
    )

    res = f"""# Odoo has been deployed successfully:
    """
    bot.md_show(res)
    bot.redirect("https://threefold.me")
