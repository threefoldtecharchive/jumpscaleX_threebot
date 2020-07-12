from Jumpscale import j
import uuid

kinds = {
    "minio": "tfgrid.solutions.minio.1",
    "kubernetes": "tfgrid.solutions.kubernetes.1",
    "ubuntu": "tfgrid.solutions.ubuntu.1",
    "flist": "tfgrid.solutions.flist.1",
}

domain_types = {
    "delegate": "tfgrid.workloads.reservation.gateway.delegate.1",
    "sub": "tfgrid.workloads.reservation.gateway.subdomain.1",
}

ports = {"minio": 9000, "kubernetes": 6443}


class SolutionExpose(j.servers.chatflow.get_class()):
    @j.baseclasses.chatflow_step(title="")
    def deployment_start(self):
        self.user_form_data = {}
        user_info = self.user_info()
        j.sal.reservation_chatflow.validate_user(user_info)
        self.md_show("# This wizard will help you expose a deployed solution using the web gateway")


chat = SolutionExpose
