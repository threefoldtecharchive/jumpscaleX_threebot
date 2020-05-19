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
        return json.dumps([farm._ddict for farm in farms])
        

    @j.baseclasses.actor_method
    def list_nodes(self, schema_out=None, user_session=None):
        """list nodes
        """
        nodes = []
        results = filter(self.zos.nodes_finder.filter_is_up, self.zos.nodes_finder.nodes_search())
        for result in results:
            nodes.append(result._ddict)
        return nodes