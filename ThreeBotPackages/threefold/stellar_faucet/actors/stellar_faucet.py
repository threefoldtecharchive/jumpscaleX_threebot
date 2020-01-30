
from Jumpscale import j

class stellar_faucet(j.baseclasses.threebot_actor):
    @j.baseclasses.actor_method
    def transfer(self, destination, schema_out=None, user_session=None):
        distributor = j.clients.stellar.get("distributor")
        distributor.network = "TEST"

        distributorsecret = j.core.myenv.config.get("distributorsecret")
        if distributorsecret is None:
            raise j.exceptions.Base("Distributor secret is not set!")

        distributor.secret = distributorsecret

        issuer = j.core.myenv.config.get("issuer")
        if issuer is None:
            raise j.exceptions.Base("Issuer address is not set!")

        amount = j.core.myenv.config.get("amount")
        if amount is None:
            raise j.exceptions.Base("Amount to drip is not set!")

        asset = "tft:" + issuer

        try:
            distributor.transfer(destination_address=destination, amount=amount, asset=asset)
        except Exception as e:
            raise e