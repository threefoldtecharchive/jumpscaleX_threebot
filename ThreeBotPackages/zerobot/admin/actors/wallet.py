from Jumpscale import j
from JumpscaleLibs.clients.stellar.StellarClient import _NETWORK_KNOWN_TRUSTS


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

        try:
            wallet.activate_through_threefold_service()
        except Exception:
            wallet.delete()
            raise

        trustlines = _NETWORK_KNOWN_TRUSTS[str(wallet.network)].copy()
        for asset_code in trustlines.keys():
            wallet.add_known_trustline(asset_code)

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
    def updateTrustLines(self, name, schema_out=None, user_session=None):
        name = str(name)
        wallet = j.clients.stellar.get(name=name)
        trustlines = _NETWORK_KNOWN_TRUSTS[str(wallet.network)].copy()
        for balance in wallet.get_balance().balances:
            if balance.asset_code in trustlines:
                trustlines.pop(balance.asset_code)
        for asset_code in trustlines.keys():
            wallet.add_known_trustline(asset_code)
        return trustlines

    @j.baseclasses.actor_method
    def get_wallets(self, schema_out=None, user_session=None):
        while True:
            try:
                wallets = j.clients.stellar.find()
                break
            except j.exceptions.Input:
                # cleaning broken wallets
                pass
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

    @j.baseclasses.actor_method
    def delete_wallet(self, name, schema_out=None, user_session=None):
        """
        ```in
        name = (S)
        ```
        """
        j.clients.stellar.delete(name=name)
        return j.data.serializers.json.dumps({"result": True})
