from Jumpscale import j
import binascii
from io import BytesIO

JSBASE = j.baseclasses.object
NONE = 2147483647


class phonebook(j.baseclasses.threebot_actor):
    def _init(self, *args, **kwargs):

        self._bcdb = self._bcdb_get("threebot_phonebook")
        self.phonebook_model = self._bcdb.model_get(url="threebot.phonebook.user.1")

    def register(self, payload=None, signature=None, schema_out=None):
        """
        ```in
        payload = "" (bytes)
        signature = "" (bytes)
        ```

        is a json encoded message with following props:

            name = (S)
            email = (S)
            pubkey = ""                             #public key of the 3bot
            ipaddr = ""                             #how to reach the digitalme (3bot)
            description = ""                        #optional

        signature = ""                          #proof that content is ok, is on id+name+email+pubkey


        ```out
        !threebot.phonebook.user.1
        ```

        """

        data = j.data.serializers.json.loads(payload)

        pubkey = binascii.unhexlify(data["pubkey"])

        n = j.data.nacl.default

        # we check that the data send corresponds to the pubkey used
        n.verify(payload, signature, verify_key=pubkey)

        data["signature"] = binascii.hexlify(signature)

        res = self.phonebook_model.find(name=data["name"])
        if len(res) == 1:
            data["id"] = res[0].id
            if data["pubkey"] != res[0].pubkey:
                j.shell()
                raise j.exceptions.Input(
                    "public key cannot be changed once registered, it serves as the security for making changes"
                )
        elif len(res) > 1:
            raise j.exceptions.Input("cannot have more than 1 user on name")

        u = self.phonebook_model.new(data=data)
        u.save()
        return u

    def get(self, user_id=None, name=None, email=None, schema_out=None):
        """
        ```in
        user_id = (I)
        name = (S)
        email = (S)
        ```

        ```out
        !threebot.phonebook.user.1
        ```
        """
        if user_id and not user_id == NONE:
            if not self.phonebook_model.exists(id=user_id):
                users = []
            else:
                users = [self.phonebook_model.new(id=user_id)]
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
