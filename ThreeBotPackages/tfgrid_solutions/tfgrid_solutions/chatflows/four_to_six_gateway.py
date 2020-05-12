from Jumpscale import j


def chat(bot):
    """
    """
    user_form_data = {}
    user_info = bot.user_info()
    j.sal.reservation_chatflow.validate_user(user_info)

    gateway = j.sal.reservation_chatflow.gateway_select(bot)
    gateway_id = gateway.node_id
    user_form_data["gateway"] = gateway_id
    expiration = bot.datetime_picker(
        "Please enter solution expiration time.",
        required=True,
        min_time=[3600, "Date/time should be at least 1 hour from now"],
        default=j.data.time.epoch + 3900,
    )
    user_form_data["expiration"] = j.data.time.secondsToHRDelta(expiration - j.data.time.epoch)
    publickey = bot.string_ask(
        "Please enter wireguard public key or leave empty if you want us to generate one for you."
    )
    privatekey = "enter private key here"
    if not publickey:
        privatekey, publickey = j.tools.wireguard.generate_key_pair()

    if gateway.free_to_use:
        currency = "FreeTFT"
    else:
        currency = "TFT"

    reservation = j.sal.zosv2.reservation_create()
    j.sal.zosv2.gateway.gateway_4to6(reservation=reservation, node_id=gateway_id, public_key=publickey)

    resv_id = j.sal.reservation_chatflow.reservation_register_and_pay(
        reservation, expiration, customer_tid=j.me.tid, currency=currency, bot=bot
    )
    reservation_result = j.sal.reservation_chatflow.reservation_wait(bot, resv_id)

    res = """
            # Use the following template to configure your wireguard connection. This will give you access to your network.
            ## Make sure you have <a target="_blank" href="https://www.wireguard.com/install/">wireguard</a> installed
            Click next
            to download your configuration
            """
    bot.md_show(j.core.text.strip(res))

    cfg = reservation_result[0].data_json
    wgconfigtemplate = """\
    [Interface]
    Address = {{cfg.ips[0]}}
    PrivateKey = {{privatekey}}
    {% for peer in cfg.peers %}
    [Peer]
    PublicKey = {{peer.public_key}}
    AllowedIPs = {{",".join(peer.allowed_ips)}}
    {% if peer.endpoint -%}
    Endpoint = {{peer.endpoint}}
    {% endif %}
    {% endfor %}
    """
    config = j.tools.jinja2.template_render(text=wgconfigtemplate, cfg=cfg, privatekey=privatekey.decode())
    config = j.core.text.strip(config)

    filename = "wg-{}.conf".format(resv_id)
    bot.download_file(config, filename)
    res = """
            # In order to connect to the 4 to 6 gateway execute this command:
            ## ```wg-quick up ./{}```
            """.format(
        filename
    )

    bot.md_show(j.core.text.strip(res))
