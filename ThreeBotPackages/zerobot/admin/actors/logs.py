from Jumpscale import j


class logs(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        self.client = j.clients.logger.get("logs_actor")

    @j.baseclasses.actor_method
    def list_apps(self, schema_out=None, user_session=None):
        apps = list(self.client.get_app_names())
        return j.data.serializers.json.dumps(apps)

    @j.baseclasses.actor_method
    def count(
        self, appname=None, all=False, schema_out=None, user_session=None,
    ):
        """
        ```in
        appname = "" (S)
        all = False (B)
        ```
        """
        count = self.client.count(appname=appname, all=all)
        return count

    @j.baseclasses.actor_method
    def find(
        self,
        appname=None,
        file_path=None,
        level=None,
        data=None,
        context=None,
        cat="",
        message="",
        processid=None,
        time_from=None,
        time_to=None,
        id_from=None,
        include_fslogs=False,
        schema_out=None,
        user_session=None,
    ):
        """
        ```in
        appname = ""(S)
        file_path = "" (S)
        level = 0(I)
        data =  ""(S)
        context = "" (S)
        cat =  ""(S)
        message = ""(S)
        processid = 0 (I)
        time_from = 0 (T)
        time_to = 0 (T)
        id_from = 0 (I)
        include_fslogs = False(B)
        ```
        """
        logs = self.client.find(
            appname=appname,
            id_from=id_from,
            time_from=time_from,
            time_to=time_to,
            cat=cat,
            message=message,
            processid=processid,
            context=context,
            file_path=file_path,
            level=level,
            data=data,
            include_fslogs=include_fslogs,
        )

        return j.data.serializers.json.dumps(logs)

    @j.baseclasses.actor_method
    def list(
        self,
        appname=None,
        id_from=None,
        count=None,
        time_from=None,
        time_to=None,
        include_fslogs=False,
        schema_out=None,
        user_session=None,
    ):
        """
        ```in
        appname = "" (S)
        id_from = (I)
        count = (I)
        time_from = (T)
        time_to = (T)
        include_fslogs = False (B)
        ```
        """
        logs = self.client.list(
            appname=appname,
            id_from=id_from,
            count=count,
            time_from=time_from,
            time_to=time_to,
            include_fslogs=include_fslogs,
        )
        return j.data.serializers.json.dumps(logs)

    @j.baseclasses.actor_method
    def dynamic_list(
        self, appname=None, id_from=None, count=None, include_fslogs=False, schema_out=None, user_session=None,
    ):
        """
        ```in
        appname = "" (S)
        id_from = (I)
        count = (I)
        include_fslogs = False (B)
        ```
        """
        res = {}
        logs = self.client.list(appname=appname, id_from=id_from, count=count, include_fslogs=include_fslogs,)
        res["data"] = logs[0]
        res["pos"] = id_from + count
        res["count"] = self.count(appname=appname, all=include_fslogs)
        return j.data.serializers.json.dumps(res)
