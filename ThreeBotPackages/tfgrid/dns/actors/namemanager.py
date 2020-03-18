from Jumpscale import j

THREEBOT_DOMAIN = j.core.myenv.config.get("THREEBOT_DOMAIN")
EXPLORER_DOMAIN = j.core.myenv.config.get("EXPLORER_ADDR")
THREEBOT_PRIVATE_DOMAIN = "threebot"

MASTERIP = "192.168.99.254"  # ip addr of our master redis which has slaves on the multiple entry points of the TFGrid


class namemanager(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        self.explorer = j.clients.gedis.get(
            name="phonebook_explorer", host=EXPLORER_DOMAIN, port=8901, package_name="tfgrid.phonebook"
        )
        if j.sal.nettools.waitConnectionTest(MASTERIP, port=6378, timeout=1):
            redisclient = j.clients.redis.get(MASTERIP, port=6378)
            self.tfgateway = j.tools.tf_gateway.get(redisclient)
        else:
            self._log_error(f"CONNECTION ERROR TO {MASTERIP}")

    @j.baseclasses.actor_method
    def domain_register(self, threebot_name, privateip, signature, schema_out=None, user_session=None):
        """
        Registers a domain in coredns (needs to be authoritative)

        ```in
        threebot_name = (S) # 3bot threebot_name
        privateip = (S)
        signature = (S) #the signature of the payload "{threebot_name}"
        ```
        """
        result = self.explorer.actors.phonebook.validate_signature(
            name=threebot_name, payload=threebot_name, signature=signature
        )
        if not result.is_valid:
            raise j.exceptions.Value("Invalid signature")

        fqdn = f"{threebot_name}.{THREEBOT_DOMAIN}"
        self.tfgateway.tcpservice_register(fqdn, privateip)
        self.tfgateway.domain_register_cname("@", f"{threebot_name}.{THREEBOT_DOMAIN}", f"{THREEBOT_DOMAIN}.")
        self.tfgateway.domain_register_a(threebot_name, f"{THREEBOT_DOMAIN}", privateip)
        return True

    @j.baseclasses.actor_method
    def subdomain_register(self, threebot_name, subdomain, signature, schema_out=None, user_session=None):
        """
        Registers a domain in coredns (needs to be authoritative)

        ```in
        threebot_name = (S) # 3bot threebot_name
        subdomain = (S)
        signature = (S) #the signature of the payload "{threebot_name}"
        ```
        """
        result = self.explorer.actors.phonebook.validate_signature(
            name=threebot_name, payload=threebot_name, signature=signature
        )
        if not result.is_valid:
            raise j.exceptions.Value("Invalid signature")

        if not self.tfgateway.domain_exists(f"{threebot_name}.{THREEBOT_DOMAIN}"):
            raise j.exceptions.NotFound("domain name is not registered")

        first, last = threebot_name.split(".")
        record = self.tfgateway.subdomain_get(f"{last}.{THREEBOT_PRIVATE_DOMAIN}", first)
        privateip = record["a"][0]["ip"]

        fqdn = f"{subdomain}.{threebot_name}.{THREEBOT_DOMAIN}"
        self.tfgateway.tcpservice_register(fqdn, fqdn, privateip)

        threebot_namefqdn = f"{threebot_name}.{THREEBOT_DOMAIN}"
        self.tfgateway.domain_register_cname("@", threebot_namefqdn, THREEBOT_DOMAIN)
        self.tfgateway.domain_register_cname(subdomain, threebot_namefqdn, THREEBOT_DOMAIN)
