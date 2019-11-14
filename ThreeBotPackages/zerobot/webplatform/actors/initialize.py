from Jumpscale import j

import gevent

from nacl.signing import SigningKey
from nacl.encoding import HexEncoder


TESTNET_DOMAIN = "testnet.grid.tf"
THREEBOT_DOMAIN = f"3bot.{TESTNET_DOMAIN}"
EXPLORER_DOMAIN = f"explorer.{TESTNET_DOMAIN}"


class initialize(j.baseclasses.threebot_actor):
    def _init(self, *args, **kwargs):
        bcdb = j.data.bcdb.get("users")
        self.user_model = bcdb.model_get(url="user.1")

    def _validate_user(self, user):
        for field in ["bot_name", "public_key", "location"]:
            if not getattr(user, field):
                raise j.exceptions.Value("%s is required" % field)

    def get(self, bot_name, public_key, referrer, schema_out=None, user_session=None):
        """
        ```in
        bot_name = (S)
        public_key = (S)
        referrer = (S)
        ```

        ```out
        users = (LO) !user.1
        ```
        """

        out = schema_out.new()
        for user in self.user_model.iterate():
            if bot_name != "" and user.bot_name != bot_name:
                continue
            if public_key != "" and user.public_key != public_key:
                continue
            if referrer != "" and user.referrer != referrer:
                continue
            out.users.append(user)
        return out

    def name(self, schema_out=None, user_session=None):
        """
        ```out
        name  = ""
        ```
        """

        out = schema_out.new()
        out.name = j.tools.threebot.me.default.tname

        return out

    def add(self, user, schema_out=None, user_session=None):
        """
        ```in
        user = (O) !user.1
        ```

        ```out
        user  = (O) !user.1
        ```
        """

        try:
            length = len(self.user_model.find())
        except j.exceptions.NotFound:
            raise j.exceptions.NotFound("Could not found user_model")

        if length == 0:
            self._validate_user(user)

            user = self.user_model.new(user)
            user.save()

            res = schema_out.new()
            res.user = user
            return res
        else:
            raise Exception("Already initialized.")

    def reseed(self, newseed, user_session):
        """
        ```in
        newseed = (S)
        ```
        :param newseed:
        :param user_session:
        :return:
        """
        nacl = j.data.nacl.default
        explorer = j.clients.gedis.get(name="explorer", host=EXPLORER_DOMAIN, port=8901)
        explorer.reload()

        # create a signature used to update the public key in the phonebook
        tid = j.tools.threebot.me.default.tid
        seed = j.data.encryption.mnemonic.to_entropy(newseed)
        new_key = SigningKey(seed).encode(HexEncoder)
        signature = j.data.nacl.payload_sign(tid, new_key, nacl=nacl)

        # export data
        exportpath = j.sal.fs.getTmpDirPath()
        j.data.bcdb.system.export(exportpath, False)

        # configure nacl with the new seed
        j.data.nacl.configure(privkey_words=newseed, reset=True)

        # update the public key in the phonebook
        explorer.actors.phonebook.update_public_key(tid, new_key, signature)

        me = j.tools.threebot.me.default
        me.pubkey = new_key
        me.save()

        j.tools.threebot_packages.delete("registration")
        j.sal.process.execute(f"kosmos -p 'system = j.data.bcdb.get_system(); system.import_(\"{exportpath}\")'")
        j.sal.fs.remove(exportpath)

        # restart myself
        gevent.spawn_later(5, j.sal.process.restart_program)
