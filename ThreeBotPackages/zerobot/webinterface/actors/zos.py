import json
from Jumpscale import j


class zos(j.baseclasses.threebot_actor):

    def _init(self, **kwargs):
        self.zos = j.sal.zosv2
        self.explorer = j.clients.explorer.default

    @j.baseclasses.actor_method
    def list_farms(self, schema_out=None, user_session=None):
        """list farms
        """
        farms = self.explorer.farms.list()
        return json.dumps([farm.name for farm in farms])
        

    @j.baseclasses.actor_method
    def find_nodes(self, farm_name=None, cru=None, sru=None, mru=None, hru=None, schema_out=None, user_session=None):
        """find nodes

        ```in
        farm_name = (S)
        cru = (I)
        mru = (I)
        hru = (I)
        sru = (I)
        ```
        """
        nodes = []
        results = self.zos.nodes_finder.nodes_by_capacity(
            farm_name=farm_name,
            cru=cru,
            mru=mru,
            hru=hru,
            sru=sru
        )

        results = filter(self.zos.nodes_finder.filter_is_up, results)
        for result in results:
            nodes.append(result.node_id)
        return nodes