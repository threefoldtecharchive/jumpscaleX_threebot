from Jumpscale import j
import uuid
from Jumpscale.servers.gedis.GedisChatBot import StopChatFlow
import math


class MinioDeploy(j.servers.chatflow.get_class()):
    steps = [
        "deployment_start",
        "minio_name",
        "setup_type",
        "zdb_storage_type",
        "container_resources",
        "minio_resources",
        "select_pool",
        "minio_network",
        "access_credentials",
        "container_logs",
        "public_key",
        "minio_node",
        "master_ip_selection",
        "slave_ip_selection",
        "overview",
        "zdb_reservation",
        "minio_reservation",
        "success",
    ]

    @j.baseclasses.chatflow_step(title="")
    def deployment_start(self):
        self.solution_id = uuid.uuid4().hex
        self.user_info = self.user_info()
        j.sal.reservation_chatflow.validate_user(self.user_info)
        self.user_form_data = {}
        self.user_form_data["chatflow"] = "minio"
        self.md_show("# This wizard will help you deploy a minio cluster")

    @j.baseclasses.chatflow_step(title="Solution name")
    def minio_name(self):
        valid = False
        while not valid:
            self.solution_name = j.sal.chatflow_deployer.ask_name(self)
            solutions = j.sal.chatflow_solutions.list_minio_solutions(sync=False)
            valid = True
            for sol in solutions:
                if sol["Name"] == self.solution_name:
                    valid = False
                    self.md_show("The specified solution name already exists. please choose another.")
                    break
                valid = True

    @j.baseclasses.chatflow_step(title="Setup type")
    def setup_type(self):
        self.mode = self.drop_down_choice(
            "Please choose the type of setup you need. Single setup is the basic setup while master/slave setup includes TLOG use to be able to reconstruct the metadata",
            ["Single", "Master/Slave"],
            required=True,
            default="Single",
        )

    @j.baseclasses.chatflow_step(title="ZDB Storage")
    def zdb_storage_type(self):
        self.zdb_disk_type = self.drop_down_choice(
            "Please choose a the type of disk for zdb", ["SSD", "HDD"], required=True, default="SSD"
        )

    @j.baseclasses.chatflow_step(title="Container resources")
    def container_resources(self):
        self.minio_cont_resources = j.sal.chatflow_deployer.ask_container_resources(self, disk_size=False)

    @j.baseclasses.chatflow_step(title="Resources for minio")
    def minio_resources(self):
        form = self.new_form()
        data_number = form.int_ask(
            "Please add the number of locations you need. Take care of the ratio between the locations and locations allowed to fail that you will specify next",
            default=2,
        )
        parity = form.int_ask("Please add the number of locations allowed to fail", default=1)
        form.ask()
        self.data = data_number.value
        self.parity = parity.value
        self.zdb_number = self.data + self.parity
        self.minio_number = 1
        if self.mode == "Master/Slave":
            self.minio_number += 1
            self.zdb_number += 1

    @j.baseclasses.chatflow_step(title="Pool")
    def select_pool(self):
        query = {
            "cru": self.minio_cont_resources["cpu"],
            "mru": self.minio_cont_resources["memory"],
            "sru": 2,  # zdb + single node
        }
        if self.mode == "Master/Slave":
            query["sru"] += 1
        cu, su = j.sal.chatflow_deployer.calculate_capacity_units(**query)
        self.pool_id = j.sal.chatflow_deployer.select_pool(self, cu=cu, su=su)

    @j.baseclasses.chatflow_step(title="Network")
    def minio_network(self):
        self.network_view = j.sal.chatflow_deployer.select_network(self, self.pool_id)

    @j.baseclasses.chatflow_step(title="Access credentials")
    def access_credentials(self):
        name = self.user_info["username"]
        accesskey_string = f"{name.split('.')[0]}"
        secret_string = "secret12345"
        form = self.new_form()
        accesskey = form.string_ask(
            "Please add the key to be used for minio when logging in. Make sure not to lose it",
            default=accesskey_string,
            min_length=3,
        )
        secret = form.string_ask(
            "Please add the secret to be used for minio when logging in to match the previous key. Make sure not to lose it",
            default=secret_string,
            min_length=8,
        )
        form.ask()

        self.ak = accesskey.value
        self.sk = secret.value

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

    @j.baseclasses.chatflow_step(title="Public key")
    def public_key(self):
        public_key_file = self.upload_file(
            """Please add your public ssh key, this will allow you to access the deployed minio container using ssh.
                Just upload the file with the key. (Optional)"""
        ).split("\n")
        if public_key_file:
            self.public_ssh_key = public_key_file[0]
        else:
            self.public_ssh_key = ""

    @j.baseclasses.chatflow_step(title="Minio container node selection")
    def minio_node(self):
        nodequery = {}
        nodequery["sru"] = 1
        nodequery["cru"] = self.minio_cont_resources["cpu"]
        nodequery["mru"] = math.ceil(self.minio_cont_resources["memory"] / 1024)
        self.master_node = j.sal.chatflow_deployer.ask_container_placement(self, self.pool_id, **nodequery)
        if not self.master_node:
            self.master_node = j.sal.chatflow_deployer.schedule_container(self.pool_id, **nodequery)

        if self.mode == "Master/Salve":
            self.slave_node = j.sal.chatflow_deployer.ask_container_placement(self, self.pool_id, **nodequery)
            if not self.slave_node:
                self.slave_node = j.sal.chatflow_deployer.schedule_container(self.pool_id, **nodequery)

    @j.baseclasses.chatflow_step(title="Minio container IP")
    def master_ip_selection(self):
        self.network_view_copy = self.network_view.copy()
        result = j.sal.chatflow_deployer.add_network_node(
            self.network_view.name, self.master_node, self.pool_id, self.network_view_copy
        )
        if result:
            for wid in result["ids"]:
                success = j.sal.chatflow_deployer.wait_workload(wid, self)
                if not success:
                    raise StopChatFlow(f"Failed to add node {self.master_node.node_id} to network {wid}")
            self.network_view_copy = self.network_view_copy.copy()
        free_ips = self.network_view_copy.get_node_free_ips(self.master_node)
        self.master_ip_address = self.drop_down_choice("Please choose IP Address for your solution", free_ips)

    @j.baseclasses.chatflow_step(title="Minio container IP")
    def slave_ip_selection(self):
        if self.mode != "Master/Slave":
            return
        self.network_view_copy = self.network_view.copy()
        result = j.sal.chatflow_deployer.add_network_node(
            self.network_view.name, self.slave_node, self.pool_id, self.network_view_copy
        )
        if result:
            for wid in result["ids"]:
                success = j.sal.chatflow_deployer.wait_workload(wid, self)
                if not success:
                    raise StopChatFlow(f"Failed to add node {self.slave_node.node_id} to network {wid}")
            self.network_view_copy = self.network_view_copy.copy()
        free_ips = self.network_view_copy.get_node_free_ips(self.slave_node)
        self.slave_ip_address = self.drop_down_choice("Please choose IP Address for your solution", free_ips)

    @j.baseclasses.chatflow_step(title="Confirmation")
    def overview(self):
        self.metadata = {
            "Solution Name": self.solution_name,
            "Solution Type": "minio",
            "Setup Type": self.mode,
            "Master IP": self.master_ip_address,
        }
        if self.mode == "Master/Slave":
            self.metadata["Slave IP"] = self.slave_ip_address
        self.md_show_confirm(self.metadata)

    @j.baseclasses.chatflow_step(title="Reserve zdb", disable_previous=True)
    def zdb_reservation(self):
        self.password = j.data.idgenerator.generateGUID()
        self.zdb_result = j.sal.chatflow_deployer.deploy_minio_zdb(
            pool_id=self.pool_id,
            password=self.password,
            zdb_no=self.zdb_number,
            **self.metadata,
            solution_uuid=self.solution_id,
        )
        for resv_id in self.zdb_result:
            success = j.sal.chatflow_deployer.wait_workload(resv_id, self)
            if not success:
                j.sal.chatflow_solutions.cancel_solution([resv_id])
                raise StopChatFlow(f"failed to deploy zdb workload {resv_id}")

    @j.baseclasses.chatflow_step(title="Reserve minio container", disable_previous=True)
    def minio_reservation(self):
        zdb_configs = []
        for zid in self.zdb_result:
            zdb_configs.append(j.sal.chatflow_deployer.get_zdb_url(zid, self.password))

        metadata = {
            "name": self.solution_name,
            "form_info": {
                "chatflow": "minio",
                "Solution name": self.solution_name,
                "Master IP": self.master_ip_address,
                "ZDB URLS": zdb_configs,
            },
        }
        minio_nodes = [self.master_node]
        minio_ip_addresses = [self.master_ip_address]

        if self.mode == "Master/Slave":
            metadata["form_info"]["Slave IP"] = self.slave_ip_address
            minio_nodes.append(self.slave_node)
            minio_ip_addresses.append(self.slave_ip_address)

        self.minio_result = j.sal.chatflow_deployer.deploy_minio_containers(
            pool_id=self.pool_id,
            network_name=self.network_view.name,
            minio_nodes=[n.node_id for n in minio_nodes],
            minio_ip_addresses=minio_ip_addresses,
            zdb_configs=zdb_configs,
            ak=self.ak,
            sk=self.sk,
            ssh_key=self.public_ssh_key,
            cpu=self.minio_cont_resources["cpu"],
            memory=self.minio_cont_resources["memory"],
            data=self.data,
            parity=self.parity,
            disk_type="SSD",
            disk_size=1,
            log_config=self.log_config,
            mode=self.mode,
            **metadata,
            solution_uuid=self.solution_id,
        )
        for resv_id in self.minio_result:
            success = j.sal.chatflow_deployer.wait_workload(resv_id)
            if not success:
                j.sal.chatflow_solutions.cancel_solution([resv_id])
                raise StopChatFlow(f"Failed to deploy Minio container workload {resv_id}")

    @j.baseclasses.chatflow_step(title="Success", disable_previous=True)
    def success(self):
        res = f"""\
                # Minio cluster has been deployed successfully.
                Open your browser at [http://{self.master_ip_address}:9000](http://{self.master_ip_address}:9000). It may take a few minutes.
                """
        if self.user_form_data["Setup type"] == "Master/Slave Setup":
            res += f"""\
                You can access the slave machine at [http://{self.slave_ip_address}:9000](http://{self.slave_ip_address}:9000)
                """
        self.md_show(j.core.text.strip(res))


chat = MinioDeploy
