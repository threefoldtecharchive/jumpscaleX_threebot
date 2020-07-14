from Jumpscale import j
import math
from Jumpscale.servers.gedis.GedisChatBot import StopChatFlow


class GiteaDeploy(j.servers.chatflow.get_class()):
    """
    gitea container deploy
    """

    steps = []

    @j.baseclasses.chatflow_step()
    def gitea_start(self):
        self.user_form_data = dict()
        self.HUB_URL = "https://hub.grid.tf/tf-official-apps/gitea-latest.flist"
        user_info = self.user_info()
        j.sal.reservation_chatflow.validate_user(user_info)
        self.md_show("# This wizard wil help you deploy an gitea container", md=True)
        self.query = {"mru": math.ceil(1024 / 1024), "cru": 2, "sru": 6}

    @j.baseclasses.chatflow_step(title="Solution name")
    def gitea_name(self):
        self.solution_name = j.sal.chatflow_deployer.ask_name(self)

    @j.baseclasses.chatflow_step(title="Pool")
    def select_pool(self):
        # FIXME: properly calculate cu and su
        self.pool_id = j.sal.chatflow_deployer.select_pool(self, cu=None, su=None)

    @j.baseclasses.chatflow_step(title="Network")
    def gitea_network(self):
        self.network_view = j.sal.chatflow_deployer.select_network(self, self.pool_id)

    @j.baseclasses.chatflow_step(title="Access keys")
    def public_key_get(self):
        self.public_key = self.upload_file(
            """Please add your public ssh key, this will allow you to access the deployed container using ssh.
                    Just upload the file with the key""",
            required=True,
        ).split("\n")[0]

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
            "Please add the secret for your gitea database. Make sure not to lose it", default="postgres", required=True
        )
        repository_name = form.string_ask(
            "Please add the name of repository in your gitea", default="myrepo", required=True
        )
        form.ask()
        self.database_name = database_name.value
        self.database_user = database_user.value
        self.database_password = database_password.value
        self.repository_name = repository_name.value

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

    @j.baseclasses.chatflow_step(title="Container node id")
    def container_node_id(self):
        self.selected_node = j.sal.chatflow_deployer.ask_container_placement(self, self.pool_id, **self.query)
        if not self.selected_node:
            self.selected_node = j.sal.chatflow_deployer.schedule_container(self.pool_id, **self.query)

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
            "IP Address": self.ip_address,
        }
        self.md_show_confirm(self.metadata)

    @j.baseclasses.chatflow_step(title="Reservation")
    def reservation(self):
        var_dict = {
            "pub_key": self.public_key,
            "POSTGRES_DB": self.database_name,
            "DB_TYPE": "postgres",
            "DB_HOST": f"{self.ip_address}:5432",
            "POSTGRES_USER": self.database_user,
            "APP_NAME": self.repository_name,
            "ROOT_URL": f"http://{self.ip_address}:3000",
        }
        metadata = {"name": self.solution_name, "form_info": {"name": self.solution_name, "chatflow": "gitea",}}
        metadata["form_info"].update(var_dict)

        self.resv_id = j.sal.chatflow_deployer.deploy_container(
            pool_id=self.pool_id,
            node_id=self.selected_node.node_id,
            network_name=self.network_view.name,
            ip_address=self.ip_address,
            flist=self.HUB_URL,
            cpu=2,
            memory=1024,
            env=var_dict,
            interactive=False,
            entrypoint="/start_gitea.sh",
            log_config=self.log_config,
            public_ipv6=True,
            secret_env={"POSTGRES_PASSWORD": self.database_password},
            **metadata,
        )
        success = j.sal.chatflow_deployer.wait_workload(self.resv_id, self)
        if not success:
            raise StopChatFlow(f"Failed to deploy workload {self.resv_id}")

    @j.baseclasses.chatflow_step(title="Success", disable_previous=True)
    def container_acess(self):
        res = f"""\
                # gitea has been deployed successfully: your reservation id is: {self.resv_id}
                To connect ```ssh git@{self.ip_address}``` .It may take a few minutes.
                open gitea from browser at ```{self.ip_address}:3000```
                """
        self.md_show(j.core.text.strip(res), md=True)


chat = GiteaDeploy
