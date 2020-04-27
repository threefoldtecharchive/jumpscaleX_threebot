from Jumpscale import j
import json


class wallet(j.baseclasses.threebot_actor):
    @j.baseclasses.actor_method
    def create_wallet(self, args, schema_out=None, user_session=None):

        name = str(args)
        explorerurl = j.clients.explorer.default.url
        wallettype = "STD"
        if "testnet" in explorerurl or "devnet" in explorerurl:
            wallettype = "TEST"

        while j.clients.stellar.exists(name):
            raise ValueError("Name already exists")
        wallet = j.clients.stellar.new(name=name, network=wallettype)

        wallet.activate_through_threefold_service()
        wallet.add_known_trustline("TFT")
        wallet.add_known_trustline("FreeTFT")

        return j.data.serializers.json.dumps(wallet.address)

    @j.baseclasses.actor_method
    def manage_wallet(self, args, schema_out=None, user_session=None):

        name = str(args)
        wallet = j.clients.stellar.get(name=name)
        balances = wallet.get_balance()
        data = []
        for item in balances.balances:
            data.append(
                {"balance": item.balance, "asset_code": item.asset_code, "asset_issuer": item.asset_issuer,}
            )

        ret = {"address": wallet.address, "secret": wallet.secret, "balances": data}
        return j.data.serializers.json.dumps(ret)

    @j.baseclasses.actor_method
    def get_wallets(self, schema_out=None, user_session=None):

        wallets = j.clients.stellar.find()
        ret = []
        for wallet in wallets:
            ret.append({"name": wallet.name, "address": wallet.address})
        return j.data.serializers.json.dumps(ret)

    @j.baseclasses.actor_method
    def import_wallet(self, name, secret, network, schema_out=None, user_session=None):
        """
        ```in
        name = (S)
        secret = (S)
        network = (S)
        ```
        """
        network = network or "TEST"
        wallet = j.clients.stellar.new(name=name, secret=secret, network=network)
        return j.data.serializers.json.dumps(wallet.address)
