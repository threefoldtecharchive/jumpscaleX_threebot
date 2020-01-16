from Jumpscale import j

TESTNET_DOMAIN = "testnet.grid.tf"
THREEBOT_DOMAIN = f"3bot.{TESTNET_DOMAIN}"
THREEBOT_PRIVATE_DOMAIN = "3bot"
EXPLORER_DOMAIN = f"explorer.{TESTNET_DOMAIN}"

MASTERIP = "192.168.99.254"  # ip addr of our master redis which has slaves on the multiple entry points of the TFGrid


class namemanager(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        self.explorer = j.clients.gedis.get(
            name="phonebook_explorer", host=EXPLORER_DOMAIN, port=8901, package_name="tfgrid.phonebook"
        )

        redisclient = j.clients.redis.get(MASTERIP, port=6378)
        self.tfgateway = j.tools.tf_gateway.get(redisclient)

    @j.baseclasses.actor_method
    def domain_register(self, doublename, privateip, signature, user_session=None):
        """
        Registers a domain in coredns (needs to be authoritative)

        ```in
        doublename = (S) # 3bot doublename
        privateip = (S)
        signature = (S) the signature of the payload "{doublename}"
        ```
        """
        result = self.explorer.actors.phonebook.validate_signature(
            name=doublename, payload=doublename, signature=signature
        )
        if not result.is_valid:
            raise j.exceptions.Value("Invalid signature")

        first, last = doublename.split(".")
        fqdn = f"{doublename}.{THREEBOT_DOMAIN}"
        self.tfgateway.tcpservice_register(fqdn, privateip)

        self.tfgateway.domain_register_cname("@", f"{last}.{THREEBOT_DOMAIN}", f"{THREEBOT_DOMAIN}.")
        self.tfgateway.domain_register_cname(first, f"{last}.{THREEBOT_DOMAIN}", f"{THREEBOT_DOMAIN}.")
        self.tfgateway.domain_register_a(first, f"{last}.{THREEBOT_PRIVATE_DOMAIN}", privateip)
        return True

    @j.baseclasses.actor_method
    def subdomain_register(self, doublename, subdomain, signature, user_session=None):
        """
        Registers a domain in coredns (needs to be authoritative)

        ```in
        doublename = (S) # 3bot doublename
        subdomain = (S)
        signature = (S) the signature of the payload "{doublename}"
        ```
        """
        result = self.explorer.actors.phonebook.validate_signature(
            name=doublename, payload=doublename, signature=signature
        )
        if not result.is_valid:
            raise j.exceptions.Value("Invalid signature")

        if not self.tfgateway.domain_exists(f"{doublename}.{THREEBOT_DOMAIN}"):
            raise j.exceptions.NotFound("domain name is not registered")

        first, last = doublename.split(".")
        record = self.tfgateway.subdomain_get(f"{last}.{THREEBOT_PRIVATE_DOMAIN}", first)
        privateip = record["a"][0]["ip"]

        fqdn = f"{subdomain}.{doublename}.{THREEBOT_DOMAIN}"
        self.tfgateway.tcpservice_register(fqdn, fqdn, privateip)

        doublenamefqdn = f"{doublename}.{THREEBOT_DOMAIN}"
        self.tfgateway.domain_register_cname("@", doublenamefqdn, THREEBOT_DOMAIN)
        self.tfgateway.domain_register_cname(subdomain, doublenamefqdn, THREEBOT_DOMAIN)
