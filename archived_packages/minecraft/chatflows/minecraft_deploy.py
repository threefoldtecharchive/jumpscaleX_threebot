from Jumpscale import j


def chat(bot):
    """
    to call http://localhost:5050/chat/session/minecraft_deploy
    """
    # all the required data related to the database so they will be static

    bot.loading_show("minecraft", 5)

    # Create and register new reservation with container information(credentials will be obtained from threebot.me)
    reservation = j.tools.threebot.explorer.container_create(
        flist="itzg-minecraft-server-latest.flist",
        hub_url="https://hub.grid.tf/zaibon",
        environment={"EULA": "TRUE"},
        entrypoint="/bin/bash",
    )

    res = f"""# Minecraft has been deployed successfully:
    """
    bot.md_show(res)
    bot.redirect("https://threefold.me")
