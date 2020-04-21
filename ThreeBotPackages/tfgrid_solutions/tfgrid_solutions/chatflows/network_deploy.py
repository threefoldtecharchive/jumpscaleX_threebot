from Jumpscale import j
from Jumpscale.servers.gedis.GedisChatBot import StopChatFlow
import time


def chat(bot):
    """
    """
    user_form_data = {}
    user_info = bot.user_info()

    identity = j.sal.reservation_chatflow.validate_user(user_info)
    network_name = bot.string_ask("Please enter a network name")
    expirationdelta = int(bot.time_delta_ask("Please enter network expiration time.", default="1d"))
    user_form_data["Solution expiration"] = j.data.time.secondsToHRDelta(expirationdelta)
    expiration = j.data.time.epoch + expirationdelta
    ips = ["IPv6", "IPv4"]
    ipversion = bot.single_choice(
        "How would you like to connect to your network? IPv4 or IPv6? If unsure, choose IPv4", ips
    )

    # create new reservation
    reservation = j.sal.zosv2.reservation_create()
    ip_range = j.sal.reservation_chatflow.ip_range_get(bot)

    # Check if reservation failed
    while True:
        config = j.sal.reservation_chatflow.network_create(
            network_name, reservation, ip_range, identity.id, ipversion, expiration=expiration
        )
        try:
            j.sal.reservation_chatflow.reservation_wait(bot, config["rid"])
            break
        except StopChatFlow as e:
            if "wireguard listen port already in use" in e.msg:
                j.sal.zosv2.reservation_cancel(config["rid"])
                time.sleep(5)
                continue
            raise

    j.sal.reservation_chatflow.reservation_save(
        config["rid"], network_name, "tfgrid.solutions.network.1", user_form_data
    )

    # inform user howto connect
    res = """
            # Use the following template to configure your wireguard connection. This will give you access to your network.
            ## Make sure you have <a href="https://www.wireguard.com/install/">wireguard</a> installed
            Click next
            to download your configuration
            """
    bot.md_show(j.core.text.strip(res))

    filename = "{}_{}.conf".format(identity.name.split(".3bot")[0], config["rid"])
    bot.download_file(config["wg"], filename)

    res = """
            # In order to have the network active and accessible from your local machine. To do this, execute this command:
            ## ```wg-quick up /etc/wireguard/{}```
            Click next
            """.format(
        filename
    )

    bot.md_show(j.core.text.strip(res))
