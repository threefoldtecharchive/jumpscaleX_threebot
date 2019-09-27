from Jumpscale import j


"""

JSX> anew.actors.alerta.list_alerts()
... a very long list
JSX> anew.actors.alerta.new_alert(        severity="major",
   2         status="new",
   3         time=None,
   4         environment="ALL",
   5         service="JSX",
   6         resource="xmonader",
   7         event="event 1",
   8         value="n/a",
   9         messageType="error",
  10         text="rafir text")
## actors.default.alerta.new_alert.16c54214bfcd2a5b61f789be085a1d14
res                 : True



"""

STATES = ["closed", "new", "open"]
MESSAGE_TYPES = ["error", "info", "warn"]


class alerta(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        self.alert_model = j.tools.alerthandler.model

    def list_alerts(self, schema_out=None, user_session=None):
        alerts = j.data.serializers.json.dumps({"alerts": [alert._ddict for alert in self.alert_model.find()]})
        return alerts

    def list_alerts_by_env(self, env_name="all", schema_out=None, user_session=None):
        """
        ```in
        env_name = (S)
        ```

        """

        if env_name.lower() == "all":
            alerts = self.alert_model.find()
        else:
            alerts = self.alert_model.find(environment=env_name)

        def map_enums(a):
            a["status"] = STATES[a["status"]]
            a["messageType"] = MESSAGE_TYPES[a["messageType"]]
            return a

        alerts = {"alerts": [map_enums(alert._ddict) for alert in alerts]}

        print("ALERTS: ", alerts)
        response = {"result": alerts, "error_code": "", "error_message": ""}
        return j.data.serializers.json.dumps(response)

    def new_alert(
        self,
        severity="major",
        status="new",
        time=None,
        environment="all",
        service="JSX",
        resource="xmonader",
        event="event 1",
        value="n/a",
        messageType="error",
        text="error text",
        schema_out=None,
        user_session=None,
    ):
        """
        ```in
        severity="" (S)
        status="" (S)
        time="" (S)
        environment = "" (S)
        service = "" (S)
        resource = "" (S)
        event = "" (S)
        value = "" (S)
        messageType = "" (S)
        text = "" (S)
        ```

        ```out
        res = (B)
        ```

        """

        print(locals())
        alert = self.alert_model.new()
        alert.severity = severity
        alert.status = status
        alert.time = time or j.data.time.epoch
        alert.environment = environment
        alert.service = service
        alert.resource = resource
        alert.event = event
        alert.value = value
        alert.messageType = messageType
        alert.text = text

        alert.save()

        res = schema_out.new()
        res.res = True
        return res

    def delete_all_alerts(self, schema_out=None, user_session=None):
        # TODO: implement
        response = {"result": True, "error_code": "", "error_message": ""}
        return j.data.serializers.json.dumps(response)

    def delete_alert(self, alert_id, schema_out=None, user_session=None):
        """
        ```in
        alert_id = (I)
        ```
        """
        try:
            self.alert_model.delete(alert_id)
        except:
            pass

        response = {"result": True, "error_code": "", "error_message": ""}
        return j.data.serializers.json.dumps(response)
