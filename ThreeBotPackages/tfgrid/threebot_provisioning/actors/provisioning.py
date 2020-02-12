from Jumpscale import j
import ipaddress

class provisioning(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        self.token = j.clients.digitalocean.get("provisioning").token_
        j.clients.threebot.explorer_addr_set("explorer.testnet.grid.tf")
        self.explorer = j.clients.threebot.explorer

    @j.baseclasses.actor_method
    def threebot_create(self, name, schema_out=None, user_session=None):
        """
        ```in
        name = (S)
        do_token = (S)
        do_project_name = (S)
        ssh_key = (S)
        ```
        """
        deployer = j.tools.threebot_deploy.get()
        machine = deployer.machines.get_available()
        machine.threebot_deploy()

    @j.baseclasses.actor_method
    def threebot_registration(self, name, doublename, email, description, schema_out=None, user_session=None):
        """
        ```in
        name = (S)
        doublename = (S)
        email = (S)
        description = (S)
        ```
        """
        container = j.tools.threebot_deploy.get_by_double_name(doublename)
        client = container.threebot_client
        client.actors.registration.register(doublename, email, description)

    # consider a node up if it has received update during the last 10 minute
    def is_up(self, node):
        ago = j.data.time.epoch - (60 * 10)
        return node.updated > ago


    def find_node_public(self, nodes):
        # search a node that has a public ipv6 address
        for node in filter(self.is_up, nodes):
            for iface in node.ifaces:
                for addr in iface.addrs:
                    ip = ipaddress.ip_interface(addr).ip
                    if ip.version != 6:
                        continue
                    if ip.is_global:
                        return (node, str(ip))

    def find_free_wg_port(self, node):
        ports = set(list(range(6000, 9000)))
        used = set(node.wg_ports)
        free = ports - used
        return free.pop()

    def key_pair_get(self):
        ex = j.tools.executor.get()

        rc, privatekey, err = ex.execute("wg genkey", showout=False)
        self.key_private_ = privatekey.strip()

        rc, publickey, err = ex.execute("echo {} | wg pubkey".format(privatekey.strip()), showout=False)
        self.key_public = publickey.strip()
        return self.key_private_, self.key_public

    @j.baseclasses.actor_method
    def deploy_ubuntu_container(self, name, email, ip_range , ip_address, pub_key, user_corex, password_corex, schema_out=None, user_session=None):
        """
        ```in
        name = (S)
        email = (S)
        ip_range = (S)
        ip_address = (S)
        pub_key = (S)
        user_corex= (S)
        password_corex = (S)
        ```
        """

        #should return error if doesn't exist
        me = self.explorer.actors_all.phonebook.get(name=name,email=email)

        nodes = self.explorer.actors_all.nodes.list().nodes

        selected_node = self.find_node_public(nodes)
        if selected_node is None:
            raise j.exceptions.NotFound("no node found with public ipv6")

        node, public_ip = selected_node
        _, wg_private_encrypted, wg_public = j.tools.wireguard.generate_zos_keys(node.public_key_hex)
        wg_port = self.find_free_wg_port(node)

        reservation_model = j.data.schema.get_from_url("tfgrid.workloads.reservation.1")

        reservation = reservation_model.new()
        reservation.customer_tid = me.id
        reservation.data_reservation.expiration_provisioning = j.data.time.epoch + (60 * 10)  # 10 minutes
        reservation.data_reservation.expiration_reservation = j.data.time.epoch + (60 * 10)  # 10 minutes

        # network
        network = reservation.data_reservation.networks.new()
        network.node_id = node.node_id
        network.workload_id = 1
        network.name = j.data.idgenerator.generateXCharID(16)
        network.iprange = ip_range

        ip = ip_range.split("/")
        ip_splits = ip[0].split(".")
        network_number = int(ip_splits[2])
        network1 = ip_splits[0]+"."+ip_splits[1]+"."+str(network_number+1) + "."+ip_splits[3]+"/24"
        nr1 = network.network_resources.new()

        nr1.iprange = network1
        nr1.node_id = node.node_id
        nr1.wireguard_listen_port = wg_port
        nr1.wireguard_public_key = wg_public
        nr1.wireguard_private_key_encrypted = wg_private_encrypted

        network2 = ip_splits[0] + "." + ip_splits[1] + "." + str(network_number+2) + "." + ip_splits[3] + "/24"

        private_key, public_key = self.key_pair_get()
        # add a peer to the network, this peer is your laptop
        peer = nr1.peers.new()
        peer.iprange = network2

        peer.allowed_iprange = ["100.64."+ip_splits[1]+"."+str(network_number+2)+"/32", network2]
        # this is your wireguard public key from your laptop
        peer.public_key = public_key

        cont = reservation.data_reservation.containers.new()
        cont.node_id = node.node_id
        cont.workload_id = 2

        cont.flist = "https://hub.grid.tf/bola_nasr_1/threefoldtech-3bot-corex.flist"
        cont.storage_url = "zdb://hub.grid.tf:9900"
        cont.environment = {"corex_password":password_corex,"corex_user":user_corex,"pub_key":pub_key}
        cont.entrypoint = "/usr/bin/zinit init -d"
        cont.interactive = False

        net = cont.network_connection.new()
        net.network_id = network.name
        net.ipaddress = ip_address

        print(reservation.data_reservation._json)

        reservation.json = reservation.data_reservation._json
        reservation.customer_signature = me.nacl.sign_hex(reservation.json.encode())

        return  reservation

    @j.baseclasses.actor_method
    def reservation(self, reservation, schema_out=None, user_session=None):
        """
        ```in
        reservation = (json)
        ```
        """

        resp = self.explorer.actors_all.workload_manager.reservation_register(reservation)
        return  resp

        #print("use this template to configure the wg-quick config of your laptop:")
        #network_peer = "100.64."+ip_splits[2]+"."+ip_splits[3]+"/16"
        #print(
        #    f"""
        #        [Interface]
        #        Address = 100.64.22.2/16, 172.22.2.0/16
        #        PrivateKey = {private_key}
        #        [Peer]
        #        PublicKey = {public_key}
        #        Endpoint = [{public_ip}]:{wg_port}
        #        AllowedIPs = {ip_range}, {network_peer}
        #        PersistentKeepalive = 25
        #        """
        #)

