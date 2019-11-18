from Jumpscale import j

# SCHEMA = """
# @url = appstore.app.1
# appname** = (S)
# installed = (B)
# description = (S)
# image = (S)
# """


class apps(j.baseclasses.threebot_actor):
    def _init(self, *args, **kwargs):
        bcdb = j.data.bcdb.get("appstore")
        self.model = bcdb.model_get(url="appstore.app.1")
        # self.model = bcdb.model_get(schema=SCHEMA)

    def _validate_app(self, app):
        for field in ["appname", "description", "image"]:
            if not getattr(app, field):
                raise j.exceptions.Value("%s is required" % field)

    def _get_app(self, app_id):
        try:
            return self.model.get(app_id)
        except j.exceptions.NotFound:
            raise j.exceptions.NotFound("App %s not found" % app_id)

    def new(self, schema_out=None, user_session=None):
        app = self.model.new()
        return app

    @j.baseclasses.actor_method
    def put(self, app, schema_out=None, user_session=None):
        """
        ```in
        app = (O) !appstore.app.1
        ```
        """

        self._validate_app(app)

        if getattr(app, "id"):
            self._get_app(app.id)
            self.model.set_dynamic(app._ddict, obj_id=app.id)
        else:
            app = self.model.new(app)
            app.save()

    @j.baseclasses.actor_method
    def get(self, schema_out=None, user_session=None):
        """
        ```out 
        apps = (LO) !appstore.app.1
        ```
        """
        out = schema_out.new()

        for app in self.model.iterate():
            out.apps.append(app)
        return out


# a = apps()
# print(a.get())
# app = a.new()
# app.appname = "sss"
# app.description = "ss"
# app.image = "ssssssss"
# a.put(app=app)
