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


class SolutionExpose(j.servers.chatflow.get_class()):
    steps = [
        "deployment_start",
        "solution_type",
        "exposed_solution",
        "exposed_ports",
        "domain_1",
        "domain_2",
        "expiration_datetime",
        "domain_3",
        "confirmation",
        "tcp_router_reservation",
        "success",
    ]

    @j.baseclasses.chatflow_step(title="")
    def deployment_start(self):

        self.user_form_data = {}
        user_info = self.user_info()
        j.sal.reservation_chatflow.validate_user(user_info)
        self.md_show("# This wizard will help you expose a deployed solution using the web gateway")

    @j.baseclasses.chatflow_step(title="Solution type")
    def solution_type(self):
        self.kind = self.single_choice("Please choose the solution type", list(kinds.keys()), required=True)
        self.user_form_data["kind"] = self.kind

        url = kinds[self.kind]
        solutions = j.sal.reservation_chatflow.solutions_get(url)

        self.sols = {sol["name"]: sol for sol in solutions}

    @j.baseclasses.chatflow_step(title="Solution to be exposed")
    def exposed_solution(self):
        solution_name = self.single_choice(
            "Please choose the solution to expose", list(self.sols.keys()), required=True
        )
        solution = self.sols[solution_name]
        self.user_form_data["Solution name"] = solution_name
        self.reservation_data = j.data.serializers.json.loads(solution["reservation"])["data_reservation"]
        self.solution_currency = self.reservation_data["currencies"][0]

    @j.baseclasses.chatflow_step(title="Ports")
    def exposed_ports(self):
        port = ports.get(self.kind)
        form = self.new_form()
        tlsport = form.int_ask("Which tls port you want to expose", default=port or 443)
        port = form.int_ask("Which port you want to expose", default=port or 80)
        form.ask()
        self.user_form_data["Port"] = port.value
        self.user_form_data["tls-port"] = tlsport.value

    @j.baseclasses.chatflow_step(title="Domain 1")
    def domain_1(self):
        # List all available domains
        free_to_use = False
        if "FreeTFT" == self.solution_currency:
            free_to_use = True
        self.gateways = {
            g.node_id: g
            for g in j.sal.zosv2._explorer.gateway.list()
            if g.free_to_use == free_to_use and j.sal.zosv2.nodes_finder.filter_is_up(g)
        }
        self.user_domains = j.sal.reservation_chatflow.delegate_domains_list(j.me.tid, currency=self.solution_currency)
        domain_ask_list = []
        for dom in self.user_domains:
            if self.gateways.get(self.user_domains[dom].node_id):
                domain_ask_list.append(f"Delegated Domain: {dom}")

        self.managed_domains = dict()
        for g in self.gateways.values():
            for dom in g.managed_domains:
                self.managed_domains[dom] = g
                domain_ask_list.append(f"Managed Domain: {dom}")
        domain_ask_list.append("Custom Domain")

        self.chosen_domain = self.single_choice("Please choose the domain you wish to use", domain_ask_list)

    @j.baseclasses.chatflow_step(title="Domain 2")
    def domain_2(self):
        if self.chosen_domain == "Custom Domain":
            domain = self.string_ask("Please specify the domain name you wish to bind to:")
            self.domain_gateway = j.sal.reservation_chatflow.gateway_select(self, currency=self.solution_currency)
            res = """\
        Please create a `CNAME` record in your dns manager for domain: `{{domain}}` pointing to:
        {% for dns in gateway.dns_nameserver -%}
        - {{dns}}
        {% endfor %}
        """
            res = j.tools.jinja2.template_render(text=res, gateway=self.domain_gateway, domain=domain)
            self.md_show(res)

        else:
            temp = self.chosen_domain.split()
            domain_type = temp[0]
            domain_name = temp[-1]
            if domain_type == "Managed":
                self.domain_gateway = self.managed_domains[domain_name]
            elif domain_type == "Delegated":
                domain_obj = self.user_domains[domain_name]
                self.domain_gateway = self.gateways[domain_obj.node_id]
            retry = False
            while True:
                domain = self.string_ask(
                    f"Please specify the sub domain name you wish to bind to. will be (subdomain).{domain_name}",
                    retry=retry,
                )
                if "." in domain:
                    retry = True
                    self.md_show("You can't nest domains. please click next to try again")
                else:
                    break
            domain = domain + "." + domain_name
        self.user_form_data["Domain"] = domain
        self.user_form_data["Gateway"] = self.domain_gateway.node_id
        self.user_form_data["Name Server"] = self.domain_gateway.dns_nameserver[0]

    @j.baseclasses.chatflow_step(title="Expiration")
    def expiration_datetime(self):
        self.expiration = self.datetime_picker(
            "Please enter gateway expiration time.",
            required=True,
            min_time=[3600, "Date/time should be at least 1 hour from now"],
            default=j.data.time.epoch + 3900,
        )
        self.user_form_data["self.Expiration"] = j.data.time.secondsToHRDelta(self.expiration - j.data.time.epoch)

    @j.baseclasses.chatflow_step(title="Domain 3", disable_previous=True)
    def domain_3(self):
        self.reservation = j.sal.zosv2.reservation_create()
        # create tcprouter
        if self.kind == "kubernetes":
            self.network_name, self.container_address = j.sal.reservation_chatflow.gateway_get_kube_network_ip(
                self.reservation_data
            )
        else:
            # valid for containers only (ubuntu, flist, minio)
            if len(self.reservation_data["containers"][0]["network_connection"]) > 1:
                # select network if container connected to multiple networks
                network_addresses = {}
                for con in self.reservation_data["containers"][0]["network_connection"]:
                    network_addresses[con["network_id"]] = con["ipaddress"]
                self.network_name = self.single_choice(
                    "Please choose on which network you wish to expose your solution", list(network_addresses.keys())
                )
                self.container_address = network_addresses[self.network_name]
            else:
                self.network_name = self.reservation_data["containers"][0]["network_connection"][0]["network_id"]
                self.container_address = self.reservation_data["containers"][0]["network_connection"][0]["ipaddress"]

        if self.chosen_domain != "Custom Domain":
            # create a subdomain
            addresses = []
            for ns in self.domain_gateway.dns_nameserver:
                addresses.append(j.sal.nettools.getHostByName(ns))
            j.sal.zosv2.gateway.sub_domain(
                self.reservation, self.domain_gateway.node_id, self.user_form_data["Domain"], addresses
            )

    @j.baseclasses.chatflow_step(title="Confirmation", disable_previous=True)
    def confirmation(self):
        query = {"mru": 1, "cru": 1, "currency": self.solution_currency, "sru": 1}
        node_selected = j.sal.reservation_chatflow.nodes_get(1, **query)[0]
        network = j.sal.reservation_chatflow.network_get(self, j.me.tid, self.network_name)
        network.add_node(node_selected)
        network.update(j.me.tid, currency=self.solution_currency, bot=self)
        ip_address = network.get_free_ip(node_selected)
        if not ip_address:
            raise j.exceptions.Value("No available free ips")

        secret = f"{j.me.tid}:{uuid.uuid4().hex}"
        self.user_form_data["Secret"] = secret
        secret_env = {}
        secret_encrypted = j.sal.zosv2.container.encrypt_secret(node_selected.node_id, self.user_form_data["Secret"])
        secret_env["TRC_SECRET"] = secret_encrypted
        remote = f"{self.domain_gateway.dns_nameserver[0]}:{self.domain_gateway.tcp_router_port}"
        local = f"{self.container_address}:{self.user_form_data['Port']}"
        localtls = f"{self.container_address}:{self.user_form_data['tls-port']}"
        entrypoint = f"/bin/trc -local {local} -local-tls {localtls} -remote {remote}"

        j.sal.zosv2.container.create(
            reservation=self.reservation,
            node_id=node_selected.node_id,
            network_name=self.network_name,
            ip_address=ip_address,
            flist="https://hub.grid.tf/tf-official-apps/tcprouter:latest.flist",
            entrypoint=entrypoint,
            secret_env=secret_env,
        )

        message = """
        <h4>Click next to proceed with the payment</h4>
        Tcp routers are used in the process of being able to expose your solutions. This payment is to deploy a container with a <a target="_blank" href="https://github.com/threefoldtech/tcprouter#reverse-tunneling">tcprouter client</a> on it.
        """
        self.md_show_confirm(self.user_form_data, message=j.core.text.strip(message), html=True)

    @j.baseclasses.chatflow_step(title="Reserve TCP router container", disable_previous=True)
    def tcp_router_reservation(self):
        # create proxy
        j.sal.zosv2.gateway.tcp_proxy_reverse(
            self.reservation, self.domain_gateway.node_id, self.user_form_data["Domain"], self.user_form_data["Secret"]
        )
        self.reservation = j.sal.reservation_chatflow.reservation_metadata_add(
            self.reservation, {"Solution name": self.user_form_data["Solution name"]}
        )

        resv_id = j.sal.reservation_chatflow.reservation_register_and_pay(
            self.reservation, self.expiration, customer_tid=j.me.tid, currency=self.solution_currency, bot=self
        )

        j.sal.reservation_chatflow.reservation_save(
            resv_id, self.user_form_data["Domain"], "tfgrid.solutions.exposed.1", self.user_form_data
        )

    @j.baseclasses.chatflow_step(title="Success", disable_previous=True)
    def success(self):
        domain = self.user_form_data["Domain"]
        res_md = f"Use this Gateway to connect to your exposed solutions `{domain}`"
        self.md_show(res_md)


chat = SolutionExpose
