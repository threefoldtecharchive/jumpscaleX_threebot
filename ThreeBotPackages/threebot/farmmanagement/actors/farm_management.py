from Jumpscale import j


class farm_management(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        # TODO: need to be able to choose which client
        self._explorer = j.clients.explorer.default
        # TODO: need to be able to choose which identity
        self._me = j.tools.threebot.me.default
        self._farm_model = j.data.schema.get_from_url("tfgrid.directory.farm.1")

    def update_farm(self, farm_id, farm):
        farm = self._farm_model.new(datadict=farm)
        self._explorer.farms.update(farm, self._me)

    def mark_node_free(self, node_id, free):
        return self.nodes.configure_free_to_use(node_id, free, me=self._me)
