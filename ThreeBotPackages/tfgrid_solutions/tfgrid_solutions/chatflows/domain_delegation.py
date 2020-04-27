from Jumpscale import j

def chat(bot):
    """
    """
    gateways = {}
    url = "tfgrid.domains.delegate.1"
    model = j.clients.bcdbmodel.get(url=url, name="tfgrid_solutions")
    domain = bot.string_ask("Please enter a domain name")
    gw_ask_list = []
    for g in j.sal.zosv2._explorer.gateway.list():
        gateways[g.node_id] = g
        city = g.location.city if g.location.city else "Unknown"
        country = g.location.country if g.location.country else "Unknown"
        continent = g.location.continent if g.location.continent else "Unkown"
        gw_ask_list.append(f"id: {g.node_id} Continent: {continent} City: {city} Country: {country}")

    gateway = bot.single_choice(
        "Please choose a gateway", list(gw_ask_list)
    )
    gateway_id = gateway.split()[1]

    new_domain = model.new()
    new_domain.gateway = gateways[gateway_id]
    new_domain.domain = domain

    reservation = j.sal.zosv2.reservation_create()
    j.sal.zosv2.gateway.delegate_domain(reservation=reservation, node_id=gateway_id, domain=domain)
    new_domain.save()
    res = f"""
    # Please create an NS Recored in your dns manager for domain: {domain} nameserver: {gateways[gateway_id].dns_nameserver}
    """
    bot.md_show(res)
