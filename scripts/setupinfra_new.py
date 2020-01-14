from Jumpscale import j
import random

# WIP still not complete

redisconfig = """\
bind {bindip}
protected-mode yes
port 6378
tcp-backlog 511
timeout 0
tcp-keepalive 300
daemonize no
supervised no
pidfile /var/run/redis_6378.pid
loglevel notice
logfile ""
always-show-logo yes
save 900 1
save 300 10
save 60 10000
stop-writes-on-bgsave-error yes
rdbcompression yes
rdbchecksum yes
dbfilename dump.rdb
dir {dbpath}
replica-serve-stale-data yes
replica-read-only yes
repl-diskless-sync no
repl-diskless-sync-delay 5
repl-disable-tcp-nodelay no
replica-priority 100
lazyfree-lazy-eviction no
lazyfree-lazy-expire no
lazyfree-lazy-server-del no
replica-lazy-flush no
appendonly no
appendfilename "appendonly.aof"
appendfsync everysec
no-appendfsync-on-rewrite no
auto-aof-rewrite-percentage 100
auto-aof-rewrite-min-size 64mb
aof-load-truncated yes
aof-use-rdb-preamble yes
lua-time-limit 5000
slowlog-log-slower-than 10000
slowlog-max-len 128
latency-monitor-threshold 0
notify-keyspace-events ""
hash-max-ziplist-entries 512
hash-max-ziplist-value 64
list-max-ziplist-size -2
list-compress-depth 0
set-max-intset-entries 512
zset-max-ziplist-entries 128
zset-max-ziplist-value 64
hll-sparse-max-bytes 3000
stream-node-max-bytes 4096
stream-node-max-entries 100
activerehashing yes
client-output-buffer-limit normal 0 0 0
client-output-buffer-limit replica 256mb 64mb 60
client-output-buffer-limit pubsub 32mb 8mb 60
"""

unittemplate = """\
[Unit]
Description={name}
After=network.target

[Service]
ExecStart={path}
Type=simple

[Install]
WantedBy=multi-user.target
"""

corednsconfig = """\
{domain} 3bot {{
    redis  {{
        address 127.0.0.1:6378
    }}
}}
. {{
    forward . 8.8.8.8 9.9.9.9
}}
"""

routerconfig = """\
[server]
addr = "0.0.0.0"
port = 443
httpport = 80
[server.dbbackend]
type 	 = "redis"
addr     = "127.0.0.1"
port     = 6378
refresh  = 10
"""

tcprouterclientpath = j.core.tools.text_replace("{DIR_BASE}/bin/trc")
tcprouterserverpath = j.core.tools.text_replace("{DIR_BASE}/bin/trs")
redisserverpath = j.core.tools.text_replace("{DIR_BASE}/bin/redis-server")
corednspath = j.core.tools.text_replace("{DIR_BASE}/bin/coredns")

THREEBOT_DOMAIN = "3bot.testnet.grid.tf"
MASTERIP = "192.168.99.254"
MASTERPUBLIC = j.sal.nettools.getReachableIpAddress("8.8.8.8", 53)

if not j.sal.fs.exists(redisserverpath) or not (
    j.sal.fs.exists(tcprouterclientpath) and j.sal.fs.exists(tcprouterserverpath)
):
    print("Installing tcprouter")
    j.builders.network.tcprouter.install(reset=True)
if not j.sal.fs.exists(corednspath):
    print("Installing coredns")
    j.builders.network.coredns.install(reset=True)

# we want 3 routers
project_name = "3bot Infra Staging"
do = j.clients.digitalocean.get()
size = "s-1vcpu-1gb"
regions = do.digitalocean_region_names
random.shuffle(regions)
regions = regions[:3]
if len(regions) < 3:
    raise j.exceptions.Runtime("Not enough regions")

clients = []

print("Install wg on manager")
wg = j.tools.wireguard.get("manager_staging", autosave=False)
wg.interface_name = "wgman_staging"
wg.port = 7778
wg.network_public = MASTERPUBLIC
wg.network_private = f"{MASTERIP}/24"
wg.install()
wg.save()
wg.configure()


def configure_wg(ssh_name, privateip):
    wgr = j.tools.wireguard.get(ssh_name, autosave=False)
    wgr.interface_name = "wgman_staging"
    wgr.sshclient_name = ssh_name
    wgr.network_private = f"{privateip}/24"
    print(f"  Install wg")
    wgr.install()
    wgr.port = 7778
    wgr.save()
    wgr.peer_add(wg)
    wgr.save()
    print(f"  Configure wg")
    wgr.configure()
    # add peer to "manager"
    wg.peer_add(wgr)


def configure_systemd_unit(executor, name, path):
    systemdconfig = unittemplate.format(name=name, path=path)
    executor.file_write(f"/etc/systemd/system/{name}.service", systemdconfig)
    executor.execute("systemctl daemon-reload")
    executor.execute(f"systemctl enable {name}")
    executor.execute(f"systemctl restart {name}")


def configure_coredns(executor):
    print("  Configuring coredns")
    configpath = j.core.tools.text_replace("{DIR_BASE}/cfg/coredns.conf")
    config = corednsconfig.format(domain=THREEBOT_DOMAIN)
    executor.file_write(configpath, config)
    executor.execute("systemctl stop systemd-resolved && systemctl disable systemd-resolved")
    configure_systemd_unit(executor, "coredns", path=f"{corednspath} -conf {configpath}")


def configure_redis(executor, privateip):
    print("  Configuring redis")
    dbpath = j.core.tools.text_replace("{DIR_BASE}/var/redis/")
    j.sal.fs.createDir(dbpath)
    configpath = j.core.tools.text_replace("{DIR_BASE}/cfg/redis-jsx.conf")
    if privateip != MASTERIP:
        bindip = f"127.0.0.1 {privateip}"
    else:
        bindip = privateip
    config = redisconfig.format(bindip=bindip, dbpath=dbpath)
    if privateip != MASTERIP:
        config += f"\nslaveof {MASTERIP} 6378\n"
    executor.file_write(configpath, config)
    configure_systemd_unit(executor, "redis-jsx", path=f"{redisserverpath} {configpath}")


def configure_tcprouter(executor):
    print("  Configuring tcprouter")
    configpath = j.core.tools.text_replace("{DIR_BASE}/cfg/router.toml")
    executor.file_write(configpath, routerconfig)
    configure_systemd_unit(executor, "tcprouter", path=f"{tcprouterserverpath} -config {configpath}")


configure_redis(j.tools.executor.local, MASTERIP)
j.sal.nettools.waitConnectionTest(MASTERIP, 6378)

rediscli = j.clients.redis.get(MASTERIP, port=6378)
tfgateway = j.tools.tf_gateway.get(rediscli)
for x, region in enumerate(regions):
    name = f"router{x+1}Staging"
    sshname = f"do_{name}"
    if not do.droplet_exists(name):
        print(f"Droplet create {name}")
        droplet, _ = do.droplet_create(
            name, "rana", region=region, size_slug=size, delete=False, project_name=project_name
        )
    else:
        print(f"Droplet get {name}")
        droplet = do._droplet_get(name)

    # j.clients.ssh.get(name=sshname, addr=droplet.ip_address, login="root", sshkey_name="default") TODO
    j.clients.ssh.get(name=sshname, addr=droplet.ip_address, login="root")
    executor = j.tools.executor.ssh_get(sshname)
    clients.append(executor)
    for binary in (tcprouterserverpath, tcprouterclientpath, redisserverpath, corednspath):
        if not executor.exists(binary):
            print(f"  Copy {binary}")
            executor.dir_ensure(j.core.tools.text_replace("{DIR_BASE}/bin"))
            executor.upload(binary, binary)

    privateip = f"192.168.99.{x + 1}"
    configure_wg(sshname, privateip)
    configure_redis(executor, privateip)
    configure_tcprouter(executor)
    configure_coredns(executor)
    tfgateway.domain_register_a("@", THREEBOT_DOMAIN, executor.sshclient.addr)  # TODO what is @

wg.save()
wg.configure()

print("Wating for DNS ...")
j.sal.nettools.waitConnectionTest(THREEBOT_DOMAIN, 443, timeout=60)

print("Start local 3bot")
client = j.servers.threebot.local_start_explorer(background=True)

gedis_packagemanager = j.clients.gedis.get("packagemanager", port=8901, package_name="zerobot.packagemanager")
gedis_packagemanager.actors.package_manager.package_add(
    path=j.core.tools.text_replace("{DIR_CODE}/github/threefoldtech/jumpscaleX_threebot/ThreeBotPackages/tfgrid/dns")
)
gedis_packagemanager.actors.package_manager.package_add(
    path=j.core.tools.text_replace(
        "{DIR_CODE}/github/threefoldtech/jumpscaleX_threebot/ThreeBotPackages/tfgrid/network"
    )
)
gedis_packagemanager.actors.package_manager.package_add(
    path=j.core.tools.text_replace(
        "{DIR_CODE}/github/threefoldtech/jumpscaleX_threebot/ThreeBotPackages/tfgrid/threebot_provisioning"
    )
)
client.reload()

gedis_gridnetwork = j.clients.gedis.get("gridnetwork", port=8901, package_name="tfgrid.network")
networks = gedis_gridnetwork.actors.gridnetwork.network_find()
for network in networks.res:
    if network.name == "3botnetwork":
        break
else:
    gedis_gridnetwork.actors.gridnetwork.network_add("3botnetwork", "10.2.0.0/16")

existingendpoints = []
for endpoint in gedis_gridnetwork.actors.gridnetwork.network_endpoint_find("3botnetwork").res:
    existingendpoints.append(endpoint.network_public.split("/")[0])

for executor in clients:
    if executor.sshclient.addr not in existingendpoints:
        gedis_gridnetwork.actors.gridnetwork.network_endpoint_add("3botnetwork", executor.sshclient.name)
