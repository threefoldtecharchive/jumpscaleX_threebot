## This script is used by play.grid.tf 
## It creates a 1 hour container on the tf grid which runs tf_simulator and expose 

import time
import uuid
import random
import netaddr
from Jumpscale import j


FARM_ID = 71
DOMAIN = "play.grid.tf"
NETWORK_NAME = "pub.play.grid.tf"
NETWORK = netaddr.IPNetwork("10.40.0.0/16")
FLIST = "https://hub.grid.tf/ahmedelsayed.3bot/ahmedelsayed93-flist-latest.flist"
LIFETIME = 60 * 60


class Play:
    def __init__(self):
        self._zos = j.sal.zosv2
        self._redis = j.clients.redis.get(port=6378)
        self._pubkey = j.clients.sshkey.default.pubkey.strip()
        self._nodes = list(self._zos.nodes_finder.nodes_search(farm_id=FARM_ID))
        self._gateway = j.tools.tf_gateway.get(self._redis)

    def _deploy_volume(self, reservation, node, expiration):
        volume = self._zos.volume.create(reservation, node.node_id)
        reservation_id = self._zos.reservation_register(reservation, expiration)
        self._wait_for_result(reservation_id, "VOLUME")
        return reservation_id, volume

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
        reservation_id = self._zos.reservation_register(reservation, expiration)

        self._wait_for_result(reservation_id, "NETWORK")
        self._wireguard_connect(wireguard)

    def deploy_container(self):
        expiration = j.data.time.epoch + LIFETIME

        nodes = self._zos.nodes_finder.nodes_by_capacity(farm_id=FARM_ID, cru=4, mru=2, hru=8)
        node = random.choice(list(nodes))

        reservation = self._zos.reservation_create()
        reservation_id, volume = self._deploy_volume(reservation, node, expiration)

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

        self._zos.volume.attach_existing(container, volume, reservation_id, "/sandbox/var")

        reservation_id = j.sal.zosv2.reservation_register(reservation, expiration)
        self._wait_for_result(reservation_id, "CONTAINER")

        j.sal.nettools.tcpPortConnectionTest(ip_address, port=22, timeout=30)

        domain = "tf-simulator-%s.%s" % (uuid.uuid4().hex[:5], DOMAIN)
        self._gateway.tcpservice_register(domain, ip_address, service_http_port=80)
        return domain


from bottle import Bottle, request, response

app = Bottle()
redis = j.clients.redis.get(port=6378)


@app.route("/", method=["POST"])
def index():
    requestor = request.environ.get("REMOTE_ADDR")
    url = redis.get("requestor:%s" % requestor)

    if url:
        url = url.decode()
    else:
        url = play.deploy_container()
        redis.set("requestor:%s" % requestor, url, ex=LIFETIME)

    return "Visit your container using this link: http://{}, your container will be destroyed after 1 hour".format(url)


if __name__ == "__main__":
    play = Play()
    app.run(host="0.0.0.0", port=5000)
