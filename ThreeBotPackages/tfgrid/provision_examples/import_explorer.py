from Jumpscale import j


cl = j.clients.ssh.get("explorer", addr="explorer.testnet.grid.tf")


# cl.executor.download("/sandbox/var/zdb/default_zdb_threebot", "/sandbox/var/zdb/default_zdb_threebot")
# cl.executor.download("/sandbox/cfg/keys", "/sandbox/cfg/keys")
# cl.executor.download("/sandbox/cfg/bcdb_config", "/sandbox/cfg/bcdb_config")
# cl.executor.download("/sandbox/cfg/jumpscale_config.toml", "/sandbox/cfg/jumpscale_config.toml")


cl.executor.download("/sandbox/var/zdb", "/sandbox/var/zdb")
cl.executor.download("/sandbox/cfg", "/sandbox/cfg")
cl.executor.download("/sandbox/var/bcdb", "/sandbox/var/bcdb")

j.clients.threebot.explorer.actors_default.workload_manager.reservations_list()
j.clients.threebot.explorer.actors_default.nodes.list()


j.shell()
