# Explorer Infrastructure

## Infrastructure overview

### **TODO: add infrastructure image**

The infrastructure of the explorer network is used for threebot registration, reservations, and communication between threebots within the network. There are two private networks that will be created:

1. **Redis private network** : a private wireguard network to sync all the redis slaves in the DNS machines with the main redis master in the explorer machine

2. **Main private network**: a private wireguard network that will include the DNS machines and the threebot machines registered to provide communication between all threebots created with each other

### Components:

- Explorer machine **[Redis master, Jumpscale, Jumpscale actors]**
- 3 DNS machines **[Redis slave, Wireguard server, Core DNS, TCP router]**
- Threebot machines **\[Jumpscale\]**

### Domains:

- The DNS machines will resolve to `threebot.gateway.tf`
- Registered threebot machines should have the domain `THREEBOT_NAME.gateway.tf`

## Explorer Machine [Main machine]

This is the main explorer machine that will handle all registrations of a new threebot being added to the network and reservations in the future. Explorer threebot is running on it with phonebook, gridmanager, and gateway actors loaded. It also contains the main redis data (master) that other DNS machines (slaves) sync with.

### Redis master:

- The redis master will be running on the explorer machine where all other DNS machines will be syncing with it. This gurrantees all the DNS machines haveing the same redis backend data. Redis is used to save all the records that CoreDNS and TCP router will be using for resolving.

- Redis is run on wireguard interface and is only accessible from it, therefore only machines on the redis private network will be able to access the data on it.

### Explorer Wireguard server:

Wireguard is set up on the explorer machine where it is added in the redis private network only where it has the 3 DNS machines as peers and they can all communicate for the exchange of redis data.

### Phonebook threebot actor:

- When a new threebot machine is to be registered its data and ID need to be added in the phonebook. This is done using the phonebook actor upon registration where it checks for the threebot name if it is not already there. This is used to give the threebot a new Threebot ID (tid) and save its data in the phonebook for other threebots to be able to retrieve(name and email)

- This is done using the following actor methods and shown in more detail in the demo below:
  - name_register(name, email, pubkey, wallet_name)
  - record_register(record_register(tid, name, email, ipaddr, description, pubkey)


### Gateway threebot actor:

- This is used to register the domains in redis for the use of CoreDNS and TCP router server mainly.
- This is done using the following actor methods:
  - domain_register_a(name, domain, record_ip)
  - domain_register_cname(name, domain, host)
  - tcpservice_ip_register(domain, privateip)
  - tcpservice_client_register(domain, client_secret)
  - domain_tcpservice_ip_expose(threebot_name, privateip, signature)
  - domain_tcpservice_client_expose(threebot_name, client_secret, signature)


## DNS Machines

There are 3 DNS machines running with each having its own TCP router server, CoreDNS and redis slave.(For simplicity only 1 is being used initially)

### TCPRouter:

There is a TCP router server running on each DNS machine used to resolve using tcp service where a connection will be opened between the 3bot registered and that machine

### CoreDNS:

There is CoreDNS running on each DNS machine. CoreDNS is used to resolve the domains using the data saved in redis

### Redis slave:

There is redis slave on each DNS machine where all the records saved in the redis master are mirrored to the slave and any changes are mirrored in all machines.


## Threebot machines

### Threebot Server:

A machine that has jumpscale can act as a threebot machine where threebot server is started on it, and once the machine is registered via the explorer machine, the content being served can be accessible with the domain registered.


## Demo

### Deploy infrastructure on machine:

 1. Create a Digital Ocean machine(will be explorer machine)  + install jumpscale
 2. Make sure from the following env variables in jumpscale config file:

    ```bash
    EXPLORER_ADDR = "128.199.32.174"
    THREEBOT_DOMAIN = "threebot.gateway.tf"
    SSH_KEY_NAME = "AMSKey"
    DROPLET_PREFIX = "router"
    DROPLET_POSTFIX = "Staging"
    ```

    where:
    _EXPLORER_ADDR_  is the domain/IP of the explorer machine that has all the actors
    _THREEBOT_DOMAIN_ The main domain used in registering any subdomains for the threebots
    _SSH_KEY_NAME_ is the ssh key name in DigitalOcean
    _DROPLET_PREFIX_, _DROPLET_POSTFIX_ droplets will be named in format {DROPLET_PREFIX}{n}{DROPLET_POSTFIX}
 3. Initiate digital ocean instance to be used in deployment with the name "main" and project name "3bot Infra Staging"

    ```python3
    do = j.clients.digitalocean.get("main",token_=TOKEN,project_name="3bot Infra Staging")
    ```

 4. Run script to deploy the infrastructure on Explorer machine(Explorer machine content + 3 DNS machines)

    ```bash
    kosmos -p '/sandbox/code/github/threefoldtech/jumpscaleX_threebot/scripts/setupinfra_new.py'
    ```

    This will result in 3 new Digital ocean machines being created and are all on the 2 private networks. CoreDNS and TCP will be started on each of these machines with the correct configurations.

### Register 3bot machine:

Threebot can be registered using private network and creating private ip

1. Make sure from the env variables as in #2 in the previous steps

2. Start 3bot server

    ```python3
    j.servers.threebot.start(background=True)
    ```

3. Register the 3bot using the explorer (private network connection)

    ```python3
            explorer_domain = j.core.myenv.config.get("EXPLORER_ADDR")
            registration_explorer = j.clients.gedis.get(
                name="registration_explorer",
                host=explorer_domain,
                port=8901,
                package_name="tfgrid.registration"
            )
            registration_explorer.actors.registration.register(
                threebot_name=THREEBOT_NAME,
                email=EMAIL,
                description=DESCRIPTION
            )
    ```

4. Threebot should be accessible through `THREEBOT_NAME.threebot.gateway.tf`

OR Threebot can be registered using tcp service with a connection stream open:

1. Make sure from the env variables as in #2 in the previous steps
2. Start server (default port is 80 to be used for tcp client)
3. Install tcp client (trc) on machine

    ```python3
    j.builders.network.tcprouter.install(reset=True)
    ```

4. Make connection with tcp server

    ```python3
    redis_client = j.clients.redis.core
    tf_gateway = j.tools.tf_gateway.get(redis_client)
    tf_gateway.create_tcprouter_service_client(name=CLIENT_NAME,local_ip="127.0.0.1",remote_url="165.227.201.194",secret=CLIENT_SECRET)

    ```

5. Register threebot on eplorer machine

    ```python3
    nacl = j.data.nacl.default
    phonebook_explorer = j.clients.gedis.get(
                name="phonebook_explorer", host=EXPLORER_DOMAIN, port=8901, package_name="tfgrid.phonebook"
            )
    pubkey = nacl.verify_key_hex
    phonebook_explorer.actors.phonebook.wallet_create(name=THREEBOT_NAME)
    record = phonebook_explorer.actors.phonebook.name_register(
            name=THREEBOT_NAME, pubkey=pubkey, email=EMAIL, wallet_name=THREEBOT_NAME
        )
    sender_signature_hex = j.data.nacl.payload_sign(
        record.id, THREEBOT_NAME, EMAIL, "", DESCRIPTION, pubkey, nacl=nacl
    )
    phonebook_explorer.actors.phonebook.record_register(
        tid=record.id,
        name=threebot_name,
        email=email,
        description=description,
        pubkey=pubkey,
        sender_signature_hex=sender_signature_hex,
    )
    signature = j.data.nacl.payload_sign(THREEBOT_NAME, nacl=nacl)
    gateway_explorer = j.clients.gedis.get(
        name="gateway_explorer", host=EXPLORER_DOMAIN, port=8901, package_name="tfgrid.gateway"
    )
    gateway_explorer.actors.gateway.domain_tcpservice_client_expose(
        threebot_name=THREEBOT_NAME,
        client_secret=CLIENT_SECRET,
        signature=signature
    )

    ```

6. Threebot should be accessible through `THREEBOT_NAME.threebot.gateway.tf`
