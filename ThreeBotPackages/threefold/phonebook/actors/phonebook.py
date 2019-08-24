from Jumpscale import j

JSBASE = j.baseclasses.object
NONE = 2147483647


class phonebook(JSBASE):
    def __init__(self, *args, **kwargs):
        bcdb = j.data.bcdb.get("threebot_phonebook")
        self.phonebook_model = bcdb.model_get(url="threebot.phonebook.user.1")

    def register(self, **kwargs):
        """
        ```in
        name = (S)
        email = (S)
        pubkey = ""                             #public key of the 3bot
        ipaddr = ""                             #how to reach the digitalme (3bot)
        description = ""                        #optional
        signature = ""                          #proof that content is ok, is on id+name+email+pubkey

        ```

        ```out
        !threebot.phonebook.user.1
        ```

        """
        u = self.phonebook_model.new(data=kwargs)
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
