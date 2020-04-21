from Jumpscale import j


def chat(bot):
    """
    """
    if not j.me.tid:
        bot.md_show("You need to init your threebot to be able to use this chatflow")
        return

    explorer = j.clients.explorer.default
    bcdb = j.data.bcdb.get("tfgrid_solutions")
    base_domain = j.core.myenv.config.get("THREEBOT_DOMAIN")
    threebot_name = j.me.tname
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

    def get_port():
        if container["model"] == "tfgrid.solutions.minio.1":
            return 9000
        return bot.int_ask("Port")

    choices = [f"Use subdomain of {base_domain}", "Use my own domain"]
    response = bot.single_choice("Which domain would you like to use?", choices)
    domain = subdomain = ""
    ip_address = container["ip_address"]
    if choices.index(response) == 1:
        domain = bot.string_ask(
            f"Enter the domain you would like to use. You need to create a `cname` record to `{base_domain}` for this to work"
        )
        port = get_port()
        explorer.gateway.tcpservice_ip_register(domain, ip_address, port)
    else:
        subdomain = bot.string_ask(f"Subdomain, the url will be (subdomain).{nl_threebot_name}.{base_domain}")
        port = get_port()
        signature = j.me.encryptor.sign_hex(threebot_name)
        explorer.gateway.subdomain_register(
            threebot_name=threebot_name, subdomain=subdomain, ip_address=ip_address, port=port, signature=signature
        )
        domain = f"{subdomain}.{nl_threebot_name}.{base_domain}"

    message = f"""
    ### Visit your container via this link
    [http://{domain}](http://{domain})
    """

    bot.md_show(j.core.text.strip(message))
