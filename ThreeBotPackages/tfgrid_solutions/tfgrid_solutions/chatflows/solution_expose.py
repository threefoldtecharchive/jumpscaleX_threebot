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

ports = {"minio": 9000, "kubernetes": 6443}


def chat(bot):
    user_form_data = {}
    user_info = bot.user_info()
    j.sal.reservation_chatflow.validate_user(user_info)
    reservation = j.sal.zosv2.reservation_create()
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
    user_domains = j.sal.reservation_chatflow.delegate_domains_list(j.me.tid)
    domain_ask_list = []
    for dom in user_domains:
        domain_ask_list.append(f"Delegated Domain: {dom}")

    managed_domains = dict()
    for g in gateways.values():
        for dom in g.managed_domains:
            managed_domains[dom] = g
            domain_ask_list.append(f"Managed Domain: {dom}")
    domain_ask_list.append("Custom Domain")

    chosen_domain = bot.single_choice(
        "Please choose the domain you wish to use", domain_ask_list
    )
    if chosen_domain == "Custom Domain":
        domain = bot.string_ask(
            "Please specify the domain name you wish to bind to:"
        )
        domain_gateway = j.sal.reservation_chatflow.gateway_select(bot)
        res = """\
    Please create a `CNAME` record in your dns manager for domain: `{{domain}}` pointing to:
    {% for dns in gateway.dns_nameserver -%}
    - {{dns}}
    {% endfor %}
    """
        res = j.tools.jinja2.template_render(gateway=domain_gateway, domain=domain)
        bot.md_show(res)

    else:
        temp = chosen_domain.split()
        domain_type = temp[0]
        domain_name = temp[-1]
        if domain_type == "Managed":
            domain_gateway = managed_domains[domain_name]
        elif domain_type == "Delegated":
            domain_obj = user_domains[domain_name]
            domain_gateway = gateways[domain_obj.node_id]
        while True:
            domain = bot.string_ask(
                f"Please specify the sub domain name you wish to bind to. will be (subdomain).{domain_name}"
            )
            if "." in domain:
                bot.md_show("You can't nest domains. please click next to try again")
            else:
                break
        domain = domain + "." + domain_name

    # use gateway currency
    currency = "TFT"
    if domain_gateway.free_to_use:
        currency = "FreeTFT"

    expirationdelta = int(bot.time_delta_ask("Please enter gateway expiration time.", default="1d"))
    expiration = j.data.time.epoch + expirationdelta
    user_form_data["expiration"] = expiration

    # create tcprouter
    reservation_data = j.data.serializers.json.loads(solution["reservation"])["data_reservation"]
    query = {"mru": 1, "cru": 1, "currency": currency, "free_to_use": domain_gateway.free_to_use}
    node_selected = j.sal.reservation_chatflow.nodes_get(1, **query)[0]

    if kind == "kubernetes":
        network_name, container_address = j.sal.reservation_chatflow.gateway_get_kube_network_ip(reservation_data)
    else:
        # valid for containers only (ubuntu, flist, minio)
        if len(reservation_data["containers"][0]["network_connection"]) > 1:
            # select network if container connected to multiple networks
            network_addresses = {}
            for con in reservation_data["containers"][0]["network_connection"]:
                network_addresses[con["network_id"]] = con["ipaddress"]
            network_name = bot.single_choice(
                "Please choose on which network you wish to expose your solution", list(network_addresses.keys())
            )
            container_address = network_addresses[network_name]
        else:
            network_name = reservation_data["containers"][0]["network_connection"][0]["network_id"]
            container_address = reservation_data["containers"][0]["network_connection"][0]["ipaddress"]

    if chosen_domain != "Custom Domain":
        # create a subdomain
        addresses = []
        for ns in domain_gateway.dns_nameserver:
            addresses.append(j.sal.nettools.getHostByName(ns))
        j.sal.zosv2.gateway.sub_domain(reservation, domain_gateway.node_id, domain, addresses)
    network = j.sal.reservation_chatflow.network_get(bot, j.me.tid, network_name)
    network.add_node(node_selected)
    network.update(j.me.tid, currency=currency, bot=bot)
    ip_address = network.get_free_ip(node_selected)
    if not ip_address:
        raise j.exceptions.Value("No available free ips")

    secret = f"{j.me.tid}:{uuid.uuid4().hex}"
    user_form_data["secret"] = secret
    secret_env = {}
    secret_encrypted = j.sal.zosv2.container.encrypt_secret(node_selected.node_id, user_form_data["secret"])
    secret_env["TRC_SECRET"] = secret_encrypted
    remote = f"{domain_gateway.dns_nameserver[0]}:{domain_gateway.tcp_router_port}"
    local = f"{container_address}:{port}"
    entrypoint = (
        f"/bin/trc -local {local} -remote {remote}"
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
        reservation, expiration, customer_tid=j.me.tid, currency=currency, bot=bot
    )
    user_form_data["rid"] = resv_id

    j.sal.reservation_chatflow.reservation_save(
        resv_id, f"tcprouter:{resv_id}", "tfgrid.solutions.flist.1", user_form_data
    )

    j.sal.reservation_chatflow.payment_wait(bot, resv_id)
    j.sal.reservation_chatflow.reservation_wait(bot, resv_id)
    res_md = f"Use this Gateway to connect to your exposed solutions {domain}"
    bot.md_show(res_md)
