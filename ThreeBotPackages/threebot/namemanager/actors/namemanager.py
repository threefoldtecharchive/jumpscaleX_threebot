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
        first, last = doublename.split(".")
        fqdn = f"{doublename}.{domain}"
        j.tools.tf_gateway.tcpservice_register(fqdn, fqdn, privateip)
        j.tools.tf_gateway.domain_register_cname(first, f"{last}.{domain}", gateway_domain)
        return True
