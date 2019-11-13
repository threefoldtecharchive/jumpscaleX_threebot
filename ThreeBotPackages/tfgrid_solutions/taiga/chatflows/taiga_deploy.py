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
    HOST_IP = ""  # IP or domain

    bot.loading_show("taiga", 4)

    ## Register and deploy container
    bcdb = j.servers.threebot.default.bcdb_get("tf_workloads")
    reservation_model = bcdb.model_get(url="tfgrid.reservation.1")

    ph_bcdb = j.servers.threebot.default.bcdb_get("threebot_phonebook")

    model = ph_bcdb.model_get(url="threebot.phonebook.user.1")
    tbot = model.new()

    tbot.name = bot.user_info.username
    tbot.email = bot.user_info.email
    tbot.pubkey = j.clients.sshkey.default.pubkey  # TODO
    tbot.save()

    # Create container reservation
    reservation = reservation_model.new()
    reservation.customer_tid = tbot.id

    container_model = bcdb.model_get(url="tfgrid.reservation.container.1")
    container = container_model.new()
    container.node_id = "1"
    container.workload_id = 2
    container.flist = "https://hub.grid.tf/hosnys/hossnys-taiga-latest.flist"
    container.hub_url = "https://hub.grid.tf/hosnys/hossnys-taiga-latest.flist.md"
    container.environment = {
        "SECRET_KEY": SECRET_KEY,
        "EMAIL_HOST": email_host,
        "EMAIL_HOST_USER": email_host_user,
        "EMAIL_HOST_PASSWORD": email_host_password,
        "HOST_IP": HOST_IP,
    }

    container.entrypoint = "/bin/bash"
    container.interactive = "yes"  # yes or no
    reservation.data_reservation.containers.append(container)

    # Sign model
    reservation.json = j.data.serializers.json.dumps(reservation.data_reservation._ddict)
    reservation_data = reservation._ddict

    # temp key & signature
    # TODO change to use key of threebot
    signing_key = signing.SigningKey.generate()
    signature = signing_key.sign(reservation.json.encode())
    cl = j.clients.gedis.get(name="threebot")
    cl.actors.workload_manager.sign_customer(reservation.id, binascii.hexlify(signature.signature))

    reservation = cl.actors.workload_manager.reservation_register(reservation_data)

    res = f"""# Taiga has been deployed successfully:
    """

    bot.md_show(res)
    bot.redirect("https://threefold.me")
