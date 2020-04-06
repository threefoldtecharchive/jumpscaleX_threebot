from Jumpscale import j


def chat(bot):
    """
    """
    if not j.tools.threebot.me.default.tid:
        bot.md_show("You need to init your threebot to be able to use this chatflow")
        return

    containers_data = {}
    explorer = j.clients.explorer.default
    reservations = explorer.reservations.list(customer_tid=j.tools.threebot.me.default.tid, next_action="DEPLOY")

    for reservation in reservations:
        containers = reservation.data_reservation.containers
        for container in containers:
            container_id = f"{reservation.id}-{container.workload_id}"
            network = container.network_connection[0]
            if not network.public_ip6:
                continue

            for result in reservation.results:
                if result.workload_id == container_id and result.state.value == 1:
                    break
            else:
                continue
            
            name = "Container"
            if "ubuntu" in container.flist:
                name = "Ubuntu container"
            elif "minio" in container.flist:
                name = "Minio container"

            containers_data[container_id] = {
                "name": f"{name} {container_id}",
                "ipv6": result.data_json["ipv6"]
            }

    selected = bot.drop_down_choice('Select container', [c["name"] for c in containers_data.values()])
    container = containers_data[selected.split()[-1]]

    name = bot.string_ask("Name")
    port = bot.int_ask("Port")
    ip_address = container['ipv6']
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
