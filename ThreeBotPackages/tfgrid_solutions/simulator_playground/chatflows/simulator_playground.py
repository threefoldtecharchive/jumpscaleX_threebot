import time
import uuid
import random
import netaddr
from Jumpscale import j


FARM_ID = 71
DOMAIN = "play.grid.tf"
NETWORK_NAME = "pub.play.grid.tf"
NETWORK = netaddr.IPNetwork("10.40.0.0/16")
FLIST = "https://hub.grid.tf/ahmedelsayed.3bot/threefoldtech-simulator-latest.flist"
LIFETIME = 60 * 60


class Deployer:
    def __init__(self):
        self._zos = j.sal.zosv2
        self._redis = j.clients.redis.get()
        self._pubkey = j.clients.sshkey.default.pubkey.strip()
        self._nodes = list(self._zos.nodes_finder.nodes_search(farm_id=FARM_ID))
        self._gateway = j.tools.tf_gateway.get(self._redis)

    def _deploy_volume(self, reservation, node, expiration):
        volume = self._zos.volume.create(reservation, node.node_id)
        reservation = self._zos.reservation_register(reservation, expiration)
        self._wait_for_result(reservation.reservation_id, "VOLUME")
        return f"{reservation.reservation_id}-{volume.workload_id}"

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
        j.tools.executor.local.execute("wg-quick down network")
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

        expiration = j.data.time.epoch + (3600 * 24 * 365)
        reservation = self._zos.reservation_register(reservation, expiration)

        self._wait_for_result(reservation.reservation_id, "NETWORK")
        self._wireguard_connect(wireguard)

    def deploy_container(self):
        expiration = j.data.time.epoch + LIFETIME

        nodes = self._zos.nodes_finder.nodes_by_capacity(farm_id=FARM_ID, cru=4, mru=2, hru=8)
        node = random.choice(list(nodes))

        reservation = self._zos.reservation_create()
        volume_id = self._deploy_volume(reservation, node, expiration)

        subnet = self._redis.hget("play:subnets", node.node_id).decode()
        ip_address = self._get_free_ip_address(node.node_id, subnet)

        container = j.sal.zosv2.container.create(
            reservation=reservation,
            node_id=node.node_id,
            network_name=NETWORK_NAME,
            ip_address=ip_address,
            flist=FLIST,
            env={"pub_key": self._pubkey},
            entrypoint="/startup.sh",
            cpu=4,
            memory=4096,
        )

        self._zos.volume.attach_existing(container, volume_id, "/sandbox/var")

        reservation = j.sal.zosv2.reservation_register(reservation, expiration)
        self._wait_for_result(reservation.reservation_id, "CONTAINER")
        j.sal.nettools.tcpPortConnectionTest(ip_address, port=22, timeout=30)

        domain = "tf-simulator-%s.%s" % (uuid.uuid4().hex[:5], DOMAIN)
        self._gateway.tcpservice_register(domain, ip_address, service_http_port=80, expire=LIFETIME)
        return domain


deployer = Deployer()


def chat(bot):
    options = ["Continue", "Cancel"]
    confirm = bot.single_choice("Do you want to deploy a threefold simulator container ?", options)

    if confirm == "Continue":
        url = deployer.deploy_container()

        message = """
        ### Visit your container using this link: 
        #### [http://{url}](http://{url}) 
        > Note: Your container will be destroyed after 1 hour
        """.format(
            url=url
        )

        bot.md_show(j.tools.jinja2.template_render(text=j.core.text.strip(message)))
