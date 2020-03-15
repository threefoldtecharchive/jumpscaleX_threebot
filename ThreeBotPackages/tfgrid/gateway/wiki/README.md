# gateway

Gateway package over CoreDNS/TCPRouter services.

## installation

from 3bot shell
- `p.tfgrid.gateway.install()`
- `p.tfgrid.gateway.start()`

or using packagemanager actor.

## actors

### gateway

provides methods to manipulate coredns and tcprouter backend "redis"

- tcpservice_register(domain, service_addr="", service_port=443, service_http_port=80, client_secret="")`
- domain_register_a(name, domain, record_ip)
- domain_register_aaaa(name, domain, record_ip)
- domain_list()
- domain_exists(domain)
- domain_dump(domain)
- subdomain_get(domain, subdomain)
- domain_register_cname(name, domain, host)
- domain_register_ns(name, domain, host)
- domain_register_txt(name, domain, text)
- domain_register_mx(name, domain, host, priority=10)
- domain_register_srv(name, domain, host, port, priority=10, weight=100)
