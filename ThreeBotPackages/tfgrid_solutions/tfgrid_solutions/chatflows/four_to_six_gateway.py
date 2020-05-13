from Jumpscale import j


class FourToSixGateway(j.servers.chatflow.get_class()):
    """
    """

    steps = [
        "gateway_start",
        "expiration_time",
        "wireguard_public_get",
        "wg_reservation",
        "wg_config",
    ]
    user_form_data = {}

    @j.baseclasses.chatflow_step(title="Gateway")
    def gateway_start(self):
        user_info = self.user_info()
        j.sal.reservation_chatflow.validate_user(user_info)

        self.gateway = j.sal.reservation_chatflow.gateway_select(self)
        self.gateway_id = self.gateway.node_id
        self.user_form_data["Gateway"] = self.gateway_id

    @j.baseclasses.chatflow_step(title="Gateway expiration time")
    def expiration_time(self):
        self.expiration = self.datetime_picker(
            "Please enter solution expiration time.",
            required=True,
            min_time=[3600, "Date/time should be at least 1 hour from now"],
            default=j.data.time.epoch + 3900,
        )
        self.user_form_data["Expiration"] = j.data.time.secondsToHRDelta(self.expiration - j.data.time.epoch)

    @j.baseclasses.chatflow_step(title="Wireguard public key")
    def wireguard_public_get(self):
        self.publickey = self.string_ask(
            "Please enter wireguard public key or leave empty if you want us to generate one for you."
        )
        self.privatekey = "enter private key here"

    @j.baseclasses.chatflow_step(title="Create your Wireguard ", disable_previous=True)
    def wg_reservation(self):
        if not self.publickey:
            self.privatekey, self.publickey = j.tools.wireguard.generate_key_pair()

        if self.gateway.free_to_use:
            currency = "FreeTFT"
        else:
            currency = "TFT"

        reservation = j.sal.zosv2.reservation_create()
        j.sal.zosv2.gateway.gateway_4to6(reservation=reservation, node_id=self.gateway_id, public_key=self.publickey)

        self.resv_id = j.sal.reservation_chatflow.reservation_register_and_pay(
            reservation, self.expiration, customer_tid=j.me.tid, currency=currency, bot=self
        )
        self.reservation_result = j.sal.reservation_chatflow.reservation_wait(self, self.resv_id)

        j.sal.reservation_chatflow.reservation_save(
            self.resv_id, f"4to6GW:{self.resv_id}", "tfgrid.solutions.4to6gw.1", self.user_form_data
        )

        res = """
                # Use the following template to configure your wireguard connection. This will give you access to your network.
                ## Make sure you have <a target="_blank" href="https://www.wireguard.com/install/">wireguard</a> installed
                Click next
                to download your configuration
                """
        self.md_show(j.core.text.strip(res))

    @j.baseclasses.chatflow_step(title="Wireguard configuration", disable_previous=True)
    def wg_config(self):
        cfg = self.reservation_result[0].data_json
        wgconfigtemplate = """\
        [Interface]
        Address = {{cfg.ips[0]}}
        PrivateKey = {{privatekey}}
        {% for peer in cfg.peers %}
        [Peer]
        PublicKey = {{peer.public_key}}
        AllowedIPs = {{",".join(peer.allowed_ips)}}
        {% if peer.endpoint -%}
        Endpoint = {{peer.endpoint}}
        {% endif %}
        {% endfor %}
        """
        config = j.tools.jinja2.template_render(text=wgconfigtemplate, cfg=cfg, privatekey=self.privatekey.decode())
        config = j.core.text.strip(config)

        filename = "wg-{}.conf".format(self.resv_id)
        self.download_file(msg=f"<pre>{config}</pre>", data=config, filename=filename, html=True)
        res = f"""
# In order to connect to the 4 to 6 gateway execute this command:
## ```wg-quick up ./{filename}```
                """
        self.md_show(res)


chat = FourToSixGateway
