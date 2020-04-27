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
    user_form_data["Currency"] = bot.single_choice(
        "Please choose a currency that will be used for the payment", ["FreeTFT", "TFT"]
    )
    if not user_form_data["Currency"]:
        user_form_data["Currency"] = "TFT"
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
            network_name,
            reservation,
            ip_range,
            identity.id,
            ipversion,
            expiration=expiration,
            currency=user_form_data["Currency"],
            bot=bot,
        )
        wallet = j.sal.reservation_chatflow.payments_show(bot, config["reservation_create"])
        if wallet:
            j.sal.zosv2.billing.payout_farmers(wallet, config["reservation_create"])
            j.sal.reservation_chatflow.payment_wait(bot, config["rid"], threebot_app=False)
        else:
            j.sal.reservation_chatflow.payment_wait(
                bot, config["rid"], threebot_app=True, reservation_create_resp=config["reservation_create"]
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
