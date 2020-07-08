from Jumpscale import j
import math


class PoolCreate(j.servers.chatflow.get_class()):
    steps = ["pool_start", "reserve_pool", "pool_success"]

    @j.baseclasses.chatflow_step()
    def pool_start(self):
        user_info = self.user_info()
        j.sal.reservation_chatflow.validate_user(user_info)
        self.pools = j.sal.zosv2.pools.list()
        if not self.pools:
            self.action = "create"
        else:
            self.action = self.single_choice("Do you want to create a new pool or extend one?", ["create", "extend"])

    def reserve_pool(self):
        if self.action == "create":
            self.pool_data = j.sal.chatflow_deployer.create_pool(self)
        else:
            pool_id = j.sal.chatflow_deployer.select_pool(self)
            self.pool_data = j.sal.chatflow_deployer.extend_pool(self, pool_id)

    @j.baseclasses.chatflow_step()
    def pool_success(self):
        self.md_show(f"Pool Info:\n{self.pool_data}")


chat = PoolCreate
