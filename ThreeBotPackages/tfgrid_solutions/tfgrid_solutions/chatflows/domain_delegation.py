from Jumpscale import j


class DomainDelegation(j.servers.chatflow.get_class()):
    """
    """

    steps = ["domain_delegation_name", "domain_name", "expiration_time", "domain_pay", "success"]

    @j.baseclasses.chatflow_step(title="Domain delegation name")
    def domain_delegation_name(self):
        user_info = self.user_info()
        self.user_form_data = {}
        j.sal.reservation_chatflow.validate_user(user_info)
        self.model = j.threebot.packages.tfgrid_solutions.tfgrid_solutions.bcdb_model_get(
            "tfgrid.solutions.delegated_domain.1"
        )
        self.user_form_data["chatflow"] = "delegated_domain"
        self.user_form_data["Solution name"] = j.sal.reservation_chatflow.solution_name_add(
            self, self.model, msg="Please add a name for your domain delegtaion"
        )

    @j.baseclasses.chatflow_step(title="Domain name & Choose gateway")
    def domain_name(self):
        form = self.new_form()
        domain = form.string_ask("Please enter a domain name to delegate", required=True)
        gateways = j.sal.reservation_chatflow.gateway_list(self)
        if not gateways:
            return self.stop("No available gateway")
        options = sorted(list(gateways.keys()))
        gateway_choice = form.drop_down_choice("Please choose a gateway", options, required=True)
        form.ask()
        self.user_form_data["Domain"] = domain.value
        self.gateway = gateways[gateway_choice.value]
        self.gateway_id = self.gateway.node_id
        self.user_form_data["Gateway"] = self.gateway_id

    @j.baseclasses.chatflow_step(title="Expiration time")
    def expiration_time(self):
        self.expiration = self.datetime_picker(
            "Please enter solution expiration time.",
            required=True,
            min_time=[3600, "Date/time should be at least 1 hour from now"],
            default=j.data.time.epoch + 3900,
        )
        self.user_form_data["Expiration"] = j.data.time.secondsToHRDelta(self.expiration - j.data.time.epoch)

    @j.baseclasses.chatflow_step(title="Payment", disable_previous=True)
    def domain_pay(self):

        currencies = list()
        farm_id = self.gateway.farm_id
        addresses = j.sal.zosv2._explorer.farms.get(farm_id).wallet_addresses
        for address in addresses:
            if address.asset not in currencies:
                currencies.append(address.asset)

        if len(currencies) > 1:
            currency = self.single_choice(
                "Please choose a currency that will be used for the payment", currencies, default="TFT", required=True,
            )
        else:
            currency = currencies[0]

        self.reservation = j.sal.zosv2.reservation_create()
        j.sal.zosv2.gateway.delegate_domain(
            reservation=self.reservation, node_id=self.gateway_id, domain=self.user_form_data["Domain"]
        )

        res = j.sal.reservation_chatflow.solution_model_get(
            self.user_form_data["Solution name"], "tfgrid.solutions.delegated_domain.1", self.user_form_data
        )
        self.reservation = j.sal.reservation_chatflow.reservation_metadata_add(self.reservation, res)

        self.resv_id = j.sal.reservation_chatflow.reservation_register_and_pay(
            self.reservation, self.expiration, customer_tid=j.me.tid, currency=currency, bot=self
        )

    @j.baseclasses.chatflow_step(title="Success", disable_previous=True)
    def success(self):
        j.sal.reservation_chatflow.reservation_save(
            self.resv_id,
            self.user_form_data["Solution name"],
            "tfgrid.solutions.delegated_domain.1",
            self.user_form_data,
        )

        res = """\
        # Delegated your domain successfully

        Reservation id: {{reservation.id}}

        Please create an `NS` record in your dns manager for domain: `{{domain}}` pointing to:
        {% for dns in gateway.dns_nameserver -%}
        - {{dns}}
        {% endfor %}
        """
        res = j.tools.jinja2.template_render(
            text=res, gateway=self.gateway, domain=self.user_form_data["Domain"], reservation=self.reservation
        )
        self.md_show(j.core.text.strip(res))


chat = DomainDelegation
