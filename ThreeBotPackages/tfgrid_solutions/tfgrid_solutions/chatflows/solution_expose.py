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
    bot.md_show("# This wizard will help you expose a deployed solution using the web gateway")
    kind = bot.single_choice("Please choose the solution type", list(kinds.keys()))
    user_form_data["kind"] = kind

    url = kinds[kind]
    solutions = j.sal.reservation_chatflow.solutions_get(url)

    sols = {sol["name"]: sol for sol in solutions}
    solution_name = bot.single_choice("Please choose the solution to expose", list(sols.keys()))
    solution = sols[solution_name]
    user_form_data["Solution name"] = solution_name
    reservation_data = j.data.serializers.json.loads(solution["reservation"])["data_reservation"]
    solution_currency = reservation_data["currencies"][0]
    free_to_use = False
    if "FreeTFT" == solution_currency:
        free_to_use = True

    port = ports.get(kind)
    form = bot.new_form()
    tlsport = form.int_ask("Which tls port you want to expose", default=port or 443)
    port = form.int_ask("Which port you want to expose", default=port or 80)
    form.ask()
    user_form_data["Port"] = port.value
    user_form_data["tls-port"] = tlsport.value

    # List all available domains
    gateways = {g.node_id: g for g in j.sal.zosv2._explorer.gateway.list() if g.free_to_use == free_to_use}
    user_domains = j.sal.reservation_chatflow.delegate_domains_list(j.me.tid, currency=solution_currency)
    domain_ask_list = []
    for dom in user_domains:
        if gateways.get(user_domains[dom].node_id):
            domain_ask_list.append(f"Delegated Domain: {dom}")

    managed_domains = dict()
    for g in gateways.values():
        for dom in g.managed_domains:
            managed_domains[dom] = g
            domain_ask_list.append(f"Managed Domain: {dom}")
    domain_ask_list.append("Custom Domain")

    chosen_domain = bot.single_choice("Please choose the domain you wish to use", domain_ask_list)
    if chosen_domain == "Custom Domain":
        domain = bot.string_ask("Please specify the domain name you wish to bind to:")
        domain_gateway = j.sal.reservation_chatflow.gateway_select(bot, currency=solution_currency)
        res = """\
    Please create a `CNAME` record in your dns manager for domain: `{{domain}}` pointing to:
    {% for dns in gateway.dns_nameserver -%}
    - {{dns}}
    {% endfor %}
    """
        res = j.tools.jinja2.template_render(text=res, gateway=domain_gateway, domain=domain)
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
    user_form_data["Domain"] = domain
    user_form_data["Gateway"] = domain_gateway.node_id
    user_form_data["Name Server"] = domain_gateway.dns_nameserver[0]

    expiration = bot.datetime_picker(
        "Please enter gateway expiration time.",
        required=True,
        min_time=[3600, "Date/time should be at least 1 hour from now"],
    )
    user_form_data["Expiration"] = j.data.time.secondsToHRDelta(expiration - j.data.time.epoch)

    # create tcprouter
    if domain_gateway.free_to_use:
        currency = "FreeTFT"
    else:
        currency = None
    query = {"mru": 1, "cru": 1, "currency": currency, "sru": 1}
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
    user_form_data["Secret"] = secret
    secret_env = {}
    secret_encrypted = j.sal.zosv2.container.encrypt_secret(node_selected.node_id, user_form_data["Secret"])
    secret_env["TRC_SECRET"] = secret_encrypted
    remote = f"{domain_gateway.dns_nameserver[0]}:{domain_gateway.tcp_router_port}"
    local = f"{container_address}:{user_form_data['Port']}"
    localtls = f"{container_address}:{user_form_data['tls-port']}"
    entrypoint = f"/bin/trc -local {local} -local-tls {localtls} -remote {remote}"

    j.sal.zosv2.container.create(
        reservation=reservation,
        node_id=node_selected.node_id,
        network_name=network_name,
        ip_address=ip_address,
        flist="https://hub.grid.tf/tf-official-apps/tcprouter:latest.flist",
        entrypoint=entrypoint,
        secret_env=secret_env,
    )

    message = """
    <h4>Click next to proceed with the payment</h4>
    Tcp routers are used in the process of being able to expose your solutions. This payment is to deploy a container with a <a target="_blank" href="https://github.com/threefoldtech/tcprouter#reverse-tunneling">tcprouter client</a> on it.
    """
    bot.md_show_confirm(user_form_data, message=j.core.text.strip(message))
    user_form_data["secret"] = secret
    # create proxy
    j.sal.zosv2.gateway.tcp_proxy_reverse(reservation, domain_gateway.node_id, domain, user_form_data["Secret"])
    resv_id = j.sal.reservation_chatflow.reservation_register_and_pay(
        reservation, expiration, customer_tid=j.me.tid, currency=currency, bot=bot
    )

    j.sal.reservation_chatflow.reservation_save(
        resv_id, user_form_data["Domain"], "tfgrid.solutions.exposed.1", user_form_data
    )

    j.sal.reservation_chatflow.payment_wait(bot, resv_id)
    j.sal.reservation_chatflow.reservation_wait(bot, resv_id)

    res_md = f"Use this Gateway to connect to your exposed solutions `{domain}`"
    bot.md_show(res_md)
