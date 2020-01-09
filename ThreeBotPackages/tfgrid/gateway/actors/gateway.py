from Jumpscale import j

TESTNET_DOMAIN = "testnet.grid.tf"
THREEBOT_DOMAIN = f"3bot.{TESTNET_DOMAIN}"
THREEBOT_PRIVATE_DOMAIN = "3bot"
EXPLORER_DOMAIN = f"explorer.{TESTNET_DOMAIN}"

MASTERIP = "192.168.99.254"


class gateway(j.baseclasses.threebot_actor):
    ## COREDNS redis backend
    def _init(self, **kwargs):
        # QUESTION: should it work against local database or against remote one? as it's generic enough
        self._gateway = j.tools.tf_gateway.get(j.core.db)


    def domain_list(self, schema_out=None, user_session=None):
        return self._gateway.domain_list()

    def domain_exists(self, domain):
        """
        ```in
        domain = (S)
        ```
        """
        return self._gateway.domain_exists(domain)

    def domain_dump(self, domain, schema_out=None, user_session=None):
        """
        ```in
        domain = (S)
        ```
        """
        return self._gateway.domain_exists(domain)

    def subdomain_get(self, domain, subdomain):
        """
        ```in
        domain = (S)
        subdomain = (S)
        ```
        """

       return self._gateway.subdomain_get(domain, subdomain)

    def domain_register_a(self, name, domain, record_ip, schema_out=None, user_session=None):
        """
        ```in
        domain = (S)
        record_ip = (S)
        ```
        """

        return self._gateway.domain_register_a(name, domain, record_ip)


    def domain_register_aaaa(self, name, domain, record_ip, schema_out=None, user_session=None):
        """
        ```in
        domain = (S)
        record_ip = (S)
        ```
        """

        records = self._records_get(record_ip)
        return self._gateway.domain_register_aaaa(name, domain, record_ip)

    def domain_register_cname(self, name, domain, host, schema_out=None, user_session=None):

        """
        ```in
        name
        domain = (S)
        host = (S)
        ```
        """

        return self._gateway.domain_register_cname(name, domain, host)

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

    def domain_register_txt(self, name, domain, text, schema_out=None, user_session=None):
        """
        ```in
        name = (S)
        domain = (S)
        text (S)
        ```
        """

        return self._gateway.domain_register_txt(name, domain, text)

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

    def domain_register_srv(self, name, domain, host, port, priority=10, weight=100, schema_out=None, user_session=None):
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

    ## TCP Router redis backend
    def tcpservice_register(self, domain, service_addr="", service_port=443, service_http_port=80, client_secret="", schema_out=None, user_session=None):
        """
        ```in
         domain = (S)
         service_addr = (S)
         service_port = (I)
         service_http_port = (I)
         client_secret = (S)
        ```
        """
        return self._gateway.tcpservice_register(domain, service_addr, service_port, service_http_port, client_secret)

