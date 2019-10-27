from Jumpscale import j


class ENTRY(j.data.bcdb._BCDBModelClass):
    def _init2(self, **kwargs):
        self.trigger_add(self.verify)

    def verify(self, obj, action, propertyname):
        if action == "set_pre":
            # TODO: check the signature, if not ok fail
            pass

    def _schema_get(self):
        return j.data.schema.get_from_url("threebot.registry.entry.1")
