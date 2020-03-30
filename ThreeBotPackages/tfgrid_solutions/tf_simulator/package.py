from Jumpscale import j

tcprouter_config = """
[server]
addr = "0.0.0.0"
port = 4430
httpport = 8000
clientsport = 18000

[server.dbbackend]
type     = "redis"
username = ""
password = ""
addr     = "127.0.0.1"
port     = 6379
refresh  = 5
"""


class Package(j.baseclasses.threebot_package):
    def _init(self, **kwargs):
        pass

    def prepare(self):
        """
        is called at install time
        :return:
        """
        pass

    def start(self):
        """
        called when the 3bot starts
        :return:
        """
        j.builders.network.tcprouter.install()
        j.sal.fs.writeFile("/sandbox/cfg/router.toml", tcprouter_config)
        j.builders.network.tcprouter.start()

        if not j.sal.fs.exists("/etc/wireguard/network.conf"):
            from threebot_packages.tfgrid_solutions.tf_simulator.chatflows.tf_simulator_deploy import Play

            play = Play()
            play.deploy_network()

        for server_port, client_port in ((443, 4430), (80, 8000)):
            website = self.openresty.websites.get(f"tf_simulator_chat_{server_port}")
            website.port = server_port
            website.ssl = server_port == 443
            website.domain = "play.grid.tf"

            locations = website.locations.get(name=f"tf_simulator_chat_{server_port}_locations")
            location = locations.locations_custom.new()
            location.name = f"tf_simulator_chat_{server_port}"
            location.is_auth = False

            default_website_name = self.openresty.get_from_port(server_port).name
            location.config = f"""
            include {website.path_cfg_dir}/{default_website_name}_locations/*.conf;
            location / {{
                rewrite ^(.+) /tfgrid_solutions/tf_simulator/chat/tf_simulator_deploy;
            }}"""

            locations.configure()
            website.configure()

            website_2 = self.openresty.websites.get(f"tf_simulator_chat_{client_port}_tcprouter")
            website_2.port = server_port
            website_2.ssl = client_port == 4430
            website_2.domain = ".*\.play.grid.tf"

            locations_2 = website_2.locations.get(f"tcprouter_{client_port}")
            proxy_location = locations_2.get_location_proxy(f"tcprouter_{client_port}")
            proxy_location.path_dest = "/"
            proxy_location.path_url = "/"
            proxy_location.ipaddr_dest = "127.0.0.1"
            proxy_location.port_dest = client_port
            proxy_location.type = "websocket"
            proxy_location.scheme = "http"
            proxy_location.is_auth = False

            locations_2.configure()
            website_2.configure()

    def stop(self):
        """
        called when the 3bot stops
        :return:
        """

    def uninstall(self):
        """
        called when the package is no longer needed and will be removed from the threebot
        :return:
        """
