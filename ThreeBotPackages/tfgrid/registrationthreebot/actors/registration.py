from Jumpscale import j
import gevent

from nacl.signing import SigningKey
from nacl.encoding import HexEncoder

EXPLORER_DOMAIN = j.core.myenv.config.get("EXPLORER_ADDR")
THREEBOT_DOMAIN = j.core.myenv.config.get("THREEBOT_DOMAIN")


class registration(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        self.format = "json"

    @j.baseclasses.actor_method
    def register(self, threebot_name=None, email=None, description="", schema_out=None, user_session=None):
        """
        ```in
        threebot_name = (S)
        email = (S)
        description = (S)
        ```
        """

        if not threebot_name:
            raise j.exceptions.Value("threebot_name cant not be empty")

        if email is None:
            raise j.exceptions.Value("email can not be empty")

        nacl = j.me.encryptor

        phonebook_explorer = j.clients.gedis.get(
            name="phonebook_explorer", host=EXPLORER_DOMAIN, port=8901, package_name="tfgrid.phonebook"
        )
        # Request a new id from the public Phonebook
        pubkey = nacl.verify_key_hex
        phonebook_explorer.actors.phonebook.wallet_create(name=threebot_name)
        record = phonebook_explorer.actors.phonebook.name_register(
            name=threebot_name, pubkey=pubkey, email=email, wallet_name=threebot_name
        )
        sender_signature_hex = j.data.nacl.payload_sign(
            record.id, threebot_name, email, "", description, pubkey, nacl=nacl
        )
        phonebook_explorer.actors.phonebook.record_register(
            tid=record.id,
            name=threebot_name,
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
        wireguard = gridmanager_client.network_connect("3botnetwork", threebot_name)
        # Request a record from the name manager
        gateway_explorer = j.clients.gedis.get(
            name="gateway_explorer", host=EXPLORER_DOMAIN, port=8901, package_name="tfgrid.gateway"
        )
        privateip = wireguard.network_private.split("/")[0]
        signature = j.data.nacl.payload_sign(threebot_name, nacl=nacl)
        gateway_explorer.actors.gateway.domain_tcpservice_ip_expose(threebot_name, privateip, signature)

        print(f"Done, your url is: {threebot_name}.{THREEBOT_DOMAIN}")

    @j.baseclasses.actor_method
    def set_identity(self, tid=None, tname=None, email=None, pubkey=None, schema_out=None, user_session=None):
        """
        ```in
        tid = (I)
        tname = (S)
        email = (S)
        pubkey = (S)
        ```
        """
        j.myidentities.me.get(name="default", tid=tid, tname=tname, email=email, pubkey=pubkey).save()
