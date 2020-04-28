from Jumpscale import j


def chat(bot):
    """
    """
    user_form_data = {}
    user_info = bot.user_info()
    identity = j.sal.reservation_chatflow.validate_user(user_info)
    gateways = {}
    url = "tfgrid.domains.delegate.1"
    model = j.clients.bcdbmodel.get(url=url, name="tfgrid_solutions")
    domain = bot.string_ask("Please enter a domain name")
    user_form_data["domain"] = domain
    gw_ask_list = []
    for g in j.sal.zosv2._explorer.gateway.list():
        gateways[g.node_id] = g
        city = g.location.city if g.location.city else "Unknown"
        country = g.location.country if g.location.country else "Unknown"
        continent = g.location.continent if g.location.continent else "Unkown"
        if g.free_to_use:
            currency = "FreeTFT"
        else:
            currency = "TFT"
        gtext = f"ID: ({g.node_id}) Continent: ({continent}) City: ({city}) Country: ({country}) Currency: ({currency})"
        gw_ask_list.append(gtext)

    gateway = bot.single_choice("Please choose a gateway", list(gw_ask_list))
    gateway_id = gateway.split()[1][1:-1]
    gateway = gateways[gateway_id]
    user_form_data["gateway"] = gateway_id
    expirationdelta = int(bot.time_delta_ask("Please enter solution expiration time.", default="1d"))
    expiration = j.data.time.epoch + expirationdelta
    user_form_data["expiration"] = expiration

    if gateway.free_to_use:
        currency = "FreeTFT"
    else:
        currency = "TFT"

    new_domain = model.new()
    new_domain.gateway = gateways[gateway_id]
    new_domain.domain = domain

    reservation = j.sal.zosv2.reservation_create()
    j.sal.zosv2.gateway.delegate_domain(reservation=reservation, node_id=gateway_id, domain=domain)

    reservation_create = j.sal.reservation_chatflow.reservation_register(
        reservation, expiration, customer_tid=identity.id, currency=currency, bot=bot
    )
    resv_id = reservation_create.reservation_id
    payment = j.sal.reservation_chatflow.payments_show(bot, reservation_create)
    if payment["free"]:
        pass
    elif payment["wallet"]:
        j.sal.zosv2.billing.payout_farmers(payment["wallet"], reservation_create)
        j.sal.reservation_chatflow.payment_wait(bot, resv_id, threebot_app=False)
    else:
        j.sal.reservation_chatflow.payment_wait(
            bot, resv_id, threebot_app=True, reservation_create_resp=reservation_create
        )

    j.sal.reservation_chatflow.reservation_wait(bot, resv_id)

    j.sal.reservation_chatflow.reservation_save(
        resv_id, f"tcprouter:{resv_id}", "tfgrid.solutions.flist.1", user_form_data
    )
    new_domain.save()
    res = """\
    # Delegated your domain successfully

    Reservation id: {{reservation.id}}

    Please create an `NS` record in your dns manager for domain: `{{domain}}` pointing to:
    {% for dns in gateway.dns_nameserver -%}
    - {{dns}}
    {% endfor %}
    """
    res = j.tools.jinja2.template_render(text=res, gateway=gateways[gateway_id], domain=domain, reservation=reservation)
    bot.md_show(j.core.text.strip(res))
