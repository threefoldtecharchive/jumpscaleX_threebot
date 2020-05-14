import time
import uuid
import random
import netaddr
from Jumpscale import j


FARM_ID = 1
DOMAIN = "play.grid.tf"
NETWORK_NAME = "pub.play.grid.tf"
NETWORK = netaddr.IPNetwork("10.40.0.0/16")
FLIST = "https://hub.grid.tf/ahmedelsayed.3bot/threefoldtech-simulator-latest.flist"
LIFETIME = 6 * 60 * 60
CURRENCY = "FreeTFT"
WALLET_NAME = "playground"
GATEWAT_ID = "EwPS7nPZHd5KH6YH7PtbmUpJUyWgseqsqS7cGhjXLUjz"


class Deployer:
    def __init__(self):
        self._zos = j.sal.zosv2
        self._redis = j.clients.redis.get()
        self._nodes = list(
            filter(self._zos.nodes_finder.filter_is_free_to_use, self._zos.nodes_finder.nodes_search(farm_id=FARM_ID))
        )
        self._gateway = j.tools.tf_gateway.get(self._redis)

    def _deploy_volume(self, reservation, node, container):
        volume = self._zos.volume.create(reservation, node.node_id)
        self._zos.volume.attach(container, volume, "/sandbox/var")
        return volume

    def _register_service(self, reservation, gateway, secret):
        subdomain = f"tf-simulator-{uuid.uuid4().hex[:5]}"
        domain = f"{subdomain}.{DOMAIN}"
        self._zos.gateway.tcp_proxy_reverse(reservation, gateway.node_id, domain, secret)
        return domain

    def _get_free_ip_address(self, node_id, subnet):
        used = [ip.decode().split(":")[-1] for ip in self._redis.keys("play:used:ip:*")]
        subnet = netaddr.IPNetwork(subnet)
        subnet_ips = subnet.iter_hosts()

        next(subnet_ips)

        for ip in subnet_ips:
            if str(ip) not in used:
                self._redis.set("play:used:ip:%s" % str(ip), "", ex=LIFETIME)
                return str(ip)
        else:
            raise RuntimeError("No avaliable ips")

    def _wireguard_connect(self, wireguard):
        j.sal.fs.writeFile("/etc/wireguard/network.conf", wireguard)
        try:
            j.tools.executor.local.execute("wg-quick down network")
        except Exception:
            pass
        j.tools.executor.local.execute("wg-quick up network")

    def _wait_for_result(self, reservation_id, category, timeout=120):
        for _ in range(timeout):
            results = self._zos.reservation_result(reservation_id)
            for result in results:
                if result.category == category:
                    if result.state.value == 1:
                        return
                    else:
                        raise RuntimeError(result.message)
            else:
                time.sleep(1)
        else:
            raise TimeoutError("Can't get results in 120 seconds")

    def deploy_network(self):
        reservation = self._zos.reservation_create()
        subnetworks = NETWORK.subnet(24)
        network = self._zos.network.create(reservation, ip_range=str(NETWORK), network_name=NETWORK_NAME)

        next(subnetworks)
        next(subnetworks)

        for node in self._nodes:
            node_network = next(subnetworks)
            self._zos.network.add_node(network, node.node_id, str(node_network))
            self._redis.hset("play:subnets", node.node_id, str(node_network))

        node = next(filter(self._zos.nodes_finder.filter_public_ip4, self._nodes))
        wireguard = self._zos.network.add_access(network, node.node_id, str(next(subnetworks)), ipv4=True)

        self._zos.gateway.delegate_domain(reservation=reservation, node_id=GATEWAT_ID, domain=DOMAIN)
        expiration = j.data.time.epoch + (3600 * 24 * 365)
        reservation = self._zos.reservation_register(reservation, expiration, currencies=[CURRENCY])

        self._wait_for_result(reservation.reservation_id, "NETWORK")
        self._wireguard_connect(wireguard)

    def deploy_container(self, bot=None):
        expiration = j.data.time.epoch + LIFETIME
        nodes = self._zos.nodes_finder.nodes_by_capacity(farm_id=FARM_ID, cru=4, mru=4, hru=1, sru=1, currency=CURRENCY)
        node = random.choice(list(nodes))

        reservation = self._zos.reservation_create()

        subnet = self._redis.hget("play:subnets", node.node_id).decode()
        ip_address = self._get_free_ip_address(node.node_id, subnet)

        gateway = self._zos._explorer.gateway.get(node_id=GATEWAT_ID)
        secret_env = {}
        secret = f"{j.me.tid}:{uuid.uuid4().hex}"
        secret_encrypted = j.sal.zosv2.container.encrypt_secret(node.node_id, secret)
        remote = f"{gateway.dns_nameserver[0]}:{gateway.tcp_router_port}"
        remote_encrypted = j.sal.zosv2.container.encrypt_secret(node.node_id, remote)
        local = f"{ip_address}:8888"
        local_encrypted = j.sal.zosv2.container.encrypt_secret(node.node_id, local)
        secret_env["TRC_SECRET"] = secret_encrypted
        secret_env["TRC_LOCAL"] = local_encrypted
        secret_env["TRC_REMOTE"] = remote_encrypted

        container = j.sal.zosv2.container.create(
            reservation=reservation,
            node_id=node.node_id,
            network_name=NETWORK_NAME,
            ip_address=ip_address,
            flist=FLIST,
            entrypoint="/startup.sh",
            cpu=4,
            memory=4096,
            secret_env=secret_env,
        )

        volume = self._deploy_volume(reservation, node, container)
        domain = self._register_service(reservation, gateway, secret)

        wallet = j.clients.stellar.find(name=WALLET_NAME)[0]
        reservation_id = j.sal.reservation_chatflow.reservation_register_and_pay(
            reservation, expiration, currency=CURRENCY, bot=bot, customer_tid=j.me.tid, wallet=wallet
        )
        j.sal.nettools.tcpPortConnectionTest(ip_address, port=22, timeout=30)

        return domain


deployer = Deployer()


class SimulatorDeploy(j.servers.chatflow.get_class()):
    steps = ["simulator_reservation"]

    @j.baseclasses.chatflow_step(title="Deploy Simulator")
    def simulator_reservation(self):
        options = ["Continue", "Cancel"]
        confirm = self.single_choice("Do you want to deploy a threefold simulator container ?", options)
        if confirm == "Continue":
            url = deployer.deploy_container(bot=self)
            message = """
                    ### Visit your container using this link:
                    #### [http://{url}](http://{url})
                    > Note: Your container will be destroyed after 6 hours
                    """.format(
                url=url
            )

            self.md_show(j.tools.jinja2.template_render(text=j.core.text.strip(message)))


chat = SimulatorDeploy
