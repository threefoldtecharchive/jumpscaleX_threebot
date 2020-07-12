from Jumpscale import j
from Jumpscale.servers.gedis.GedisChatBot import StopChatFlow


class DomainDelegation(j.servers.chatflow.get_class()):
    steps = ["select_pool", "domain_name", "reservation", "success"]

    @j.baseclasses.chatflow_step(title="Pool")
    def select_pool(self):
        user_info = self.user_info()
        j.sal.reservation_chatflow.validate_user(user_info)
        self.pool_id = j.sal.chatflow_deployer.select_pool(self)

    @j.baseclasses.chatflow_step(title="Domain delegation name")
    def domain_name(self):
        form = self.new_form()
        domain = form.string_ask("Please enter a domain name to delegate", required=True)
        gateways = j.sal.chatflow_deployer.list_gateways(pool_id=self.pool_id)
        if not gateways:
            return self.stop("No available gateway")
        gateway_choice = form.single_choice("Please choose a gateway", list(gateways.keys()), required=True)
        form.ask()
        self.domain = domain.value
        self.gateway = gateways[gateway_choice.value]
        self.gateway_id = self.gateway.node_id

    @j.baseclasses.chatflow_step(title="Reservation")
    def reservation(self):
        self.resv_id = j.sal.chatflow_deployer.delegate_domain(self.pool_id, self.gateway_id, self.domain)
        success = j.sal.chatflow_deployer.wait_workload(self.resv_id, self)
        if not success:
            raise StopChatFlow(f"Failed to deploy workload {self.resv_id}")

    @j.baseclasses.chatflow_step(title="Success", disable_previous=True)
    def success(self):
        res = """\
            # Delegated your domain successfully

            Reservation id: {{resv_id}}

            Please create an `NS` record in your dns manager for domain: `{{domain}}` pointing to:
            {% for dns in gateway.dns_nameserver -%}
            - {{dns}}
            {% endfor %}
            """
        res = j.tools.jinja2.template_render(text=res, gateway=self.gateway, domain=self.domain, resv_id=self.resv_id)
        self.md_show(j.core.text.strip(res))


chat = DomainDelegation
