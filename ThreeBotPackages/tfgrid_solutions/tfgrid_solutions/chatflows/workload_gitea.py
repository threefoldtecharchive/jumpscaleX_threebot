from Jumpscale import j
import math


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


chat = GiteaDeploy
