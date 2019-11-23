from Jumpscale import j


class pastebin(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):

        from random import choice

        paste_schema = """
        @url = jumpscale.pastebin.paste
        code = "" (S)
        """

        self.paste_model = j.data.bcdb.system.model_get(schema=paste_schema)
        for i in range(10):
            paste = self.paste_model.new()
            paste.code = """print("hello")"""

    @j.baseclasses.actor_method
    def get_paste(self, paste_id, schema_out=None, user_session=None):
        paste = j.data.serializers.json.dumps(self.paste_model.get(paste_id)._ddict)
        return paste

    @j.baseclasses.actor_method
    def new_paste(self, code, schema_out=None, user_session=None):
        paste = self.paste_model.new()
        paste.code = code
        paste.save()
        res = j.data.serializers.json.dumps(paste._ddict)
        return res
