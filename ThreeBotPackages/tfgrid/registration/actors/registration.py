from Jumpscale import j
import gevent

from nacl.signing import SigningKey
from nacl.encoding import HexEncoder

TESTNET_DOMAIN = "testnet.grid.tf"
THREEBOT_DOMAIN = f"3bot.{TESTNET_DOMAIN}"
EXPLORER_DOMAIN = f"explorer.{TESTNET_DOMAIN}"


class registration(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        self.format = "json"

    @j.baseclasses.actor_method
    def register(self, doublename, email, description, user_session=None):
        """
        ```in
        doublename = (S)
        email = (S)
        description = (S)
        ```
        """

        if not doublename:
            raise j.exceptions.Value("doublename cant not be empty")

        if email is None:
            raise j.exceptions.Value("email can not be empty")

        nacl = j.data.nacl.default

        phonebook_explorer = j.clients.gedis.get(
            name="phonebook_explorer", host=EXPLORER_DOMAIN, port=8901, package_name="tfgrid.phonebook"
        )
        # Request a new id from the public Phonebook
        pubkey = nacl.verify_key_hex
        wallet_name, _ = doublename.split(".")
        phonebook_explorer.actors.phonebook.wallet_create(name=wallet_name)
        record = phonebook_explorer.actors.phonebook.name_register(
            name=doublename, pubkey=pubkey, wallet_name=wallet_name
        )
        sender_signature_hex = j.data.nacl.payload_sign(
            record.id, doublename, email, "", description, pubkey, nacl=nacl
        )
        phonebook_explorer.actors.phonebook.record_register(
            tid=record.id,
            name=doublename,
            email=email,
            description=description,
            pubkey=pubkey,
            sender_signature_hex=sender_signature_hex,
        )

        gridnetwork_explorer = j.clients.gedis.get(
            name="gridnetwork_explorer", host=EXPLORER_DOMAIN, port=8901, package_name="tfgrid.network"
        )
        # Request ip address from the grid manager
        gridmanager_client = j.clients.gridnetwork.get("gridnetwork_explorer")
        wireguard = gridmanager_client.network_connect("3botnetwork", doublename)
        # Request a record from the name manager
        namemanager_explorer = j.clients.gedis.get(
            name="namemanager_explorer", host=EXPLORER_DOMAIN, port=8901, package_name="tfgrid.dns"
        )
        privateip = wireguard.network_private.split("/")[0]
        signature = j.data.nacl.payload_sign(doublename, nacl=nacl)
        namemanager_explorer.actors.namemanager.domain_register(doublename, privateip, signature)

        content = "\n".join([f"nameserver {p.network_public}" for p in wireguard.peers_objects])
        j.sal.fs.writeFile("/etc/resolv.conf", content + "\n", append=False)

        print(f"Done, your url is: {doublename}.{THREEBOT_DOMAIN}")

    @j.baseclasses.actor_method
    def set_identity(self, tid, tname, email, pubkey, user_session):
        """
        ```in
        tid = (I)
        tname = (S)
        email = (S)
        pubkey = (S)
        ```
        """
        j.tools.threebot.me.get(name="default", tid=tid, tname=tname, email=email, pubkey=pubkey).save()
