from Jumpscale import j

THREEBOT_DOMAIN = "3bot.grid.tf"
THREEBOT_PRIVATE_DOMAIN = "3bot"
PHONEBOOK_DOMAIN = f"phonebook.{THREEBOT_DOMAIN}"
GATEWAY_DOMAIN = f"gateway.{THREEBOT_DOMAIN}"
MASTERIP = "192.168.99.254"


class namemanager(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        self.phonebook = j.clients.gedis.get(host=PHONEBOOK_DOMAIN, port=8901)
        redisclient = j.clients.redis.get(MASTERIP)
        self.tfgateway = j.tools.tf_gateway.get(redisclient)

    def domain_register(self, doublename, privateip, signature, user_session=None):
        """
        Registers a domain in coredns (needs to be authoritative)

        ```in
        doublename = (S) # 3bot doublename
        privateip = (S)
        signature = (S) the signature of the payload "{doublename}"
        ```
        """
        result = self.phonebook.actors.phonebook.validate_signature(
            name=doublename, payload=doublename, signature=signature
        )
        if not result.is_valid:
            raise j.exceptions.Value("Invalid signature")

        fqdn = f"{doublename}.{THREEBOT_DOMAIN}"
        self.tfgateway.tcpservice_register(fqdn, fqdn, privateip)

        gateway_records = self.tfgateway.subdomain_get(THREEBOT_DOMAIN, "gateway")
        a_records_ips = [r["ip"] for r in gateway_records["a"]]

        self.tfgateway.domain_register_a(doublename, THREEBOT_DOMAIN, a_records_ips)
        self.tfgateway.domain_register_a(doublename, THREEBOT_PRIVATE_DOMAIN, privateip)
        return True

    def subdomain_register(self, doublename, subdomain, signature, user_session=None):
        """
        Registers a domain in coredns (needs to be authoritative)

        ```in
        doublename = (S) # 3bot doublename
        subdomain = (S)
        signature = (S) the signature of the payload "{doublename}"
        ```
        """
        result = self.phonebook.actors.phonebook.validate_signature(
            name=doublename, payload=doublename, signature=signature
        )
        if not result.is_valid:
            raise j.exceptions.Value("Invalid signature")

        if not self.tfgateway.domain_exists(f"{doublename}.{THREEBOT_DOMAIN}"):
            raise j.exceptions.NotFound("domain name is not registered")

        record = self.tfgateway.subdomain_get(THREEBOT_PRIVATE_DOMAIN, doublename)
        privateip = record["a"][0]["ip"]

        fqdn = f"{subdomain}.{doublename}.{THREEBOT_DOMAIN}"
        self.tfgateway.tcpservice_register(fqdn, fqdn, privateip)

        gateway_records = self.tfgateway.subdomain_get(THREEBOT_DOMAIN, "gateway")
        a_records_ips = [r["ip"] for r in gateway_records["a"]]
        self.tfgateway.domain_register_a(doublename, THREEBOT_DOMAIN, a_records_ips)
