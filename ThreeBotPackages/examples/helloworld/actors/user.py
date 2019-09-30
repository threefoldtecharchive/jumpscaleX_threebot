from Jumpscale import j


class user(j.baseclasses.threebot_actor):
    def _init(self, *args, **kwargs):
        bcdb = j.data.bcdb.get("rafy")
        self.model = bcdb.model_get(url="jumpscale.rafy.user")

    def add(self, username="", schema_out=None, user_session=None):
        """
        ```in
        username = (S)
        ```
        """
        user = self.model.new()
        user.username = username
        user.save()
        response = {"result": True, "error_code": "", "error_message": ""}
        return j.data.serializers.json.dumps(response)
