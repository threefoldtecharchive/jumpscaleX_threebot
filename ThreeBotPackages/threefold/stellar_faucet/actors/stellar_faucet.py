
from Jumpscale import j

class stellar_faucet(j.baseclasses.threebot_actor):
    @j.baseclasses.actor_method
    def transfer(self, destination, schema_out=None, user_session=None):
        distributor = j.clients.stellar.get("distributor")
        distributor.network = "TEST"
        distributor.secret = "SAU4LYLHOFEBC4OFWN75LINKLIQGEIADXOLAAPUZYKGJW6PDQRRM27NO"
        try:
            distributor.transfer(destination_address=destination, amount="100", asset="tft:GDCH626IWPCASGQJP6U7JYSB67VMDZWKWD47NTNUA2UWS2RK34GKRDJE")
        except Exception as e:
            raise e