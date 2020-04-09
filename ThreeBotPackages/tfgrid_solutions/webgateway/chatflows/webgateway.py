from Jumpscale import j


def chat(bot):
    """
    """
    if not j.tools.threebot.me.default.tid:
        bot.md_show("You need to init your threebot to be able to use this chatflow")
        return

    explorer = j.clients.explorer.default
    bcdb = j.data.bcdb.get("tfgrid_solutions")
    base_domain = j.core.myenv.config.get("THREEBOT_DOMAIN")
    threebot_name = j.tools.threebot.me.default.tname
    nl_threebot_name = threebot_name.replace(".3bot", "")

    solutions = {}
    containers = {}

    for model_name in bcdb.models:
        if not model_name.startswith("tfgrid.solutions"):
            continue

        solutions[model_name] = bcdb.models[model_name].find()

    for solution_model, items in solutions.items():
        for item in items:
            reservation = explorer.reservations.get(item.rid)
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

                containers[item.name] = {"model": solution_model, "ip_address": result.data_json["ipv6"]}

    if not containers:
        bot.md_show("You don't have any ipv6 containers")
        return

    selected = bot.drop_down_choice("Select container", list(containers.keys()))
    container = containers[selected]

    subdomain = bot.string_ask(f"Subdomain, the url will be (subdomain).{nl_threebot_name}.{base_domain}")
    if container["model"] == "tfgrid.solutions.minio.1":
        port = 9000
    else:
        port = bot.int_ask("Port")

    ip_address = container["ip_address"]
    signature = j.tools.threebot.me.default.nacl.sign_hex(threebot_name)
    explorer.gateway.subdomain_register(
        threebot_name=threebot_name, subdomain=subdomain, ip_address=ip_address, port=port, signature=signature
    )

    message = """
    ### Visit your container via this link
    [http://{0}](http://{0})
    """.format(
        f"{subdomain}.{nl_threebot_name}.{base_domain}"
    )

    bot.md_show(j.tools.jinja2.template_render(text=j.core.text.strip(message)))
