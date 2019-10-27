from Jumpscale import j
TESTNET_DOMAIN = "testnet.grid.tf"
THREEBOT_DOMAIN = f"3bot.{TESTNET_DOMAIN}"
THREEBOT_PRIVATE_DOMAIN = "3bot"
EXPLORER_DOMAIN = f"explorer.{TESTNET_DOMAIN}"

MASTERIP = "192.168.99.254"


class namemanager(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        self._explorer = None
        self._tfgateway = None

    @property
    def explorer(self):
        if self._explorer is None:
            self._explorer = j.clients.gedis.get(host=EXPLORER_DOMAIN, port=8901)
        return self._explorer

    @property
    def tfgateway(self):
        if self._tfgateway is None:
            redisclient = j.clients.redis.get(MASTERIP, port=6378)
            self._tfgateway = j.tools.tf_gateway.get(redisclient)
        return self._tfgateway

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
        self.tfgateway.domain_register_cname("@", doublenamefqdn, f"gateway.{THREEBOT_DOMAIN}")
        self.tfgateway.domain_register_cname(subdomain, doublenamefqdn, f"gateway.{THREEBOT_DOMAIN}")
