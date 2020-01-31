from Jumpscale import j


class stellar_faucet(j.baseclasses.threebot_actor):
    @j.baseclasses.actor_method
    def transfer(self, destination, schema_out=None, user_session=None):
        distributor = j.clients.stellar.get("distributor")
        faucet = j.clients.stellar_faucet.get("faucet")
        distributor.network = "TEST"

        distributor.secret = faucet.secret
        issuer = faucet.issuer
        amount = faucet.amount

        asset = "tft:" + issuer

        try:
            distributor.transfer(destination_address=destination, amount=amount, asset=asset)
        except Exception as e:
            raise e
