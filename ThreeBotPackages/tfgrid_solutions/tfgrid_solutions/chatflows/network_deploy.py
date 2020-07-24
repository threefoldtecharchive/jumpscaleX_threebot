from Jumpscale import j
from Jumpscale.servers.gedis.GedisChatBot import StopChatFlow


class NetworkDeploy(j.servers.chatflow.get_class()):
    steps = [
        "start",
        "ip_config",
        "network_reservation",
        "network_info",
    ]
    model = j.threebot.packages.tfgrid_solutions.tfgrid_solutions.bcdb_model_get("tfgrid.solutions.network.1")

    @j.baseclasses.chatflow_step(title="Deploy Network")
    def start(self):
        user_info = self.user_info()
        j.sal.reservation_chatflow.validate_user(user_info)
        self.solution_name = j.sal.chatflow_deployer.ask_name(self)

    @j.baseclasses.chatflow_step(title="IP Configuration")
    def ip_config(self):
        ips = ["IPv6", "IPv4"]
        self.ipversion = self.single_choice(
            "How would you like to connect to your network? IPv4 or IPv6? If unsure, choose IPv4", ips, required=True
        )

        pools = j.sal.zosv2.pools.list()
        farms = {j.sal.chatflow_deployer.get_pool_farm_id(p.pool_id): p.pool_id for p in pools}
        self.access_node = None
        for farm_id in farms:
            farm_name = j.sal.zosv2._explorer.farms.get(farm_id).name
            access_nodes = j.sal.reservation_chatflow.nodes_get(1, farm_names=[farm_name], ip_version=self.ipversion)
            if access_nodes:
                self.access_node = access_nodes[0]
                self.pool = farms[farm_id]
                break
        if not self.access_node:
            raise StopChatFlow("There are no available access nodes in your existing pools")
        self.ip_range = j.sal.reservation_chatflow.ip_range_get(self)

    @j.baseclasses.chatflow_step(title="Reservation")
    def network_reservation(self):
        try:
            self.config = j.sal.chatflow_deployer.deploy_network(
                self.solution_name, self.access_node, self.ip_range, self.ipversion, self.pool
            )
        except Exception as e:
            raise StopChatFlow(f"Failed to register workload due to error {str(e)}")
        for wid in self.config["ids"]:
            success = j.sal.chatflow_deployer.wait_workload(wid, self)
            if not success:
                raise StopChatFlow(f"Failed to deploy workload {wid}")

    @j.baseclasses.chatflow_step(title="Network Information", disable_previous=True)
    def network_info(self):
        message = """
                ### Use the following template to configure your wireguard connection. This will give you access to your network.
                #### Make sure you have <a target="_blank" href="https://www.wireguard.com/install/">wireguard</a> installed
                Click next
                to download your configuration
            """

        self.md_show(j.core.text.strip(message), md=True, html=True)

        filename = "wg-{}.conf".format(self.config["rid"])
        self.download_file(msg=f'<pre>{self.config["wg"]}</pre>', data=self.config["wg"], filename=filename, html=True)

        message = f"""
    ### In order to have the network active and accessible from your local/container machine. To do this, execute this command:
    #### ```wg-quick up /etc/wireguard/{filename}```
    # Click next
            """

        self.md_show(message, md=True)


chat = NetworkDeploy
