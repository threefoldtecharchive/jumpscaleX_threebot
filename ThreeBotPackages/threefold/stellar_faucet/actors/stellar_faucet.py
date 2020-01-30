
from Jumpscale import j

class stellar_faucet(j.baseclasses.threebot_actor):
    @j.baseclasses.actor_method
    def transfer(self, destination, schema_out=None, user_session=None):
        distributor = j.clients.stellar.get("distributor")
        distributor.network = "TEST"
        distributor.secret = "SASF74IBJWIDGZ22WUXONXGHILZMBZENZTULYPU5C2ELGQV3YQ6D5X5S"
        try:
            distributor.transfer(destination_address=destination, amount="100", asset="tft:GDVT4IOGT4XRUHQTEEMC4JTTPOFFOVIIHJEIYBMBNHBSTS2OB6LEXPK7")
        except Exception as e:
            raise e