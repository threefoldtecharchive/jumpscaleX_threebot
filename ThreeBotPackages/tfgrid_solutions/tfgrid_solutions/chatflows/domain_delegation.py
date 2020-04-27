from Jumpscale import j

def chat(bot):
    """
    """
    gateways = {g.node_id: g for g in j.sal.zosv2._explorer.gateway.list()}

    # if not gateways stop
    domain = bot.string_ask("Please enter a domain name")
    gateway_id = bot.single_choice(
        "Please choose a gateway", list(gateways.keys())
    )
    reservation = j.sal.zosv2.reservation_create()
    j.sal.zosv2.gateway.delegate_domain(reservation=reservation, node_id=gateway_id, domain=domain)
    res = f"""
    # Use These name servers as your dns to connect to your domain: {gateways[gateway_id].dns_nameserver}
    """
    bot.md_show(res)
