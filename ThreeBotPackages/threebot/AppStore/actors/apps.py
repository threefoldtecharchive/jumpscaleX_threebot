from Jumpscale import j


class apps(j.baseclasses.threebot_actor):
    def _init(self, *args, **kwargs):
        bcdb = j.data.bcdb.get('appstore')
        self.model = bcdb.model_get(url='appstore.app')

    def add(self, appname="", installed=True, schema_out=None, user_session=None):
        #default doesn't work
        """
        ```in
        appname = (S)
        installed = (B)
        ```
        """
        #import ipdb; ipdb.set_trace()
        app = self.model.new()
        app.appname = appname
        app.installed = installed
        app.save()
        response = {"result": True, "error_code": "", "error_message": ""}
        return j.data.serializers.json.dumps(response)

    def get(self, schema_out=None, user_session=None):
        apps =  self.model.find()

        res = []

        for app in apps:
            outApp = {
                "name": app.appname,
                "installed": app.installed,
                "description": app.description,
                "image": app.image
            }

            res.append(outApp)

        return j.data.serializers.json.dumps(res)

    def update(self, appname="", installed=True, schema_out=None, user_session=None):
        """
        ```in
        appname = (S)
        installed = (B)
        ```
        """
        app = self.model.find()

        for application in app:
            if application.appname == appname:
                application.installed = installed
                application.save()

        response = {"result": True, "error_code": "", "error_message": ""}
        return j.data.serializers.json.dumps(response)