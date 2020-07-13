from Jumpscale import j
import uuid

kinds = ["minio", "kubernetes", "flist", "ubuntu"]

domain_types = ["delegate", "managed", "custom"]

ports = {"minio": 9000, "kubernetes": 6443}


class SolutionExpose(j.servers.chatflow.get_class()):
    @j.baseclasses.chatflow_step(title="")
    def deployment_start(self):
        self.user_form_data = {}
        user_info = self.user_info()
        j.sal.reservation_chatflow.validate_user(user_info)
        self.md_show("# This wizard will help you expose a deployed solution using the web gateway")

    @j.baseclasses.chatflow_step(title="Solution type")
    def solution_type(self):
        self.kind = self.single_choice("Please choose the solution type")
        solutions = {}


chat = SolutionExpose
