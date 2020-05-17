from Jumpscale import j
import math


class GiteaDeploy(j.servers.chatflow.get_class()):
    """
    gitea container deploy
    """

    steps = [
        "gitea_start",
        "gitea_network",
        "gitea_solution_name",
        "public_key_get",
        "expiration_time",
        "gitea_credentials",
        "container_node_id",
        "container_farm",
        "container_ip",
        "container_pay",
        "container_acess",
    ]

    @j.baseclasses.chatflow_step()
    def gitea_start(self):
        self.user_form_data = dict()
        self.HUB_URL = "https://hub.grid.tf/tf-official-apps/gitea-latest.flist"
        self.model = j.threebot.packages.tfgrid_solutions.tfgrid_solutions.bcdb_model_get("tfgrid.solutions.gitea.1")
        user_info = self.user_info()
        self.user_form_data["chatflow"] = "gitea"
        j.sal.reservation_chatflow.validate_user(user_info)
        self.md_show("# This wizard wil help you deploy an gitea container", md=True)

    @j.baseclasses.chatflow_step(title="Network")
    def gitea_network(self):
        self.network = j.sal.reservation_chatflow.network_select(self, j.me.tid)
        self.currency = self.network.currency

    @j.baseclasses.chatflow_step(title="Solution name")
    def gitea_solution_name(self):
        self.user_form_data["Solution name"] = j.sal.reservation_chatflow.solution_name_add(self, self.model)

    @j.baseclasses.chatflow_step(title="Access keys")
    def public_key_get(self):
        self.user_form_data["Public key"] = self.upload_file(
            """Please add your public ssh key, this will allow you to access the deployed container using ssh.
                    Just upload the file with the key""",
            required=True,
        ).split("\n")[0]

    @j.baseclasses.chatflow_step(title="Expiration time")
    def expiration_time(self):
        self.expiration = self.datetime_picker(
            "Please enter solution expiration time.",
            required=True,
            min_time=[3600, "Date/time should be at least 1 hour from now"],
            default=j.data.time.epoch + 3900,
        )
        self.user_form_data["Solution expiration"] = j.data.time.secondsToHRDelta(self.expiration - j.data.time.epoch)

    @j.baseclasses.chatflow_step(title="Database credentials & Repository name")
    def gitea_credentials(self):
        form = self.new_form()
        database_name = form.string_ask("Please add the database name of your gitea", default="postgres", required=True)
        database_user = form.string_ask(
            "Please add the username for your gitea database. Make sure not to lose it",
            default="postgres",
            required=True,
        )
        database_password = form.string_ask(
            "Please add the secret for your gitea database. Make sure not to lose it",
            default="postgres",
            required=True,
        )
        repository_name = form.string_ask(
            "Please add the name of repository in your gitea", default="myrepo", required=True
        )
        form.ask()
        self.user_form_data["Database Name"] = database_name.value
        self.user_form_data["Database User"] = database_user.value
        self.user_form_data["Database Password"] = database_password.value
        self.user_form_data["Repository"] = repository_name.value

    @j.baseclasses.chatflow_step(title="Container node id")
    def container_node_id(self):
        self.query = {"mru": math.ceil(1024 / 1024), "cru": 2, "hru": 5, "sru": 1}
        # create new reservation
        self.reservation = j.sal.zosv2.reservation_create()
        self.nodeid = self.string_ask(
            "Please enter the node id you would like to deploy on if left empty a node will be chosen for you"
        )
        while self.nodeid:
            try:
                self.node_selected = j.sal.reservation_chatflow.validate_node(self.nodeid, self.query, self.currency)
                break
            except (j.exceptions.Value, j.exceptions.NotFound) as e:
                message = "<br> Please enter a different node id to deploy on or leave it empty"
                self.nodeid = self.string_ask(str(e) + message, html=True, retry=True)
        self.query["currency"] = self.currency

    @j.baseclasses.chatflow_step(title="Container farm")
    def container_farm(self):
        if not self.nodeid:
            farms = j.sal.reservation_chatflow.farm_names_get(1, self, **self.query)
            self.node_selected = j.sal.reservation_chatflow.nodes_get(1, farm_names=farms, **self.query)[0]

    @j.baseclasses.chatflow_step(title="Container IP & Confirmation about conatiner details", disable_previous=True)
    def container_ip(self):
        self.network.add_node(self.node_selected)
        self.ip_address = self.network.ask_ip_from_node(
            self.node_selected, "Please choose IP Address for your solution"
        )
        self.user_form_data["IP Address"] = self.ip_address
        self.md_show_confirm(self.user_form_data)

    @j.baseclasses.chatflow_step(title="Payment", disable_previous=True)
    def container_pay(self):
        var_dict = {
            "pub_key": self.user_form_data["Public key"],
            "POSTGRES_DB": self.user_form_data["Database Name"],
            "DB_TYPE": "postgres",
            "DB_HOST": f"{self.ip_address}:5432",
            "POSTGRES_USER": self.user_form_data["Database User"],
            "APP_NAME": self.user_form_data["Repository"],
            "ROOT_URL": f"http://{self.ip_address}:3000",
        }
        database_password_encrypted = j.sal.zosv2.container.encrypt_secret(
            self.node_selected.node_id, self.user_form_data["Database Password"]
        )
        secret_env = {"POSTGRES_PASSWORD": database_password_encrypted}
        self.network.update(j.me.tid, currency=self.currency, bot=self)
        storage_url = "zdb://hub.grid.tf:9900"
        entry_point = "/start_gitea.sh"

        # create container
        j.sal.zosv2.container.create(
            reservation=self.reservation,
            node_id=self.node_selected.node_id,
            network_name=self.network.name,
            ip_address=self.ip_address,
            flist=self.HUB_URL,
            storage_url=storage_url,
            env=var_dict,
            interactive=False,
            entrypoint=entry_point,
            cpu=2,
            public_ipv6=True,
            memory=1024,
            secret_env=secret_env,
        )
        metadata = dict()
        metadata["chatflow"] = self.user_form_data["chatflow"]
        metadata["Solution name"] = self.user_form_data["Solution name"]
        metadata["Solution expiration"] = self.user_form_data["Solution expiration"]
        metadata["Database name"] = self.user_form_data["Database Name"]
        metadata["Database user"] = self.user_form_data["Database User"]
        metadata["Database password"] = self.user_form_data["Database Password"]
        metadata["Repository"] = self.user_form_data["Repository"]

        res = j.sal.reservation_chatflow.solution_model_get(
            self.user_form_data["Solution name"], "tfgrid.solutions.gitea.1", metadata
        )
        self.reservation = j.sal.reservation_chatflow.reservation_metadata_add(self.reservation, res)
        self.resv_id = j.sal.reservation_chatflow.reservation_register_and_pay(
            self.reservation, self.expiration, customer_tid=j.me.tid, currency=self.currency, bot=self
        )

        j.sal.reservation_chatflow.reservation_save(
            self.resv_id, self.user_form_data["Solution name"], "tfgrid.solutions.gitea.1", self.user_form_data
        )

    @j.baseclasses.chatflow_step(title="Success", disable_previous=True)
    def container_acess(self):
        res = f"""\
            # gitea has been deployed successfully: your reservation id is: {self.resv_id}
            To connect ```ssh git@{self.ip_address}``` .It may take a few minutes.
            open gitea from browser at ```{self.ip_address}:3000```
            """
        self.md_show(j.core.text.strip(res), md=True)


chat = GiteaDeploy
