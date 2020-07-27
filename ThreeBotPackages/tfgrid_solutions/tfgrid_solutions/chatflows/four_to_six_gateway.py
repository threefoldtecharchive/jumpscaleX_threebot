from Jumpscale import j
from Jumpscale.servers.gedis.GedisChatBot import StopChatFlow
import uuid


class FourToSixGateway(j.servers.chatflow.get_class()):
    steps = [
        "select_pool",
        "gateway_start",
        "wireguard_public_get",
        "wg_reservation",
        "wg_config",
    ]

    @j.baseclasses.chatflow_step(title="Pool")
    def select_pool(self):
        self.solution_id = uuid.uuid4().hex
        user_info = self.user_info()
        j.sal.reservation_chatflow.validate_user(user_info)
        user_info = self.user_info()
        j.sal.reservation_chatflow.validate_user(user_info)
        self.pool_id = j.sal.chatflow_deployer.select_pool(self)

    @j.baseclasses.chatflow_step(title="Gateway")
    def gateway_start(self):
        self.gateway = j.sal.chatflow_deployer.select_gateway(self, self.pool_id)
        self.gateway_id = self.gateway.node_id

    @j.baseclasses.chatflow_step(title="Wireguard public key")
    def wireguard_public_get(self):
        self.publickey = self.string_ask(
            "Please enter wireguard public key or leave empty if you want us to generate one for you."
        )
        self.privatekey = "enter private key here"
        res = "# Click next to continue with wireguard related deployment. Once you proceed you will not be able to go back to this step"
        self.md_show(res, md=True)

    @j.baseclasses.chatflow_step(title="Create your Wireguard ", disable_previous=True)
    def wg_reservation(self):
        if not self.publickey:
            self.privatekey, self.publickey = j.tools.wireguard.generate_key_pair()

        self.resv_id = j.sal.chatflow_deployer.create_ipv6_gateway(
            self.gateway_id, self.pool_id, self.publickey, SolutionType="4to6GW", solution_uuid=self.solution_id
        )
        success = j.sal.chatflow_deployer.wait_workload(self.resv_id, self)
        if not success:
            raise StopChatFlow(f"Failed to deploy workload {self.resv_id}")
        self.reservation_result = j.sal.zosv2.workloads.get(self.resv_id).result
        print(self.reservation_result)
        res = """
                        # Use the following template to configure your wireguard connection. This will give you access to your network.
                        ## Make sure you have <a target="_blank" href="https://www.wireguard.com/install/">wireguard</a> installed
                        Click next
                        to download your configuration
                        """
        self.md_show(j.core.text.strip(res))

    @j.baseclasses.chatflow_step(title="Wireguard configuration", disable_previous=True)
    def wg_config(self):
        cfg = self.reservation_result.info.data_json
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
