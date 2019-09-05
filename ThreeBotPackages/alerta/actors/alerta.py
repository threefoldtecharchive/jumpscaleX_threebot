from Jumpscale import j


class alerta(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):

        from random import choice

        alert_schema = """
        @url = jumpscale.alerta.alert

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

        """

        self.alert_model = j.data.bcdb.system.model_get(schema=alert_schema)
        # self.alert_model.save()
        for i in range(100):
            alert = self.alert_model.new()
            alert.severity = choice(["critical", "major", "minor", "warning"])
            alert.status = choice(["closed", "new"])
            alert.time = j.data.time.epoch
            alert.environment = choice(["production", "staging", "testing"])
            alert.service = choice(["jsx", "0-os", "portal", "threebot"])
            alert.resource = choice(["xmonader", "rafy", "andrew"])
            alert.event = choice(["event 1", "event 2"])
            alert.value = "n/a"
            alert.messageType = choice(["error", "information", "warning"])
            alert.text = choice(["text 1 errr", "text 2 errr", "text 3 err"])

            alert.save()

    def list_alerts(self):
        alerts = j.data.serializers.json.dumps(
            {"alerts": [alert._ddict for alert in self.alert_model.find()]}
        )
        return alerts

    def new_alert(
        self,
        severity="major",
        status="new",
        time=None,
        environment="ALL",
        service="JSX",
        resource="xmonader",
        event="event 1",
        value="n/a",
        messageType="error",
        text="error text",
    ):
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

        return True
