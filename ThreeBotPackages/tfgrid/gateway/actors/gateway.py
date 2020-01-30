from Jumpscale import j


class gateway(j.baseclasses.threebot_actor):
    # COREDNS redis backend
    def _init(self, **kwargs):
        # QUESTION: should it work against local database or against remote one? as it's generic enough
        self._gateway = j.tools.tf_gateway.get(j.core.db)

    @j.baseclasses.actor_method
    def domain_list(self, schema_out=None, user_session=None):
        return self._gateway.domain_list()

    @j.baseclasses.actor_method
    def domain_exists(self, domain):
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
        name
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
        """

        """register NS record

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
        text (S)
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

    # TCP Router redis backend
    @j.baseclasses.actor_method
    def tcpservice_register(self, domain, client_secret="", schema_out=None, user_session=None):
        """
        ```in
         domain = (S)
         client_secret = (S)
        ```
        """
        return self._gateway.tcpservice_register(domain=domain, client_secret=client_secret)
