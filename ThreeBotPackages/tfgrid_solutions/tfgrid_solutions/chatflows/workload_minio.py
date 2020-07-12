from Jumpscale import j
import math


class MinioDeploy(j.servers.chatflow.get_class()):
    @j.baseclasses.chatflow_step(title="")
    def deployment_start(self):
        self.user_info = self.user_info()
        j.sal.reservation_chatflow.validate_user(self.user_info)
        self.user_form_data = {}
        self.user_form_data["chatflow"] = "minio"
        self.md_show("# This wizard will help you deploy a minio cluster")

    @j.baseclasses.chatflow_step(title="Solution name")
    def minio_name(self):
        self.solution_name = j.sal.chatflow_deployer.ask_name(self)

    @j.baseclasses.chatflow_step(title="Setup type")
    def setup_type(self):
        self.user_form_data["Setup type"] = self.drop_down_choice(
            "Please choose the type of setup you need. Single setup is the basic setup while master/slave setup includes TLOG use to be able to reconstruct the metadata",
            ["Single Setup", "Master/Slave Setup"],
            required=True,
            default="Single Setup",
        )

    @j.baseclasses.chatflow_step(title="Storage")
    def storage_type(self):
        self.user_form_data["Disk type"] = self.drop_down_choice(
            "Please choose a the type of disk for zdb", ["SSD", "HDD"], required=True, default="SSD"
        )

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

        self.user_form_data["Access key"] = accesskey.value
        self.user_form_data["Secret"] = secret.value

    @j.baseclasses.chatflow_step(title="Container resources")
    def container_resources(self):
        resources = j.sal.chatflow_deployer.ask_container_resources(self, disk_size=False)
        self.user_form_data["CPU"] = resources["cpu"]
        self.user_form_data["Memory"] = resources["memory"]

    @j.baseclasses.chatflow_step(title="Pool")
    def select_pool(self):
        # FIXME: properly calculate cu and su
        cu = self.user_form_data["CPU"]
        su = self.user_form_data["Memory"]
        self.pool_id = j.sal.chatflow_deployer.select_pool(self, cu, su)

    @j.baseclasses.chatflow_step(title="Network")
    def minio_network(self):
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


chat = MinioDeploy
