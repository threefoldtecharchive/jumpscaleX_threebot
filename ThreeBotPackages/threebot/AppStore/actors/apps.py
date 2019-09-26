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
        print("appname: " + appname)
        #import ipdb; ipdb.set_trace()
        app = self.model.new()
        app.appname = appname
        app.installed = installed
        print(app)
        app.save()
        response = {"result": True, "error_code": "", "error_message": ""}
        return j.data.serializers.json.dumps(response)

    def get(self, schema_out=None, user_session=None):
       
        apps =  self.model.find()

        res = []

        for app in apps:
            #print("User: ", user)
            print(app.installed)
            res.append({app.appname : app.installed})

        return j.data.serializers.json.dumps(res)

    