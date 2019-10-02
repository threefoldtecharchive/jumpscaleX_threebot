from Jumpscale import j


class nameservice(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        pass

    def tcpservice_register(self, name, domain, endpoint, schema_out=None, user_session=None):
        """
        Registers a tcpservice to be used by tcprouter in j.core.db

        ```in
        name = (S) # service name
        domain = (S) # (Server Name Indicator SNI) (e.g www.facebook.com)
        endpoint = (S) TLS endpoint 102.142.96.34:443 "ip:port"
        ```
        """
        j.tools.tf_gateway.tcpservice_register(name, domain, endpoint)
        return True

    def domain_register(self, name, domain, ip_version, record_ips, schema_out=None, user_session=None):
        """
        Registers a domain in coredns (needs to be authoritative)

        ```in
        name = (S) # service name
        domain = (S) # defaults to "grid.tf."
        ip_version = 'ipv4,ipv6' (E)
        record_ips = (LS) # machine ips in ipv4 format
        ```
        """
        if str(ip_version).lower() == "ipv6":
            j.tools.tf_gateway.domain_register_ipv6(name, domain, record_ips)
        else:
            j.tools.tf_gateway.domain_register_ipv4(name, domain, record_ips)
        return True
