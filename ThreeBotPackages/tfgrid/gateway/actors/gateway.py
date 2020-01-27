from Jumpscale import j

TESTNET_DOMAIN = "threebot.gateway.tf"
THREEBOT_DOMAIN = f"{TESTNET_DOMAIN}"
THREEBOT_PRIVATE_DOMAIN = "threebot"
# EXPLORER_DOMAIN = f"explorer.{TESTNET_DOMAIN}"
EXPLORER_DOMAIN = "128.199.32.174"

MASTERIP = "192.168.99.254"


class gateway(j.baseclasses.threebot_actor):
    # COREDNS redis backend
    def _init(self, **kwargs):
        # QUESTION: should it work against local database or against remote one? as it's generic enough
        redisclient = j.clients.redis.get(MASTERIP, port=6378)
        self._gateway = j.tools.tf_gateway.get(redisclient)
        self.explorer = j.clients.gedis.get(
            name="phonebook_explorer", host=EXPLORER_DOMAIN, port=8901, package_name="tfgrid.phonebook"
        )

    @j.baseclasses.actor_method
    def domain_list(self, schema_out=None, user_session=None):
        return self._gateway.domain_list()

    @j.baseclasses.actor_method
    def domain_exists(self, domain, schema_out=None, user_session=None):
        """
        ```in
        domain = (S)
        ```
        """
        return self._gateway.domain_exists(domain)

    @j.baseclasses.actor_method
    def domain_dump(self, domain, schema_out=None, user_session=None):
        """
        ```in
        domain = (S)
        ```
        """
        return self._gateway.domain_exists(domain)

    @j.baseclasses.actor_method
    def subdomain_get(self, domain, subdomain):
        """
        ```in
        domain = (S)
        subdomain = (S)
        ```
        """

        return self._gateway.subdomain_get(domain, subdomain)

    @j.baseclasses.actor_method
    def domain_register_a(self, name, domain, record_ip, schema_out=None, user_session=None):
        """
        ```in
        domain = (S)
        record_ip = (S)
        ```
        """

        return self._gateway.domain_register_a(name, domain, record_ip)

    @j.baseclasses.actor_method
    def domain_register_aaaa(self, name, domain, record_ip, schema_out=None, user_session=None):
        """
        ```in
        domain = (S)
        record_ip = (S)
        ```
        """

        return self._gateway.domain_register_aaaa(name, domain, record_ip)

    @j.baseclasses.actor_method
    def domain_register_cname(self, name, domain, host, schema_out=None, user_session=None):

        """
        ```in
        name = (S)
        domain = (S)
        host = (S)
        ```
        """

        return self._gateway.domain_register_cname(name, domain, host)

    @j.baseclasses.actor_method
    def domain_register_ns(self, name, domain, host, schema_out=None, user_session=None):

        """
        ```in
        name = (S)
        domain = (S)
        host = (S)
        ```
        register NS record

        :param name: name
        :type name: str
        :param domain: str, defaults to "bots.grid.tf."
        :type domain: str, optional
        :param host: host
        :type host: str
        """
        return self._gateway.domain_register_ns(name, domain, host)

    @j.baseclasses.actor_method
    def domain_register_txt(self, name, domain, text, schema_out=None, user_session=None):
        """
        ```in
        name = (S)
        domain = (S)
        text = (S)
        ```
        """

        return self._gateway.domain_register_txt(name, domain, text)

    @j.baseclasses.actor_method
    def domain_register_mx(self, name, domain, host, priority=10, schema_out=None, user_session=None):
        """
         ```in
         name = (S)
         domain = (S)
         host =  (S)
         priority = 10
         ```
        """
        return self._gateway.domain_register_mx(name, domain, host, priority)

    @j.baseclasses.actor_method
    def domain_register_srv(
        self, name, domain, host, port, priority=10, weight=100, schema_out=None, user_session=None
    ):
        """
        ```in
         name = (S)
         domain = (S)
         host =  (S)
         port = (I)
         priority = 10
         weight = 100

        ```
        """
        return self._gateway.domain_register_srv(name, domain, host, port, priority, weight)

    @j.baseclasses.actor_method
    def domain_service_expose(self, threebot_name, privateip, signature, schema_out=None, user_session=None):
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
        self._gateway.tcpservice_register(fqdn, privateip)
        self._gateway.domain_register_cname("@", f"{threebot_name}.{THREEBOT_DOMAIN}", f"{THREEBOT_DOMAIN}.")
        self._gateway.domain_register_a(threebot_name, f"{THREEBOT_DOMAIN}", privateip)
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

        if not self._gateway.domain_exists(f"{threebot_name}.{THREEBOT_DOMAIN}"):
            raise j.exceptions.NotFound("domain name is not registered")

        first, last = threebot_name.split(".")
        record = self._gateway.subdomain_get(f"{last}.{THREEBOT_PRIVATE_DOMAIN}", first)
        privateip = record["a"][0]["ip"]

        fqdn = f"{subdomain}.{threebot_name}.{THREEBOT_DOMAIN}"
        self._gateway.tcpservice_register(fqdn, fqdn, privateip)

        threebot_namefqdn = f"{threebot_name}.{THREEBOT_DOMAIN}"
        self._gateway.domain_register_cname("@", threebot_namefqdn, THREEBOT_DOMAIN)
        self._gateway.domain_register_cname(subdomain, threebot_namefqdn, THREEBOT_DOMAIN)

    ## TCP Router redis backend

    @j.baseclasses.actor_method
    def tcpservice_register(self, domain, client_secret="", schema_out=None, user_session=None):
        """
        ```in
         domain = (S)
         client_secret = (S)
        ```
        """
        return self._gateway.tcpservice_register(domain=domain, client_secret=client_secret)
