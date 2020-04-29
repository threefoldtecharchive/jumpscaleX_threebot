from Jumpscale import j

kinds = {
    "minio": "tfgrid.solutions.minio.1",
    "kubernetes": "tfgrid.solutions.kubernetes.1",
    "ubuntu": "tfgrid.solutions.ubuntu.1",
    "flist": "tfgrid.solutions.flist.1",
}

domain_types = {
    "delegate": "tfgrid.workloads.reservation.gateway.delegate.1",
    "sub": "tfgrid.workloads.reservation.gateway.subdomain.1",
}

ports = {"minio": 9000, "kubernetes": 8443}  # TODO: Check this port


def chat(bot):
    user_form_data = {}
    user_info = bot.user_info()
    reservation = j.sal.zosv2.reservation_create()
    j.sal.reservation_chatflow.validate_user(user_info)
    kind = bot.single_choice("Please choose the solution type", list(kinds.keys()))
    user_form_data["kind"] = kind

    url = kinds[kind]
    solutions = j.sal.reservation_chatflow.solutions_get(url)

    sols = {sol["name"]: sol for sol in solutions}
    solution_name = bot.single_choice("Please choose the solution to expose", list(sols.keys()))
    solution = sols[solution_name]
    user_form_data["solution_name"] = solution_name

    expirationdelta = int(bot.time_delta_ask("Please enter solution expiration time.", default="1d"))
    expiration = j.data.time.epoch + expirationdelta
    user_form_data["expiration"] = expiration
    reservation_data = j.data.serializers.json.loads(solution["reservation"])["data_reservation"]

    gateways = {g.node_id: g for g in j.sal.zosv2._explorer.gateway.list()}

    domain_type = bot.single_choice("Which type of domain you wish to bind to", ["sub", "delegate"])
    if domain_type == "sub":
        base_domain = f"{j.me.tname.replace('3bot', '')}{j.core.myenv.config.get('THREEBOT_DOMAIN')}"
        domain = bot.string_ask(
            f"Please specify the sub domain name you wish to bind to will be (subdomain).{base_domain}"
        )
        domain = domain + "." + base_domain
        gateway_id = bot.single_choice("Please choose a gateway", list(gateways.keys()))
        gateway = gateways[gateway_id]
    elif domain_type == "delegate":
        url = "tfgrid.domains.delegate.1"
        model = j.clients.bcdbmodel.get(url=url, name="tfgrid_solutions")
        domains = model.find()
        domains_dict = {d.domain: d for d in domains}
        domain = bot.single_choice("Please choose the domain you wish to bind", list(domains_dict.keys()))
        domain_obj = domains_dict[domain]
        gateway = domain_obj.gateway
        gateway_id = gateway.node_id

    # create a container with tcprouter flist
    currency = reservation_data["currencies"][0]
    query = {"mru": 1, "cru": 1, "currency": currency, "free_to_use": gateway.free_to_use}

    node_selected = j.sal.reservation_chatflow.nodes_get(1, **query)[0]
    network_name = reservation_data["containers"][0]["network_connection"][0]["network_id"]
    container_address = reservation_data["containers"][0]["network_connection"][0]["ipaddress"]

    network = j.sal.reservation_chatflow.network_get(bot, j.me.tid, network_name)
    network.add_node(node_selected)
    network.update(j.me.tid, currency=currency)
    ip_address = network.ask_ip_from_node(node_selected, "Please choose IP Address for your solution")
    user_form_data["ip"] = ip_address
    if domain_type == "sub":
        j.sal.zosv2.gateway.sub_domain(reservation, gateway_id, domain, [ip_address])

    secret_env = {}
    port = ports.get(kind)
    if not port:
        port = bot.int_ask("Which port you want to expose")
        user_form_data["port"] = port
    secret = bot.string_ask("Please specify a secret for the connection")
    user_form_data["secret"] = secret
    secret_encrypted = j.sal.zosv2.container.encrypt_secret(node_selected.node_id, user_form_data["secret"])
    secret_env["TRC_SECRET"] = secret_encrypted
    entrypoint = (
        f"/bin/trc -local {container_address}:{port} -remote {gateway.dns_nameserver[0]}:{gateway.tcp_router_port}"
    )

    j.sal.zosv2.container.create(
        reservation=reservation,
        node_id=node_selected.node_id,
        network_name=network_name,
        ip_address=ip_address,
        flist="https://hub.grid.tf/tf-official-apps/tcprouter:latest.flist",
        entrypoint=entrypoint,
        secret_env=secret_env,
    )
    # create proxy
    j.sal.zosv2.gateway.tcp_proxy_reverse(reservation, gateway_id, domain, user_form_data["secret"])
    resv_id = j.sal.reservation_chatflow.reservation_register_and_pay(
        reservation, expiration, customer_tid=j.me.tid, currency=currency, bot=bot
    )
    user_form_data["rid"] = resv_id

    j.sal.reservation_chatflow.reservation_save(
        resv_id, f"tcprouter:{resv_id}", "tfgrid.solutions.flist.1", user_form_data
    )

    j.sal.reservation_chatflow.payment_wait(bot, resv_id)
    j.sal.reservation_chatflow.reservation_wait(bot, resv_id)
    res_md = f"Use this Gateway to conect to your exposed solutions {domain}"
    bot.md_show(res_md)
