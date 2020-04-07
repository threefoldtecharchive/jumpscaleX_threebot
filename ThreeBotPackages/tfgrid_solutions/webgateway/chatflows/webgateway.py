from Jumpscale import j


def chat(bot):
    """
    """
    if not j.tools.threebot.me.default.tid:
        bot.md_show("You need to init your threebot to be able to use this chatflow")
        return

    explorer = j.clients.explorer.default
    bcdb = j.data.bcdb.get('tfgrid_solutions')

    solutions = []
    containers = {}

    for model_name in bcdb.models:
        if not model_name.startswith("tfgrid.solutions"):
            continue
        model = bcdb.models[model_name]
        solutions.extend(model.find())

    for solution in solutions:
        reservation = explorer.reservations.get(solution.rid)
        for container in reservation.data_reservation.containers:
            network = container.network_connection[0]
            workload_id = f"{reservation.id}-{container.workload_id}"

            if not network.public_ip6:
                continue

            for result in reservation.results:
                if result.workload_id == workload_id and result.state.value == 1:
                    break
            else:
                continue
            
            containers[solution.name] = result.data_json["ipv6"]

    if not containers:
        bot.md_show("You don't have any ipv6 containers")
        return
    
    selected = bot.drop_down_choice('Select container', list(containers.keys()))

    name = bot.string_ask("Name")
    port = bot.int_ask("Port")
    ip_address = containers[selected]
    threebot_name = j.tools.threebot.me.default.tname
    signature = j.tools.threebot.me.default.nacl.sign_hex(threebot_name)
    domain = f"{name}.{threebot_name}.testnet.grid.tf"

    explorer.gateway.subdomain_register(
        threebot_name=threebot_name, subdomain=name, ip_address=ip_address, port=port, signature=signature
    )

    message = """
    ### Visit your container on this link
    [http://{0}](http://{0})
    """.format(domain)

    bot.md_show(j.tools.jinja2.template_render(text=j.core.text.strip(message)))
