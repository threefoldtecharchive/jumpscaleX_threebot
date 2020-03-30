from Jumpscale import j
import binascii
from nacl import signing


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
    HOST_IP = bot.string_ask("Host to access taiga on:")  # IP or domain

    bot.loading_show("taiga", 4)

    environment = {
        "SECRET_KEY": SECRET_KEY,
        "EMAIL_HOST": email_host,
        "EMAIL_HOST_USER": email_host_user,
        "EMAIL_HOST_PASSWORD": email_host_password,
        "HOST_IP": HOST_IP,
    }

    # Create and register new reservation with container information(credentials will be obtained from threebot.me)
    reservation = j.tools.threebot.explorer.container_create(
        flist="hossnys-taiga-latest.flist",
        hub_url="https://hub.grid.tf/hosnys",
        environment=environment,
        entrypoint="/bin/bash",
    )

    # bot.md_show(reservation)

    res = f"""# Taiga has been deployed successfully:
    """
    bot.md_show(res)
    bot.redirect("https://threefold.me")


# from Jumpscale import j
# import binascii
# from nacl import signing
#
#
# def chat(bot):
#     """
# <<<<<<< HEAD
#     to call http://localhost:5050/chat/session/taiga_deploy
#     """
#     # User parameters and env variables preperation to be passed to new container
#     USER = "taiga"
#     PORT = "4321"
#     SECRET_KEY = "taiga"
#     email_host = bot.string_ask("Email host:")
#     email_host_user = bot.string_ask("Email host user:")
#     email_host_password = bot.string_ask("Email host password:")
#     HOST_IP = bot.string_ask("Host to access taiga on:")  # IP or domain
#
#     bot.loading_show("taiga", 4)
#
#     environment = {
#         "SECRET_KEY": SECRET_KEY,
#         "EMAIL_HOST": email_host,
#         "EMAIL_HOST_USER": email_host_user,
#         "EMAIL_HOST_PASSWORD": email_host_password,
#         "HOST_IP": HOST_IP,
#     }
#
#     # Create and register new reservation with container information(credentials will be obtained from threebot.me)
#     reservation = j.tools.threebot.explorer.container_create(
#         flist="hossnys-taiga-latest.flist",
#         hub_url="https://hub.grid.tf/hosnys",
#         environment=environment,
#         entrypoint="/bin/bash",
#     )
# =======
#     to call http://HOST:4321/chat/session/taiga_deploy
#     """
#     host = bot.string_ask("Host IP:")
#     rabbitmq_password = bot.string_ask("Password:")
#     email_host = bot.string_ask("Email host:")
#     email_host_user = bot.string_ask("Email host user:")
#     email_host_password = bot.string_ask("Email host password:")
#
#     res = f"""
#     # Taiga has been deployed successfully:
#     """
# >>>>>>> development
#
#     # bot.md_show(reservation)
#
#     res = f"""# Taiga has been deployed successfully:
#     """
#     bot.md_show(res)
#     bot.redirect("https://threefold.me")
