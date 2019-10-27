#!/usr/bin/env python3
from Jumpscale import j

THREEBOT_DOMAIN = "3bot.grid.tf"
THREEBOT_PRIVATE_DOMAIN = "3bot"
PHONEBOOK_DOMAIN = f"phonebook.{THREEBOT_DOMAIN}"
GATEWAY_DOMAIN = f"gateway.{THREEBOT_DOMAIN}"
MASTERIP = "192.168.99.254"

def destroy(doublename):
    mainname = f"threebot-{doublename}"
    sshnames = [f"do_{mainname}", f"do_{mainname}_docker"]
    for name in sshnames:
        j.clients.ssh.delete(name)
    j.clients.digitalocean.delete(mainname)
    gedismodel = j.data.bcdb.system.model_get(url="jumpscale.gedis.client")
    for cl in gedismodel.find(name=mainname):
        cl.delete()
    j.tools.threebot_deploy.delete(doublename)
    redisclient = j.clients.redis.get(MASTERIP, port=6378)
    first, last = doublename.split(".")
    if redisclient.hexists(first, f"{last}.{THREEBOT_DOMAIN}."):
        redisclient.hdel(first, f"{last}.{THREEBOT_DOMAIN}.")
    if redisclient.exists(f"/tcprouter/service/{doublename}.{THREEBOT_DOMAIN}"):
        redisclient.delete("/tcprouter/service/grim.reaper.3bot.grid.tf")


    bcdb = j.data.bcdb.get("threebot_phonebook")
    phonebook_model = bcdb.model_get(url="threebot.phonebook.user.1")
    for result in phonebook_model.find(name=doublename):
        result.delete()

    cl = j.clients.gedis.get(name="gridnetwork", host="3bot.grid.tf", port=8901)
    try:
        cl.actors.gridnetwork.network_peer_remove("3botnetwork", doublename)
    except j.exceptions.RemoteException:
        pass
    
                                                                
                                                                
if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("-n", '--doublename')
    options = parser.parse_args()
    destroy(options.doublename)
