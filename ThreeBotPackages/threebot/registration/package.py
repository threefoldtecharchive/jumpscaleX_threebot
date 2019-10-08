from Jumpscale import j

THREEBOT_DOMAIN = "3bot.grid.tf"
PHONEBOOK_DOMAIN = f"phonebook.{THREEBOT_DOMAIN}"
NAME_MANAGER_DOMAIN = f"namemanager.{THREEBOT_DOMAIN}"
GRID_MANAGER_DOMAIN = f"gridmanager.{THREEBOT_DOMAIN}"


class Package(j.baseclasses.threebot_package):
    def _init(self, *args, **kwargs):
        pass

    def prepare(self):
        """
        is called at install time
        :return:
        """
        pass

    def install(self):
        """
        called when the 3bot starts
        :return:
        """
        config = j.core.myenv.config
        doublename = config.get("3BOT_DOUBLE_NAME", None)
        email = config.get("3BOT_EMAIL", None)
        description = config.get("3BOT_DOUBLE_DESC", "")

        if doublename is None:
            raise j.exceptions.Value("3BOT_DOUBLE_NAME is not configured, please configure it first")

        if email is None:
            raise j.exceptions.Value("3BOT_EMAIL is not configured, please configure it first")

        nacl = j.data.nacl.get("nacl")
        phonebook = j.clients.gedis.get(name="phonebook", host=PHONEBOOK_DOMAIN, port=8901)
        namemanager = j.clients.gedis.get(name="namemanager", host=NAME_MANAGER_DOMAIN, port=8901)
        gridmanager = j.clients.gedis.get(name="gridmanager", host=GRID_MANAGER_DOMAIN, port=8901)

        # Request a new id from the public Phonebook
        pubkey = nacl.verify_key_hex
        wallet_name, _ = doublename.split(".")
        phonebook.actors.phonebook.wallet_create(name=wallet_name)
        record = phonebook.actors.phonebook.name_register(name=doublename, pubkey=pubkey, wallet_name=wallet_name)
        sender_signature_hex = j.data.nacl.payload_sign(
            record.id, doublename, email, "", description, pubkey, nacl=nacl
        )
        phonebook.actors.phonebook.record_register(
            tid=record.id,
            name=doublename,
            email=email,
            description=description,
            pubkey=pubkey,
            sender_signature_hex=sender_signature_hex,
        )
        # Request ip address from the grid manager
        gridmanager_client = j.clients.gridnetwork.get("gridmanager")
        wireguard = gridmanager_client.network_connect("3botnetwork", doublename)
        # Request a record from the name manager
        privateip = wireguard.network_private.split("/")[0]
        signature = j.data.nacl.payload_sign(f"{doublename}{privateip}", nacl=nacl)
        namemanager.actors.namemanager.domain_register(doublename, privateip, signature)
        print(f"Done, your url is: {doublename}.{THREEBOT_DOMAIN}")

    def stop(self):
        """
        called when the 3bot stops
        :return:
        """
        pass

    def uninstall(self):
        """
        called when the package is no longer needed and will be removed from the threebot
        :return:
        """
        pass
