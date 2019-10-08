from Jumpscale import j

THREEBOT_DOMAIN = "3bot.grid.tf"
PHONEBOOK_DOMAIN = f"phonebook.{THREEBOT_DOMAIN}"
GATEWAY_DOMAIN = f"gateway.{THREEBOT_DOMAIN}"


class namemanager(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        self.phonebook = j.clients.gedis.get(host=PHONEBOOK_DOMAIN, port=8901)

    def domain_register(self, doublename, privateip, signature, user_session=None):
        """
        Registers a domain in coredns (needs to be authoritative)

        ```in
        doublename = (S) # 3bot doublename
        privateip = (S)
        signature = (S) the signature of the payload "{doublename}{privateip}"
        ```
        """
        payload = f"{doublename}{privateip}"
        self.phonebook.actors.phonebook.validate_signature(name=doublename, payload=payload, signature=signature)

        first, last = doublename.split(".")
        fqdn = f"{doublename}.{THREEBOT_DOMAIN}"
        j.tools.tf_gateway.tcpservice_register(fqdn, fqdn, privateip)
        j.tools.tf_gateway.domain_register_cname(first, f"{last}.{THREEBOT_DOMAIN}", GATEWAY_DOMAIN)
        return True
