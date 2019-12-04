from Jumpscale import j
import os
from argparse import ArgumentParser
import random

from uuid import uuid4
def random_string():
        return "threebot_" + str(uuid4()).replace("-", "")[:10]

def main(options):
    iyo_name = random_string()
    iyo = j.clients.itsyouonline.get(
        iyo_name, baseurl="https://itsyou.online/api", application_id=options.iyo_id, secret=options.iyo_secret
    )

    jwt = iyo.jwt_get().jwt

    # create sshkey and provide the public key
    keypath = '/root/.ssh/id_rsa.pub'
    if not os.path.isfile(keypath):
        os.system("echo  | ssh-keygen -P ''")
    with open(keypath, "r") as key:
        pub_key = key.read()
    pub_key.replace('\n', '')

    flist = options.Flist
    container_name = random_string()
    node_ip = options.node_ip
    client_name = random_string()
    node = j.clients.zos.get(client_name, host=node_ip, password=jwt)
    port = random.randint(2000, 3000)
    ports = {port: 22,443:443,80:80}

    container_id = node.client.container.create(
        name=container_name,
        root_url=flist,
        port=ports,
        nics=[{"type": "default"}],
        config={"/root/.ssh/authorized_keys": pub_key},
    ).get()

    return "DONE"
if __name__ == "__main__":
    parser = ArgumentParser()
    parser.add_argument("-i", "--id", type=str, dest="iyo_id", required=True,
                        help="IYO id of your account")
    parser.add_argument("-s", "--secret", type=str, dest="iyo_secret", required=True,
                        help="IYO secret of your account")
    parser.add_argument("-f", "--flist", type=str, dest="Flist", required=True,
                        help="The flist link")
    parser.add_argument("-p", "--ip", type=str, dest="node_ip", required=True,
                        help="IP of the zeroos machine that will be used")
    options = parser.parse_args()
    main(options)