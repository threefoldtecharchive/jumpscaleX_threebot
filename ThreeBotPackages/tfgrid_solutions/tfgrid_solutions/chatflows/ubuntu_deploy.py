from Jumpscale import j
import math


class UbuntuDeploy(j.servers.chatflow.get_class()):
    steps = [
        "ubuntu_start",
        "ubuntu_network",
        "ubuntu_name",
        "ubuntu_version",
        "container_resources",
        "container_logs",
        "public_key_get",
        "container_node_id",
        "ubuntu_farm",
        "container_ip",
        "expiration_time",
        "overview",
        "container_pay",
        "ubuntu_acess",
    ]

    @j.baseclasses.chatflow_step()
    def ubuntu_start(self):
        self.user_form_data = dict()
        self.query = dict()
        self.HUB_URL = "https://hub.grid.tf/tf-bootable"
        self.IMAGES = ["ubuntu-18.04", "ubuntu-19.10", "ubuntu-20.04"]
        self.model = j.threebot.packages.tfgrid_solutions.tfgrid_solutions.bcdb_model_get("tfgrid.solutions.ubuntu.1")
        user_info = self.user_info()
        self.user_form_data["chatflow"] = "ubuntu"
        self.md_show("# This wizard will help you deploy an ubuntu container", md=True)
        j.sal.reservation_chatflow.validate_user(user_info)

    @j.baseclasses.chatflow_step(title="Network")
    def ubuntu_network(self):
        self.network = j.sal.reservation_chatflow.network_select(self, j.me.tid)

    @j.baseclasses.chatflow_step(title="Solution name")
    def ubuntu_name(self):
        self.user_form_data["Solution name"] = j.sal.reservation_chatflow.solution_name_add(self, self.model)

    @j.baseclasses.chatflow_step(title="Ubuntu version")
    def ubuntu_version(self):
        self.user_form_data["Version"] = self.single_choice("Please choose ubuntu version", self.IMAGES, required=True)

    @j.baseclasses.chatflow_step(title="Container resources")
    def container_resources(self):
        form = self.new_form()
        cpu = form.int_ask("Please add how many CPU cores are needed", default=1, required=True)
        memory = form.int_ask("Please add the amount of memory in MB", default=1024, required=True)
        self.rootfs_size = form.int_ask("Choose the amount of storage for your root filesystem in MiB", default=256)
        form.ask()
        self.user_form_data["CPU"] = cpu.value
        self.user_form_data["Memory"] = memory.value
        self.user_form_data["Root filesystem Size"] = self.rootfs_size.value

    @j.baseclasses.chatflow_step(title="Container logs")
    def container_logs(self):
        self.container_logs_option = self.single_choice(
            "Do you want to push the container logs (stdout and stderr) onto an external redis channel",
            ["YES", "NO"],
            default="NO",
        )
        if self.container_logs_option == "YES":
            form = self.new_form()
            self.channel_type = form.string_ask("Please add the channel type", default="redis", required=True)
            self.channel_host = form.string_ask(
                "Please add the IP address where the logs will be output to", required=True
            )
            self.channel_port = form.int_ask(
                "Please add the port available where the logs will be output to", required=True
            )
            self.channel_name = form.string_ask(
                "Please add the channel name to be used. The channels will be in the form NAME-stdout and NAME-stderr",
                default=self.user_form_data["Solution name"],
                required=True,
            )
            form.ask()
            self.user_form_data["Logs Channel type"] = self.channel_type.value
            self.user_form_data["Logs Channel host"] = self.channel_host.value
            self.user_form_data["Logs Channel port"] = self.channel_port.value
            self.user_form_data["Logs Channel name"] = self.channel_name.value

    @j.baseclasses.chatflow_step(title="Access keys")
    def public_key_get(self):
        self.user_form_data["Public key"] = self.upload_file(
            """Please add your public ssh key, this will allow you to access the deployed container using ssh.
                    Just upload the file with the key""",
            required=True,
        ).split("\n")[0]

    @j.baseclasses.chatflow_step(title="Container node id")
    def container_node_id(self):
        self.var_dict = {"pub_key": self.user_form_data["Public key"]}
        self.query["mru"] = math.ceil(self.user_form_data["Memory"] / 1024)
        self.query["cru"] = self.user_form_data["CPU"]
        storage_units = math.ceil(self.rootfs_size.value / 1024)
        self.query["sru"] = storage_units

        # create new reservation
        self.reservation = j.sal.zosv2.reservation_create()
        self.nodeid = self.string_ask(
            "Please enter the nodeid you would like to deploy on if left empty a node will be chosen for you"
        )
        while self.nodeid:
            try:
                self.node_selected = j.sal.reservation_chatflow.validate_node(
                    self.nodeid, self.query, self.network.currency
                )
                break
            except (j.exceptions.Value, j.exceptions.NotFound) as e:
                message = "<br> Please enter a different nodeid to deploy on or leave it empty"
                self.nodeid = self.string_ask(str(e) + message, html=True, retry=True)
        self.query["currency"] = self.network.currency

    @j.baseclasses.chatflow_step(title="Ubuntu container farm")
    def ubuntu_farm(self):
        if not self.nodeid:
            farms = j.sal.reservation_chatflow.farm_names_get(1, self, **self.query)
            self.node_selected = j.sal.reservation_chatflow.nodes_get(1, farm_names=farms, **self.query)[0]

    @j.baseclasses.chatflow_step(title="Container IP")
    def container_ip(self):
        self.network_copy = self.network.copy(j.me.tid)
        self.network_copy.add_node(self.node_selected)
        self.ip_address = self.network_copy.ask_ip_from_node(
            self.node_selected, "Please choose IP Address for your solution"
        )
        self.user_form_data["IP Address"] = self.ip_address

    @j.baseclasses.chatflow_step(title="Expiration time")
    def expiration_time(self):
        self.expiration = self.datetime_picker(
            "Please enter solution expiration time.",
            required=True,
            min_time=[3600, "Date/time should be at least 1 hour from now"],
            default=j.data.time.epoch + 3900,
        )
        self.user_form_data["Solution expiration"] = j.data.time.secondsToHRDelta(self.expiration - j.data.time.epoch)

    @j.baseclasses.chatflow_step(title="Confirmation")
    def overview(self):
        self.md_show_confirm(self.user_form_data)

    @j.baseclasses.chatflow_step(title="Payment", disable_previous=True)
    def container_pay(self):
        self.network = self.network_copy
        self.network.update(j.me.tid, currency=self.query["currency"], bot=self)
        container_flist = f"{self.HUB_URL}/3bot-{self.user_form_data['Version']}.flist"
        storage_url = "zdb://hub.grid.tf:9900"
        entry_point = "/bin/bash /start.sh"

        # create container
        cont = j.sal.zosv2.container.create(
            reservation=self.reservation,
            node_id=self.node_selected.node_id,
            network_name=self.network.name,
            ip_address=self.ip_address,
            flist=container_flist,
            storage_url=storage_url,
            disk_type="SSD",
            disk_size=self.rootfs_size.value,
            env=self.var_dict,
            interactive=False,
            entrypoint=entry_point,
            cpu=self.user_form_data["CPU"],
            memory=self.user_form_data["Memory"],
        )
        if self.container_logs_option == "YES":
            j.sal.zosv2.container.add_logs(
                cont,
                channel_type=self.user_form_data["Logs Channel type"],
                channel_host=self.user_form_data["Logs Channel host"],
                channel_port=self.user_form_data["Logs Channel port"],
                channel_name=self.user_form_data["Logs Channel name"],
            )
        metadata = dict()
        metadata["chatflow"] = self.user_form_data["chatflow"]
        metadata["Solution name"] = self.user_form_data["Solution name"]
        metadata["Version"] = self.user_form_data["Version"]
        metadata["Solution expiration"] = self.user_form_data["Solution expiration"]

        res = j.sal.reservation_chatflow.solution_model_get(
            self.user_form_data["Solution name"], "tfgrid.solutions.ubuntu.1", metadata
        )
        reservation = j.sal.reservation_chatflow.reservation_metadata_add(self.reservation, res)
        self.resv_id = j.sal.reservation_chatflow.reservation_register_and_pay(
            reservation, self.expiration, customer_tid=j.me.tid, currency=self.query["currency"], bot=self
        )

        j.sal.reservation_chatflow.reservation_save(
            self.resv_id, self.user_form_data["Solution name"], "tfgrid.solutions.ubuntu.1", self.user_form_data
        )

    @j.baseclasses.chatflow_step(title="Success", disable_previous=True)
    def ubuntu_acess(self):
        res = f"""\
            # Ubuntu has been deployed successfully: your reservation id is: {self.resv_id}
            To connect ```ssh root@{self.ip_address}``` .It may take a few minutes.
            """
        self.md_show(j.core.text.strip(res), md=True)


chat = UbuntuDeploy
