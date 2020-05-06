from Jumpscale import j


def chat(bot):
    """
    """
    user_form_data = {}
    user_info = bot.user_info()
    j.sal.reservation_chatflow.validate_user(user_info)
    form = bot.new_form()
    domain = form.string_ask("Please enter a domain name to delegate")
    gateways = j.sal.reservation_chatflow.gateway_list(bot)
    if not gateways:
        return bot.stop("No available gateway")
    options = sorted(list(gateways.keys()))
    gateway_choice = form.drop_down_choice("Please choose a gateway", options, allow_empty=False)
    form.ask(allow_empty=False)
    user_form_data["domain"] = domain.value

    gateway = gateways[gateway_choice.value]
    gateway_id = gateway.node_id
    user_form_data["gateway"] = gateway_id
    expiration = bot.datetime_picker("Please enter solution expiration time.")
    user_form_data["expiration"] = j.data.time.secondsToHRDelta(expiration - j.data.time.epoch)

    if gateway.free_to_use:
        currency = "FreeTFT"
    else:
        currency = "TFT"

    reservation = j.sal.zosv2.reservation_create()
    j.sal.zosv2.gateway.delegate_domain(reservation=reservation, node_id=gateway_id, domain=domain.value)

    resv_id = j.sal.reservation_chatflow.reservation_register_and_pay(
        reservation, expiration, customer_tid=j.me.tid, currency=currency, bot=bot
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
    res = j.tools.jinja2.template_render(text=res, gateway=gateway, domain=domain.value, reservation=reservation)
    bot.md_show(j.core.text.strip(res))
