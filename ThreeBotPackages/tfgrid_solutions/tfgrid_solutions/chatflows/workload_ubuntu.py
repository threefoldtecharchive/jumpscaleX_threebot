from Jumpscale import j
from Jumpscale.servers.gedis.GedisChatBot import StopChatFlow
import math


class UbuntuDeploy(j.servers.chatflow.get_class()):
    steps = [
        "ubuntu_start",
        "ubuntu_name",
        "ubuntu_version",
        "container_resources",
        "select_pool",
        "ubuntu_network",
        "container_logs",
        "public_key_get",
        "container_node_id",
        "container_ip",
        "overview",
        "reservation",
        "ubuntu_access",
    ]

    @j.baseclasses.chatflow_step()
    def ubuntu_start(self):
        self.user_form_data = dict()
        self.query = dict()
        self.HUB_URL = "https://hub.grid.tf/tf-bootable"
        self.IMAGES = ["ubuntu-18.04", "ubuntu-19.10", "ubuntu-20.04"]
        user_info = self.user_info()
        self.user_form_data["chatflow"] = "ubuntu"
        self.md_show("# This wizard will help you deploy an ubuntu container", md=True)
        j.sal.reservation_chatflow.validate_user(user_info)

    @j.baseclasses.chatflow_step(title="Solution name")
    def ubuntu_name(self):
        self.solution_name = j.sal.chatflow_deployer.ask_name(self)

    @j.baseclasses.chatflow_step(title="Ubuntu version")
    def ubuntu_version(self):
        self.version = self.single_choice("Please choose ubuntu version", self.IMAGES, required=True)

    @j.baseclasses.chatflow_step(title="Container resources")
    def container_resources(self):
        self.resources = j.sal.chatflow_deployer.ask_container_resources(self)

    @j.baseclasses.chatflow_step(title="Pool")
    def select_pool(self):
        # FIXME: properly calculate cu and su
        cu = self.resources["cpu"]
        su = self.resources["disk_size"]
        self.pool_id = j.sal.chatflow_deployer.select_pool(self, cu, su)

    @j.baseclasses.chatflow_step(title="Network")
    def ubuntu_network(self):
        self.network_view = j.sal.chatflow_deployer.select_network(self, self.pool_id)

    @j.baseclasses.chatflow_step(title="Container logs")
    def container_logs(self):
        self.container_logs_option = self.single_choice(
            "Do you want to push the container logs (stdout and stderr) onto an external redis channel",
            ["YES", "NO"],
            default="NO",
        )
        if self.container_logs_option == "YES":
            self.log_config = j.sal.chatflow_deployer.ask_container_logs(self, self.solution_name)
        else:
            self.log_config = {}

    @j.baseclasses.chatflow_step(title="Access keys")
    def public_key_get(self):
        self.public_key = self.upload_file(
            """Please add your public ssh key, this will allow you to access the deployed container using ssh.
                    Just upload the file with the key""",
            required=True,
        ).split("\n")[0]

    @j.baseclasses.chatflow_step(title="Container node id")
    def container_node_id(self):
        query = {
            "cru": self.resources["cpu"],
            "mru": math.ceil(self.resources["memory"] / 1024),
            "mru": math.ceil(self.resources["memory"] / 1024),
            "sru": self.resources["disk_size"],
        }
        self.selected_node = j.sal.chatflow_deployer.ask_container_placement(self, self.pool_id, **query)
        if not self.selected_node:
            self.selected_node = j.sal.chatflow_deployer.schedule_container(self.pool_id, **query)

    @j.baseclasses.chatflow_step(title="Container IP")
    def container_ip(self):
        self.network_view_copy = self.network_view.copy()
        result = j.sal.chatflow_deployer.add_network_node(
            self.network_view.name, self.selected_node, self.network_view_copy
        )
        if result:
            for wid in result["ids"]:
                success = j.sal.chatflow_deployer.wait_workload(wid, self)
                if not success:
                    raise StopChatFlow(f"Failed to add node {self.selected_node.node_id} to network {wid}")
        free_ips = self.network_view_copy.get_node_free_ips(self.selected_node)
        self.ip_address = self.drop_down_choice("Please choose IP Address for your solution", free_ips)

    @j.baseclasses.chatflow_step(title="Confirmation")
    def overview(self):
        self.metadata = {
            "Solution Name": self.solution_name,
            "Network": self.network_view.name,
            "Node ID": self.selected_node.node_id,
            "Pool": self.pool_id,
            "CPU": self.resources["cpu"],
            "Memory": self.resources["memory"],
            "Disk Size": self.resources["disk_size"],
            "IP Address": self.ip_address,
        }
        self.metadata.update(self.log_config)
        self.md_show_confirm(self.metadata)

    @j.baseclasses.chatflow_step(title="Reservation")
    def reservation(self):
        container_flist = f"{self.HUB_URL}/3bot-{self.version}.flist"
        self.resv_id = j.sal.chatflow_deployer.deploy_container(
            pool_id=self.pool_id,
            node_id=self.selected_node.node_id,
            network_name=self.network_view.name,
            ip_address=self.ip_address,
            flist=container_flist,
            cpu=self.resources["cpu"],
            memory=self.resources["memory"],
            disk_size=self.resources["disk_size"],
            env={"pub_key": self.public_key},
            interactive=False,
            entrypoint="/bin/bash /start.sh",
            log_config=self.log_config,
        )
        success = j.sal.chatflow_deployer.wait_workload(self.resv_id, self)
        if not success:
            raise StopChatFlow(f"Failed to deploy workload {self.resv_id}")

    @j.baseclasses.chatflow_step(title="Success", disable_previous=True)
    def ubuntu_access(self):
        res = f"""\
                # Ubuntu has been deployed successfully: your reservation id is: {self.resv_id}
                To connect ```ssh root@{self.ip_address}``` .It may take a few minutes.
                """
        self.md_show(j.core.text.strip(res), md=True)


chat = UbuntuDeploy
