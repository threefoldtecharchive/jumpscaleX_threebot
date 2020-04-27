from Jumpscale import j

kinds = {
    "minio": "tfgrid.solutions.minio.1",
    "kubernetes": "tfgrid.solutions.kubernetes.1",
    "ubuntu": "tfgrid.solutions.ubuntu.1",
    "flist": "tfgrid.solutions.flist.1",
}

def chat(bot):
    """
    """
    user_form_data = {}
    user_info = bot.user_info()
    identity = j.sal.reservation_chatflow.validate_user(user_info)
    kind = bot.single_choice(
        "Please choose the solution type", list(kinds.keys())
    )
    user_form_data["kind"] = kind

    url = kinds[kind]
    solutions = j.sal.reservation_chatflow.solutions_get(url)

    sols = {sol["name"]: sol for sol in solutions}
    solution_name = bot.single_choice(
        "Please the solution to expose", list(sols.keys())
    )
    solution = sols[solution_name]
    user_form_data["solution_name"] = solution_name

    domain = bot.string_ask("Please specify the domain name you wish to bind to")

    expirationdelta = int(bot.time_delta_ask("Please enter solution expiration time.", default="1d"))
    expiration = j.data.time.epoch + expirationdelta
    user_form_data["expiration"] = expiration

    currency = bot.single_choice(
        "Please choose a currency that will be used for the payment", ["FreeTFT", "TFT"]
    )
    if not currency:
        currency = "TFT"
    user_form_data["currency"] = currency

    # create a container with tcprouter flist
    query = {"mru": 1, "cru": 1, "sru": 1, "currency": currency}

    node_selected = j.sal.reservation_chatflow.nodes_get(1, **query)[0]
    reservation_data = j.data.serializers.json.loads(solution["reservation"])["data_reservation"]
    network_name = reservation_data["containers"][0]["network_connection"][0]["network_id"]

    network = j.sal.reservation_chatflow.network_get(bot, identity.id, network_name)
    network.add_node(node_selected)
    network.update(identity.id, currency=currency)
    ip_address = network.ask_ip_from_node(node_selected, "Please choose IP Address for your solution")
    user_form_data["ip"] = ip_address

    gateways = {g.node_id: g for g in j.sal.zosv2._explorer.gateway.list()}
    gateway_id = bot.single_choice(
        "Please choose a gateway", list(gateways.keys())
    )
    gateway = gateways[gateway_id]

    proxy_type = bot.single_choice(
        "What type of resource you wish to expose", ["port", "container"]
    )

    secret_env = {}
    if proxy_type == "port":
        port = bot.int_ask("Which port you want to expose")
        user_form_data["port"] = port
        entrypoint = f"/bin/trc -local {ip_address}:{port} -remote {gateway.dns_nameserver[0]}"
    elif proxy_type == "container":
        # Update entry point to match the types
        secret = bot.string_ask("Please specify a secret for the connection")
        user_form_data["secret"] = secret
        secret_encrypted = j.sal.zosv2.container.encrypt_secret(node_selected.node_id, user_form_data["Secret"])
        secret_env = {"SECRET": secret_encrypted}
        entrypoint = f"/bin/trc -remote {gateway.dns_nameserver[0]}"

    reservation = j.sal.zosv2.reservation_create()
    j.sal.zosv2.container.create(
        reservation=reservation,
        node_id=node_selected.node_id,
        network_name=network_name,
        ip_address=ip_address,
        flist="https://hub.grid.tf/tf-official-apps/tcprouter:latest.flist",
        entrypoint=entrypoint,
        secret_env=secret_env,
    )

    reservation_create = j.sal.reservation_chatflow.reservation_register(
        reservation, expiration, customer_tid=identity.id, currency=currency
    )
    resv_id = reservation_create.reservation_id
    user_form_data["rid"] = resv_id
    wallet = j.sal.reservation_chatflow.payments_show(bot, reservation_create)
    if wallet:
        j.sal.zosv2.billing.payout_farmers(wallet, reservation_create)

    j.sal.reservation_chatflow.reservation_save(
        resv_id, f"tcprouter:{resv_id}", "tfgrid.solutions.flist.1", user_form_data
    )

    j.sal.reservation_chatflow.payment_wait(bot, resv_id)
    j.sal.reservation_chatflow.reservation_wait(bot, resv_id)
    # create the proxy

    proxy_reservation = j.sal.zosv2.reservation_create()

    if proxy_type == "port":
        res = j.sal.zosv2.gateway.tcp_proxy(proxy_reservation, gateway_id, domain, ip_address, user_form_data["port"])
    elif proxy_type == "container":
        res = j.sal.zosv2.gateway.tcp_proxy_reverse(proxy_reservation, gateway_id, domain, user_form_data["secret"])

    res_md = f"""Use this Gateway to conect to your exposed solutions {gateway.dns_nameserver}"""
    bot.md_show(res_md)
