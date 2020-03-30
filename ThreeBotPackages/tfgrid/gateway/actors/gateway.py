import binascii
from Jumpscale import j

THREEBOT_DOMAIN = j.core.myenv.config.get("THREEBOT_DOMAIN")
EXPLORER_DOMAIN = j.core.myenv.config.get("EXPLORER_ADDR")

MASTERIP = "192.168.99.254"


class gateway(j.baseclasses.threebot_actor):
    # COREDNS redis backend
    def _init(self, **kwargs):
        # QUESTION: should it work against local database or against remote one? as it's generic enough
        if j.sal.nettools.waitConnectionTest(MASTERIP, port=6378, timeout=1):
            redisclient = j.clients.redis.get(MASTERIP, port=6378)
            self._gateway = j.tools.tf_gateway.get(redisclient)
            self._explorer = j.clients.explorer.default
        else:
            raise j.exceptions.Timeout(f"Failed to connect to master redis {MASTERIP} (probably it's down)")

    def _is_valid_signature(self, threebot_name, signature):
        user = self._explorer.users.get(name=threebot_name)
        payload = binascii.hexlify(threebot_name.encode()).decode()
        return self._explorer.users.validate(tid=user.id, payload=payload, signature=signature)

    def _normalize_threebot_name(self, threebot_name):
        parts = threebot_name.split(".")
        if parts[-1] == "3bot":
            parts.pop()
        return ".".join(parts)

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
        return self._gateway.domain_dump(domain)

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
        name = (S)
        domain = (S)
        record_ip = (S)
        ```
        """

        return self._gateway.domain_register_a(name, domain, record_ip)

    @j.baseclasses.actor_method
    def domain_register_aaaa(self, name, domain, record_ip, schema_out=None, user_session=None):
        """
        ```in
        name = (S)
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
    def domain_unregister_a(self, name, domain, record_ip, schema_out=None, user_session=None):
        """
        ```in
        name = (S)
        domain = (S)
        record_ip = (S)
        ```
        """

        return self._gateway.domain_unregister_a(name, domain, record_ip)

    @j.baseclasses.actor_method
    def domain_unregister_aaaa(self, name, domain, record_ip, schema_out=None, user_session=None):
        """
        ```in
        name = (S)
        domain = (S)
        record_ip = (S)
        ```
        """

        return self._gateway.domain_unregister_aaaa(name, domain, record_ip)

    @j.baseclasses.actor_method
    def domain_unregister_cname(self, name, domain, host, schema_out=None, user_session=None):

        """
        ```in
        name = (S)
        domain = (S)
        host = (S)
        ```
        """

        return self._gateway.domain_unregister_cname(name, domain, host)

    @j.baseclasses.actor_method
    def domain_unregister_ns(self, name, domain, host, schema_out=None, user_session=None):

        """
        ```in
        name = (S)
        domain = (S)
        host = (S)
        ```
        unregister NS record

        :param name: name
        :type name: str
        :param domain: str, defaults to "bots.grid.tf."
        :type domain: str, optional
        :param host: host
        :type host: str
        """
        return self._gateway.domain_unregister_ns(name, domain, host)

    @j.baseclasses.actor_method
    def domain_unregister_txt(self, name, domain, text, schema_out=None, user_session=None):
        """
        ```in
        name = (S)
        domain = (S)
        text = (S)
        ```
        """

        return self._gateway.domain_unregister_txt(name, domain, text)

    @j.baseclasses.actor_method
    def domain_unregister_mx(self, name, domain, host, priority=10, schema_out=None, user_session=None):
        """
         ```in
         name = (S)
         domain = (S)
         host =  (S)
         priority = 10
         ```
        """
        return self._gateway.domain_unregister_mx(name, domain, host, priority)

    @j.baseclasses.actor_method
    def domain_unregister_srv(
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
        return self._gateway.domain_unregister_srv(name, domain, host, port, priority, weight)

    ## TCP Router redis backend

    @j.baseclasses.actor_method
    def tcpservice_ip_register(self, domain, privateip="", schema_out=None, user_session=None):
        """
        ```in
         domain = (S)
         privateip = (S)
        ```
        """
        return self._gateway.tcpservice_register(domain, privateip)

    @j.baseclasses.actor_method
    def tcpservice_dump(self, domain):
        return self._gateway.tcpservice_dump(domain)

    @j.baseclasses.actor_method
    def tcpservice_unregister(self, domain):
        return self._gateway.tcpservice_unregister(domain)

    @j.baseclasses.actor_method
    def tcpservice_client_register(self, domain, client_secret="", schema_out=None, user_session=None):
        """
        ```in
         domain = (S)
         client_secret = (S)
        ```
        """
        return self._gateway.tcpservice_register(domain=domain, client_secret=client_secret)

    @j.baseclasses.actor_method
    def domain_tcpservice_ip_expose(self, threebot_name, privateip, signature, schema_out=None, user_session=None):
        """
        Registers a domain in coredns (needs to be authoritative)

        ```in
        threebot_name = (S) # 3bot threebot_name
        privateip = (S)
        signature = (S) #the signature of the payload "{threebot_name}"
        ```
        """
        if not self._is_valid_signature(threebot_name, signature):
            raise j.exceptions.Value("Invalid signature")

        subdomain = self._normalize_threebot_name(threebot_name)

        fqdn = f"{subdomain}.{THREEBOT_DOMAIN}"
        self._gateway.tcpservice_register(fqdn, privateip)
        self._gateway.domain_register_cname("@", f"{subdomain}.{THREEBOT_DOMAIN}", f"{THREEBOT_DOMAIN}.")
        self._gateway.domain_register_a(subdomain, f"{THREEBOT_DOMAIN}", privateip)
        return True

    @j.baseclasses.actor_method
    def domain_tcpservice_client_expose(
        self, threebot_name, client_secret, signature, schema_out=None, user_session=None
    ):
        """
        Registers a domain in coredns (needs to be authoritative)

        ```in
        threebot_name = (S) # 3bot threebot_name
        client_secret = (S)
        signature = (S) #the signature of the payload "{threebot_name}"
        ```

        ```out
        ip_address = (S)
        ```
        """
        if not self._is_valid_signature(threebot_name, signature):
            raise j.exceptions.Value("Invalid signature")

        subdomain = self._normalize_threebot_name(threebot_name)

        fqdn = f"{subdomain}.{THREEBOT_DOMAIN}"
        self._gateway.tcpservice_register(fqdn, client_secret=client_secret)

        ips = j.tools.dnstools.default.namerecords_get(THREEBOT_DOMAIN)
        ip_address = ips[0]

        self._gateway.domain_register_a(subdomain, f"{THREEBOT_DOMAIN}", ip_address)

        out = schema_out.new()
        out.ip_address = ip_address
        return out
