from Jumpscale import j
from Jumpscale.servers.gedis.GedisChatBot import StopChatFlow
import time


def chat(bot):
    """
    """
    user_form_data = {}
    user_info = bot.user_info()

    j.sal.reservation_chatflow.validate_user(user_info)
    user_form_data["chatflow"] = "network"
    network_name = bot.string_ask("Please enter a network name")
    user_form_data["Currency"] = bot.single_choice(
        "Please choose a currency that will be used for the payment", ["FreeTFT", "TFT"]
    )
    if not user_form_data["Currency"]:
        user_form_data["Currency"] = "TFT"

    expiration = bot.datetime_picker("Please enter network expiration time.")
    user_form_data["Solution expiration"] = j.data.time.secondsToHRDelta(expiration - j.data.time.epoch)

    ips = ["IPv6", "IPv4"]
    ipversion = bot.single_choice(
        "How would you like to connect to your network? IPv4 or IPv6? If unsure, choose IPv4", ips
    )

    # create new reservation
    reservation = j.sal.zosv2.reservation_create()
    ip_range = j.sal.reservation_chatflow.ip_range_get(bot)
    res = j.sal.reservation_chatflow.solution_model_get(network_name, "tfgrid.solutions.network.1", user_form_data)

    reservation = j.sal.reservation_chatflow.reservation_metadata_add(reservation, res)
    # Check if reservation failed
    while True:
        config = j.sal.reservation_chatflow.network_create(
            network_name,
            reservation,
            ip_range,
            j.me.tid,
            ipversion,
            expiration=expiration,
            currency=user_form_data["Currency"],
            bot=bot,
        )
        try:
            j.sal.reservation_chatflow.reservation_register_and_pay(config["reservation_create"], bot)
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
            ## Make sure you have <a target="_blank" href="https://www.wireguard.com/install/">wireguard</a> installed
            Click next
            to download your configuration
            """
    bot.md_show(j.core.text.strip(res))

    filename = "wg-{}.conf".format(config["rid"])
    bot.download_file(config["wg"], filename)

    res = """
            # In order to have the network active and accessible from your local/container machine. To do this, execute this command:
            ## ```wg-quick up /etc/wireguard/{}```
            Click next
            """.format(
        filename
    )

    bot.md_show(j.core.text.strip(res))
