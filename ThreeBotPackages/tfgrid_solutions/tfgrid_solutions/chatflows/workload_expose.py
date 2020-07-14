from Jumpscale import j
from Jumpscale.servers.gedis.GedisChatBot import StopChatFlow
import uuid

kinds = {
    "minio": j.sal.chatflow_solutions.list_minio_solutions,
    "kubernetes": j.sal.chatflow_solutions.list_kubernetes_solutions,
    "ubuntu": j.sal.chatflow_solutions.list_ubuntu_solutions,
    "flist": j.sal.chatflow_solutions.list_flist_solutions,
}

domain_types = ["delegate", "managed", "custom"]

ports = {"minio": 9000, "kubernetes": 6443}


class SolutionExpose(j.servers.chatflow.get_class()):
    @j.baseclasses.chatflow_step(title="")
    def deployment_start(self):
        self.user_form_data = {}
        user_info = self.user_info()
        j.sal.reservation_chatflow.validate_user(user_info)
        self.md_show("# This wizard will help you expose a deployed solution using the web gateway")

    @j.baseclasses.chatflow_step(title="Solution type")
    def solution_type(self):
        self.kind = self.single_choice("Please choose the solution type", list(kinds.keys()), required=True)
        solutions = kinds[self.kind]()
        self.sols = {}
        for sol in solutions:
            name = sol.metadata.get("name", sol.metadata["form_info"].get("name"))
            if name:
                self.sols[name] = sol

    @j.baseclasses.chatflow_step(title="Solution to be exposed")
    def exposed_solution(self):
        self.solution_name = self.single_choice(
            "Please choose the solution to expose", list(self.sols.keys()), required=True
        )
        self.solution = self.sols[self.solution_name]
        self.pool_id = self.solution.info.pool_id

    @j.baseclasses.chatflow_step(title="Ports")
    def exposed_ports(self):
        port = ports.get(self.kind)
        form = self.new_form()
        tlsport = form.int_ask("Which tls port you want to expose", default=port or 443)
        port = form.int_ask("Which port you want to expose", default=port or 80)
        form.ask()
        self.port = port.value
        self.tls_port = tlsport.value
        self.solution_ip = j.sal.chatflow_solutions.get_solution_ip(self.solution)

    @j.baseclasses.chatflow_step(title="Domain 1")
    def domain_1(self):
        self.gateways = j.sal.chatflow_deployer.list_gateways(self.pool_id)
        domain_ask_list = []
        self.user_domains = {}
        for dom in j.sal.chatflow_deployer.workloads["DEPLOY"]["DOMAIN-DELEGATE"][self.pool_id]:
            domain_ask_list.append(f"Delegated Domain: {dom.domain}")
            self.user_domains[dom.domain] = dom
        self.managed_domains = {}
        for gateway in self.gateways:
            for dom in gateway.managed_domains:
                self.managed_domains[dom] = gateway
                domain_ask_list.append(f"Managed Domain: {dom}")
        domain_ask_list.append("Custom Domain")
        self.chosen_domain = self.single_choice("Please choose the domain you wish to use", domain_ask_list)

    @j.baseclasses.chatflow_step(title="Domain 2")
    def domain_2(self):
        if self.chosen_domain == "Custom Domain":
            self.domain = self.string_ask("Please specify the domain name you wish to bind to:")
            self.domain_gateway = j.sal.chatflow_deployer.select_gateway(self, self.pool_id)
            res = """\
            Please create a `CNAME` record in your dns manager for domain: `{{domain}}` pointing to:
            {% for dns in gateway.dns_nameserver -%}
            - {{dns}}
            {% endfor %}
            """
            res = j.tools.jinja2.template_render(text=res, gateway=self.domain_gateway, domain=self.domain)
            self.md_show(res)

        else:
            temp = self.chosen_domain.split()
            domain_type = temp[0]
            domain_name = temp[-1]
            if domain_type == "Managed":
                self.domain_gateway = self.managed_domains[domain_name]
            elif domain_type == "Delegated":
                domain_obj = self.user_domains[domain_name]
                self.domain_gateway = j.clients.explorer.default.gateway.get(domain_obj.info.node_id)
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
            self.domain = domain + "." + domain_name
            self.name_server = self.domain_gateway.dns_nameserver[0]
            self.gateway_id = self.domain_gateway.node_id
            self.secret = f"{j.me.tid}:{uuid.uuid4().hex}"

    @j.baseclasses.chatflow_step(title="Confirmation", disable_previous=True)
    def confirmation(self):
        self.metadata = {
            "Exposed Solution": self.solution_name,
            "Solution Type": self.kind,
            "Solution Exposed IP": self.solution_ip,
            "Port": self.port,
            "TLS Port": self.tls_port,
            "Gateway": self.gateway_id,
            "Pool": self.pool_id,
            "TRC Secret": self.secret,
        }
        self.md_show_confirm(self.metadata, html=True)

    @j.baseclasses.chatflow_step(title="Reservation", disable_previous=True)
    def reservation(self):
        metadata = {"name": self.domain, "form_info": {"Solution name": self.domain, "chatflow": "exposed"}}
        metadata["form_info"].update(self.metadata)
        query = {"mru": 1, "cru": 1, "sru": 1}
        self.selected_node = j.sal.chatflow_deployer.schedule_container(self.pool_id, **query)
        self.network_name = j.sal.chatflow_solutions.get_solution_network_name(self.solution)
        self.tcprouter_ip = self.network_view.get_free_ip(self.selected_node)
        if not self.tcprouter_ip:
            raise StopChatFlow(
                f"No available ips one for network {self.network_view.name} node {self.selected_node.node_id}"
            )

        if self.chosen_domain != "Custom":
            self.dom_id = j.sal.chatflow_deployer.create_subdomain(
                pool_id=self.pool_id, gateway_id=self.gateway_id, subdomain=self.domain, **metadata
            )
            success = j.sal.chatflow_deployer.wait_workload(self.dom_id)
            if not success:
                raise StopChatFlow(f"Failed to reserve sub-domain workload {self.dom_id}")

        self.proxy_id = j.sal.chatflow_deployer.create_proxy(
            pool_id=self.pool_id,
            gateway_id=self.gateway_id,
            domain_name=self.domain,
            trc_secret=self.secret,
            **metadata,
        )
        success = j.sal.chatflow_deployer.wait_workload(self.proxy_id)
        if not success:
            raise StopChatFlow(f"Failed to reserve sub-domain workload {self.proxy_id}")

        self.tcprouter_id = j.sal.chatflow_deployer.expose_address(
            pool_id=self.pool_id,
            gateway_id=self.gateway_id,
            network_name=self.network_name,
            local_ip=self.solution_ip,
            port=self.port,
            tls_port=self.tls_port,
            trc_secret=self.secret,
            **metadata,
        )
        success = j.sal.chatflow_deployer.wait_workload(self.tcprouter_id)
        if not success:
            raise StopChatFlow(f"Failed to reserve sub-domain workload {self.tcprouter_id}")

    @j.baseclasses.chatflow_step(title="Success", disable_previous=True)
    def success(self):
        res_md = f"Use this Gateway to connect to your exposed solution `{self.domain}`"
        self.md_show(res_md)


chat = SolutionExpose
