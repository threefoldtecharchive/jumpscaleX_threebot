from Jumpscale import j
import math
import requests
from Jumpscale.servers.gedis.GedisChatBot import StopChatFlow


class FlistDeploy(j.servers.chatflow.get_class()):
    steps = [
        "flist_start",
        "flist_network",
        "flist_solution_name",
        "flist_url",
        "container_resources",
        "container_interactive",
        "container_env",
        "container_farm",
        "expiration_time",
        "container_ip",
        "overview",
        "container_pay",
        "container_acess",
    ]

    @j.baseclasses.chatflow_step()
    def flist_start(self):
        user_info = self.user_info()
        self.user_form_data = dict()
        self.model = j.threebot.packages.tfgrid_solutions.tfgrid_solutions.bcdb_model_get("tfgrid.solutions.flist.1")
        self.env = dict()
        self.user_form_data["chatflow"] = "flist"
        j.sal.reservation_chatflow.validate_user(user_info)
        self.md_show("# This wizard will help you deploy a container using any flist provided", md=True)

    @j.baseclasses.chatflow_step(title="Network")
    def flist_network(self):
        self.network = j.sal.reservation_chatflow.network_select(self, j.me.tid)
        self.currency = self.network.currency

    @j.baseclasses.chatflow_step(title="Solution name")
    def flist_solution_name(self):
        self.user_form_data["Solution name"] = j.sal.reservation_chatflow.solution_name_add(self, self.model)

    @j.baseclasses.chatflow_step(title="Flist url")
    def flist_url(self):
        self.user_form_data["Flist link"] = self.string_ask(
            "Please add the link to your flist to be deployed. For example: https://hub.grid.tf/usr/example.flist",
            required=True,
        )

        if "hub.grid.tf" not in self.user_form_data["Flist link"]:
            raise StopChatFlow(
                "This flist is not correct. Please make sure you enter a valid link to an existing flist"
            )

        response = requests.head(self.user_form_data["Flist link"])
        if response.status_code != 200:
            raise StopChatFlow("This flist doesn't exist. Please make sure you enter a valid link to an existing flist")

    @j.baseclasses.chatflow_step(title="Container resources")
    def container_resources(self):
        form = self.new_form()
        self.cpu = form.int_ask("Please add how many CPU cores are needed", default=1)
        self.memory = form.int_ask("Please add the amount of memory in MB", default=1024)
        form.ask()
        self.user_form_data["CPU"] = self.cpu.value
        self.user_form_data["Memory"] = self.memory.value

    @j.baseclasses.chatflow_step(title="Container ineractive & EntryPoint")
    def container_interactive(self):
        self.user_form_data["Interactive"] = self.single_choice(
            "Would you like access to your container through the web browser (coreX)?", ["YES", "NO"], required=True
        )
        if self.user_form_data["Interactive"] == "NO":
            self.user_form_data["Entry point"] = self.string_ask("Please add your entrypoint for your flist")
        else:
            self.user_form_data["Port"] = "7681"
            self.user_form_data["Entry point"] = ""

    @j.baseclasses.chatflow_step(title="Environment variables")
    def container_env(self):
        self.user_form_data["Env variables"] = self.string_ask(
            """To set environment variables on your deployed container, enter comma-separated variable=value
            For example: var1=value1, var2=value2.
            Leave empty if not needed"""
        )
        if self.user_form_data["Env variables"]:
            var_list = self.user_form_data["Env variables"].split(",")
            var_dict = {}
            for item in var_list:
                splitted_item = item.split("=")
                if len(splitted_item) == 2:
                    var_dict[splitted_item[0]] = splitted_item[1]

            self.env.update(var_dict)

    @j.baseclasses.chatflow_step(title="Container farm")
    def container_farm(self):
        # create new reservation
        self.reservation = j.sal.zosv2.reservation_create()
        mru = math.ceil(self.memory.value / 1024)
        cru = self.cpu.value
        sru = 1  # needed space for a container is 250MiB
        farms = j.sal.reservation_chatflow.farm_names_get(1, self, mru=mru, cru=cru, sru=sru, currency=self.currency)
        self.node = j.sal.reservation_chatflow.nodes_get(
            1, farm_names=farms, mru=mru, cru=cru, sru=sru, currency=self.currency
        )[0]

    @j.baseclasses.chatflow_step(title="Expiration time")
    def expiration_time(self):
        self.expiration = self.datetime_picker(
            "Please enter solution expiration time.",
            required=True,
            min_time=[3600, "Date/time should be at least 1 hour from now"],
            default=j.data.time.epoch + 3900,
        )
        self.user_form_data["Solution expiration"] = j.data.time.secondsToHRDelta(self.expiration - j.data.time.epoch)

    @j.baseclasses.chatflow_step(title="Container IP & Confirmation about conatiner details")
    def container_ip(self):
        self.network_copy = self.network.copy(j.me.tid)
        self.network_copy.add_node(self.node)
        self.ip_address = self.network_copy.ask_ip_from_node(
            self.node, "Please choose your IP Address for this solution"
        )
        self.user_form_data["IP Address"] = self.ip_address

        self.conatiner_flist = self.user_form_data["Flist link"]
        self.storage_url = "zdb://hub.grid.tf:9900"
        if self.user_form_data["Interactive"] == "YES":
            self.interactive = True
        else:
            self.interactive = False

    @j.baseclasses.chatflow_step(title="Confirmation")
    def overview(self):
        self.md_show_confirm(self.user_form_data)

    @j.baseclasses.chatflow_step(title="Payment", disable_previous=True)
    def container_pay(self):
        self.network = self.network_copy
        # update network
        self.network.update(j.me.tid, currency=self.currency, bot=self)

        # create container
        j.sal.zosv2.container.create(
            reservation=self.reservation,
            node_id=self.node.node_id,
            network_name=self.network.name,
            ip_address=self.ip_address,
            flist=self.conatiner_flist,
            storage_url=self.storage_url,
            env=self.env,
            interactive=self.interactive,
            entrypoint=self.user_form_data["Entry point"],
            cpu=self.user_form_data["CPU"],
            memory=self.user_form_data["Memory"],
        )
        metadata = dict()
        metadata["chatflow"] = self.user_form_data["chatflow"]
        metadata["Solution name"] = self.user_form_data["Solution name"]
        metadata["Solution expiration"] = self.user_form_data["Solution expiration"]

        res = j.sal.reservation_chatflow.solution_model_get(
            self.user_form_data["Solution name"], "tfgrid.solutions.flist.1", metadata
        )
        reservation = j.sal.reservation_chatflow.reservation_metadata_add(self.reservation, res)
        self.resv_id = j.sal.reservation_chatflow.reservation_register_and_pay(
            reservation, self.expiration, customer_tid=j.me.tid, currency=self.currency, bot=self
        )
        j.sal.reservation_chatflow.reservation_save(
            self.resv_id, self.user_form_data["Solution name"], "tfgrid.solutions.flist.1", self.user_form_data
        )

    @j.baseclasses.chatflow_step(title="Success", disable_previous=True)
    def container_acess(self):
        if self.interactive:
            res = f"""\
                # Container has been deployed successfully: your reservation id is: {self.resv_id}
                Open your browser at [http://{self.ip_address}:7681](http://{self.ip_address}:7681)
                """
            self.md_show(j.core.text.strip(res), md=True)
        else:
            res = f"""\
                # Container has been deployed successfully: your reservation id is: {self.resv_id}
                Your IP is  ```{self.ip_address}```
                """
            self.md_show(j.core.text.strip(res), md=True)


chat = FlistDeploy
