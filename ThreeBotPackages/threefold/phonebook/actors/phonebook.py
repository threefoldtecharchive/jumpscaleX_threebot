from Jumpscale import j
import binascii
from io import BytesIO

JSBASE = j.baseclasses.object
NONE = 2147483647


class phonebook(j.baseclasses.threebot_actor):
    def _init(self, *args, **kwargs):

        self._bcdb = self._bcdb_get("threebot_phonebook")
        self.phonebook_model = self._bcdb.model_get(url="threebot.phonebook.user.1")

    def register(self, name=None, email=None, ipaddr="", description="", pubkey=None, signature=None, schema_out=None):
        """
        ```in
        name = (S)
        email = (S)
        pubkey = ""                             #public key of the 3bot
        ipaddr = ""                             #how to reach the digitalme (3bot)
        description = ""                        #optional
        signature = ""                          #in hex
        ```

        ```out
        !threebot.phonebook.user.1
        ```

        """

        assert name
        assert email

        # pubkey2 = binascii.unhexlify(pubkey)
        # n = j.data.nacl.default

        signature_hex = j.clients.threebot._payload_check(
            name=name, email=email, ipaddr=ipaddr, description=description, pubkey_hex=pubkey
        )

        if not signature_hex == signature:
            raise j.exceptions.Input("threebot cannot be registered, signature wrong")

        res = self.phonebook_model.find(name=name)
        id = None
        if len(res) == 1:
            id = res[0].id
            if pubkey != res[0].pubkey:
                raise j.exceptions.Input(
                    "public key cannot be changed once registered, it serves as the security for making changes"
                )
        elif len(res) > 1:
            raise j.exceptions.Input("cannot have more than 1 user on name")

        u = self.phonebook_model.new(
            id=id,
            name=name,
            email=email,
            ipaddr=ipaddr,
            description=description,
            pubkey=pubkey,
            signature=signature_hex,
        )
        u.save()
        return u

    def get(self, tid=None, name=None, email=None, schema_out=None):
        """
        ```in
        tid = (I)
        name = (S)
        email = (S)
        ```

        ```out
        !threebot.phonebook.user.1
        ```
        """
        if tid and not tid == NONE:
            user = self.phonebook_model.get(tid, die=False)
            if not user:
                raise j.exceptions.NotFound("user not found id:{user_id}" % locals())
            return user
        elif name:
            users = self.phonebook_model.find(name=name)
        elif email:
            users = self.phonebook_model.find(email=email)
        else:
            raise j.exceptions.NotFound("param error need to specify user_id or name or email")

        if len(users) <= 0:
            raise j.exceptions.NotFound("user not found (%s)" % locals())
        if len(users) > 1:
            raise j.exceptions.NotFound("more than 1 user found (%s)" % locals())

        return users[0]
