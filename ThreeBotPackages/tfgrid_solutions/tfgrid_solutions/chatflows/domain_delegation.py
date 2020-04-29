from Jumpscale import j


def chat(bot):
    """
    """
    user_form_data = {}
    user_info = bot.user_info()
    identity = j.sal.reservation_chatflow.validate_user(user_info)
    domain = bot.string_ask("Please enter a domain name")
    user_form_data["domain"] = domain

    gateway = j.sal.reservation_chatflow.gateway_select(bot)
    gateway_id = gateway.node_id
    user_form_data["gateway"] = gateway_id
    expirationdelta = int(bot.time_delta_ask("Please enter solution expiration time.", default="1d"))
    expiration = j.data.time.epoch + expirationdelta
    user_form_data["expiration"] = expiration

    if gateway.free_to_use:
        currency = "FreeTFT"
    else:
        currency = "TFT"

    reservation = j.sal.zosv2.reservation_create()
    j.sal.zosv2.gateway.delegate_domain(reservation=reservation, node_id=gateway_id, domain=domain)

    resv_id = j.sal.reservation_chatflow.reservation_register_and_pay(
        reservation, expiration, customer_tid=identity.id, currency=currency, bot=bot
    )

    j.sal.reservation_chatflow.reservation_save(
        resv_id, f"tcprouter:{resv_id}", "tfgrid.solutions.flist.1", user_form_data
    )
    res = """\
    # Delegated your domain successfully

    Reservation id: {{reservation.id}}

    Please create an `NS` record in your dns manager for domain: `{{domain}}` pointing to:
    {% for dns in gateway.dns_nameserver -%}
    - {{dns}}
    {% endfor %}
    """
    res = j.tools.jinja2.template_render(text=res, gateway=gateway, domain=domain, reservation=reservation)
    bot.md_show(j.core.text.strip(res))
