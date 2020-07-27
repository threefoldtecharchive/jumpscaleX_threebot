from Jumpscale import j
import uuid
from Jumpscale.servers.gedis.GedisChatBot import StopChatFlow


class KubernetesDeploy(j.servers.chatflow.get_class()):
    steps = [
        "deployment_start",
        "kubernetes_name",
        "public_key_get",
        "choose_flavor",
        "select_pool",
        "network_selection",
        "nodes_selection",
        "ip_selection",
        "overview",
        "reservation",
        "success",
    ]

    @j.baseclasses.chatflow_step()
    def deployment_start(self):
        self.solution_id = uuid.uuid4().hex
        user_info = self.user_info()
        j.sal.reservation_chatflow.validate_user(user_info)
        self.md_show("# This wizard will help you deploy a kubernetes cluster")

    @j.baseclasses.chatflow_step(title="Solution name")
    def kubernetes_name(self):
        valid = False
        while not valid:
            self.solution_name = j.sal.chatflow_deployer.ask_name(self)
            solutions = j.sal.chatflow_solutions.list_kubernetes_solutions(sync=False)
            valid = True
            for sol in solutions:
                if sol["Name"] == self.solution_name:
                    valid = False
                    self.md_show("The specified solution name already exists. please choose another.")
                    break
                valid = True

    @j.baseclasses.chatflow_step(title="Access keys and secret")
    def public_key_get(self):
        self.ssh_keys = self.upload_file(
            """Please add your public ssh key, this will allow you to access the deployed containers using ssh.
                Just upload the file with the key.
                Note: please use keys compatible with Dropbear server eg: rsa """,
            required=True,
        ).split("\n")

        self.cluster_secret = self.string_ask("Please add the cluster secret", default="secret")

    @j.baseclasses.chatflow_step(title="Master and Worker flavors")
    def choose_flavor(self):
        form = self.new_form()
        sizes = ["1 vCPU 2 GiB ram 50GiB disk space", "2 vCPUs 4 GiB ram 100GiB disk space"]
        cluster_size_string = form.drop_down_choice("Choose the size of your nodes", sizes, default=sizes[0])

        self.workernodes = form.int_ask(
            "Please specify the number of worker nodes", default=1, required=True, min=1
        )  # minimum should be 1

        form.ask()
        self.cluster_size = sizes.index(cluster_size_string.value) + 1

    @j.baseclasses.chatflow_step(title="Pool")
    def select_pool(self):
        if self.cluster_size == 1:
            self.master_query = self.worker_query = {"sru": 50, "mru": 2, "cru": 1}
        else:
            self.master_query = self.worker_query = {"sru": 100, "mru": 4, "cru": 2}
        cu, su = j.sal.chatflow_deployer.calculate_capacity_units(**self.master_query)
        cu = cu * (1 + self.workernodes.value)
        su = su * (1 + self.workernodes.value)
        self.pool_id = j.sal.chatflow_deployer.select_pool(self, cu=cu, su=su)

    @j.baseclasses.chatflow_step(title="Network")
    def network_selection(self):
        self.network_view = j.sal.chatflow_deployer.select_network(self, self.pool_id)

    @j.baseclasses.chatflow_step(title="Containers' node id")
    def nodes_selection(self):
        # select master node
        self.nodes_selected = []
        master_node_selected = j.sal.chatflow_deployer.ask_container_placement(
            self, self.pool_id, workload_name="master", **self.master_query
        )
        if not master_node_selected:
            master_node_selected = j.sal.chatflow_deployer.schedule_container(self.pool_id, **self.master_query)
        self.nodes_selected.append(master_node_selected)

        # select workers nodes
        for idx in range(self.workernodes.value):
            worker_node_selected = j.sal.chatflow_deployer.ask_container_placement(
                self, self.pool_id, workload_name=f"worker {idx+1}", **self.worker_query
            )
            if not worker_node_selected:
                worker_node_selected = j.sal.chatflow_deployer.schedule_container(self.pool_id, **self.worker_query)
            self.nodes_selected.append(worker_node_selected)

    @j.baseclasses.chatflow_step(title="IP selection")
    def ip_selection(self):
        # Note:  nodes_selected[0] = master node

        # select master IP
        self.ipaddresses = []
        self.master_network = self.network_view.copy()
        result = j.sal.chatflow_deployer.add_network_node(
            self.network_view.name, self.nodes_selected[0], self.pool_id, self.master_network
        )
        if result:
            for wid in result["ids"]:
                success = j.sal.chatflow_deployer.wait_workload(wid, self)
                if not success:
                    raise StopChatFlow(f"Failed to add node {self.nodes_selected[0].node_id} to network {wid}")
        self.master_network = self.master_network.copy()
        free_ips = self.master_network.get_node_free_ips(self.nodes_selected[0])
        master_ipaddress = self.drop_down_choice("Please choose IP Address for your master node container", free_ips)
        self.ipaddresses.append(master_ipaddress)

        latest_network = self.master_network
        # select workers IPs
        for idx, worker_node in enumerate(self.nodes_selected[1:]):
            self.network_copy = latest_network.copy()
            result = j.sal.chatflow_deployer.add_network_node(
                latest_network.name, worker_node, self.pool_id, self.network_copy
            )
            if result:
                for wid in result["ids"]:
                    success = j.sal.chatflow_deployer.wait_workload(wid, self)
                    if not success:
                        raise StopChatFlow(f"Failed to add node {worker_node.node_id} to network {wid}")
                self.network_copy = self.network_copy.copy()
            free_ips = self.network_copy.get_node_free_ips(worker_node)
            worker_ipaddress = self.drop_down_choice(
                f"Please choose IP Address for your worker {idx+1} node container", free_ips
            )
            self.ipaddresses.append(worker_ipaddress)
            latest_network = self.network_copy  # update latest_network variable

    @j.baseclasses.chatflow_step(title="Confirmation")
    def overview(self):
        self.metadata = {
            "Solution name": self.solution_name,
            "Network": self.network_view.name,
            "Masters count": 1,
            "Slaves count": self.workernodes.value,
            "Cluster size": self.cluster_size,
            "Cluster secret": self.cluster_secret,
            "Nodes IP Addresses": self.ipaddresses,
        }
        self.md_show_confirm(self.metadata)

    @j.baseclasses.chatflow_step(title="Cluster reservations", disable_previous=True)
    def reservation(self):
        self.network = self.network_copy
        metadata = {
            "name": self.solution_name,
            "form_info": {"chatflow": "kubernetes", "Solution name": self.solution_name},
        }
        metadata["form_info"].update(self.metadata)
        self.reservations = j.sal.chatflow_deployer.deploy_kubernetes_cluster(
            self.pool_id,
            [n.node_id for n in self.nodes_selected],
            self.network.name,
            self.cluster_secret,
            self.ssh_keys,
            size=self.cluster_size,
            ip_addresses=self.ipaddresses,
            **metadata,
            solution_uuid=self.solution_id,
        )

        for resv in self.reservations:
            success = j.sal.chatflow_deployer.wait_workload(resv["reservation_id"], self)
            if not success:
                j.sal.chatflow_solutions.cancel_solution([resv["reservation_id"]])
                raise StopChatFlow(f"Failed to deploy workload {resv['reservation_id']}")

    @j.baseclasses.chatflow_step(title="Success", disable_previous=True)
    def success(self):
        res = f"""# Kubernetes cluster has been deployed successfully:
            Master reservation id is: {self.reservations[0]["reservation_id"]}
            IP: {self.reservations[0]["ip_address"]}
            To connect ssh rancher@{self.reservations[0]["ip_address"]}
        """
        for idx, resv in enumerate(self.reservations[1:]):
            res += f"""Worker {idx} reservation id is: {resv["reservation_id"]}
                IP: {resv["ip_address"]}
                To connect ssh rancher@{resv["ip_address"]}
            """
        self.md_show(res)


chat = KubernetesDeploy
