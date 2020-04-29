from Jumpscale import j
import uuid

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
    identity = j.sal.reservation_chatflow.validate_user(user_info)
    kind = bot.single_choice("Please choose the solution type", list(kinds.keys()))
    user_form_data["kind"] = kind

    url = kinds[kind]
    solutions = j.sal.reservation_chatflow.solutions_get(url)

    sols = {sol["name"]: sol for sol in solutions}
    solution_name = bot.single_choice("Please choose the solution to expose", list(sols.keys()))
    solution = sols[solution_name]
    user_form_data["solution_name"] = solution_name

    port = ports.get(kind)
    if not port:
        port = bot.int_ask("Which port you want to expose")
        user_form_data["port"] = port

    # List all available domains
    gateways = {g.node_id: g for g in j.sal.zosv2._explorer.gateway.list()}
    user_domains = j.sal.reservation_chatflow.delegate_domains_list(identity.id)
    domain_ask_list = []
    for dom in user_domains:
        domain_ask_list.append(f"Delegated Domain: {dom}")

    managed_domains = dict()
    for g in gateways.values():
        for dom in g.managed_domains:
            managed_domains[dom] = g
            domain_ask_list.append(f"Managed Domain: {dom}")
    domain_ask_list.append("Crystal Domain")

    choosed_domain = bot.single_choice(
        "Please choose the domain you wish to use", domain_ask_list
    )
    temp = choosed_domain.split()
    domain_type = temp[0].strip()
    if domain_type == "Crystal":
        domain = bot.string_ask(
            f''' Warning: you will have to create an A record to point to the gateway you'll choose.
            Please specify the domain name you wish to bind to:'''
        )
        domain_gateway = j.sal.reservation_chatflow.gateway_select(bot)

    else:
        domain_name = temp[-1].strip()
        if domain_type == "Managed":
            domain_obj = managed_domains[domain_name]
            domain_gateway = gateways[domain_obj.node_id]
        elif domain_type == "Delegated":
            domain_obj = user_domains[domain_name]
            domain_gateway = gateways[domain_obj.node_id]
        domain = bot.string_ask(
            f"Please specify the sub domain name you wish to bind to will be (subdomain).{domain_name}"
        )
        if "." in domain:
            raise j.exceptions.Value("Invalid Subdomain")
        domain = domain + "." + domain_name

    # use gateway currency
    currency = "TFT"
    if domain_gateway.free_to_use:
        currency = "FreeTFT"

    expirationdelta = int(bot.time_delta_ask("Please enter solution expiration time.", default="1d"))
    expiration = j.data.time.epoch + expirationdelta
    user_form_data["expiration"] = expiration

    # create tcprouter
    reservation_data = j.data.serializers.json.loads(solution["reservation"])["data_reservation"]
    query = {"mru": 1, "cru": 1, "currency": currency, "free_to_use": domain_gateway.free_to_use}
    node_selected = j.sal.reservation_chatflow.nodes_get(1, **query)[0]
    network_name = reservation_data["containers"][0]["network_connection"][0]["network_id"]
    container_address = reservation_data["containers"][0]["network_connection"][0]["ipaddress"]

    network = j.sal.reservation_chatflow.network_get(bot, identity.id, network_name)
    network.add_node(node_selected)
    network.update(identity.id, currency=currency)
    ip_address = network.get_free_ip(node_selected)
    if not ip_address:
        raise j.exceptions.Value("No available free ips")


    secret = f"{identity.id}:{uuid.uuid4().hex}"
    user_form_data["secret"] = secret
    secret_env = {}
    secret_encrypted = j.sal.zosv2.container.encrypt_secret(node_selected.node_id, user_form_data["secret"])
    secret_env["TRC_SECRET"] = secret_encrypted
    entrypoint = (
        f"/bin/trc -local {container_address}:{port} -remote {domain_gateway.dns_nameserver[0]}:{domain_gateway.tcp_router_port}"
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
    j.sal.zosv2.gateway.tcp_proxy_reverse(reservation, domain_gateway.node_id, domain, user_form_data["secret"])
    resv_id = j.sal.reservation_chatflow.reservation_register_and_pay(
        reservation, expiration, customer_tid=identity.id, currency=currency, bot=bot
    )
    user_form_data["rid"] = resv_id

    j.sal.reservation_chatflow.reservation_save(
        resv_id, f"tcprouter:{resv_id}", "tfgrid.solutions.flist.1", user_form_data
    )

    j.sal.reservation_chatflow.payment_wait(bot, resv_id)
    j.sal.reservation_chatflow.reservation_wait(bot, resv_id)
    res_md = f"Use this Gateway to conect to your exposed solutions {domain}"
    bot.md_show(res_md)
