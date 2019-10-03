from Jumpscale import j


class namemanager(j.baseclasses.threebot_actor):
    def domain_register(self, doublename, privateip, user_session=None):
        """
        Registers a domain in coredns (needs to be authoritative)

        ```in
        doublename = (S) # 3bot doublename
        privateip = (S)
        ```
        """
        domain = "3bot.grid.tf"
        gateway_domain = "gateway.3bot.grid.tf"
        j.tools.tf_gateway.tcpservice_register(doublename, domain, privateip)
        j.tools.tf_gateway.domain_register_cname(doublename, domain, gateway_domain)
        return True
