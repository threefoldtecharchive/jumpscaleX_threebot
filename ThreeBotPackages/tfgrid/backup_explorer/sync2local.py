from Jumpscale import j

j.application.interactive = True

assert j.tools.console.askYesNo("ARE YOU SURE YOU WANT TO SYNC EXPLORER TO LOCAL, THIS WILL DESTROY ALL")

# remove the existing installed packages
# j.tools.threebot_packages.delete()

# j.data.bcdb.threebot_stop()

cl = j.clients.ssh.get("explorer", addr="explorer.testnet.grid.tf")


def download():
    cl.executor.download("/sandbox/var/zdb", "/sandbox/var/zdb")
    cl.executor.download("/sandbox/var/sonic_db", "/sandbox/var/sonic_db")
    cl.executor.download("/sandbox/cfg", "/sandbox/cfg")
    cl.executor.download("/sandbox/var/bcdb", "/sandbox/var/bcdb")


def synclocal():
    j.sal.fs.copyDirTree("/root/backup/", "/sandbox/var", rsyncdelete=False)
    cl.executor.download("/sandbox/cfg", "/sandbox/cfg")
    # j.sal.fs.createDir("/sandbox/var/codegen")


# THERE IS A BACKUP TO WIN TIME
# synclocal()

download()


# cl.executor.download("/sandbox/var/zdb/default_zdb_threebot", "/sandbox/var/zdb/default_zdb_threebot")
# cl.executor.download("/sandbox/cfg/keys", "/sandbox/cfg/keys")
# cl.executor.download("/sandbox/cfg/bcdb_config", "/sandbox/cfg/bcdb_config")
# cl.executor.download("/sandbox/cfg/jumpscale_config.toml", "/sandbox/cfg/jumpscale_config.toml")

# j.clients.threebot.explorer.actors_all.workload_manager.reservations_list()
# j.clients.threebot.explorer.actors_all.nodes.list()
