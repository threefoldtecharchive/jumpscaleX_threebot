from Jumpscale import j


class alerta(j.baseclasses.threebot_actor):
    def with_formatted_traceback(self, alert):
        """return a dict with formatted traceback for any given alert

        :param alert: alert object
        :type alert: jumpscale.alerts.alert
        :return: dict with alert info
        :rtype: dict
        """
        alert_dict = alert._ddict
        if not alert.tracebacks:
            return alert_dict

        # re-populate tracebacks with formatted lines
        tbs = []
        for tb in alert.tracebacks:
            if not tb.items:
                continue

            tb_dict = {}
            tb_dict["process_id"] = tb.process_id
            tb_dict["threebot_name"] = tb.threebot_name
            tb_dict["formatted"] = j.tools.alerthandler.format_traceback(tb)
            tbs.append(tb_dict)

        alert_dict["tracebacks"] = tbs
        return alert_dict

    @j.baseclasses.actor_method
    def get_alert(self, identifier, schema_out=None, user_session=None):
        """
        ```in
        identifier = (S)
        ```
        """
        res = j.tools.alerthandler.get(identifier)
        if res:
            alert_dict = self.with_formatted_traceback(res)
            return j.data.serializers.json.dumps(alert_dict)
        return "{}"

    def _get_hr_json_from_list(self, method, *args, **kwargs):
        """get a human readable json from alerts list

        :param method: method to get alerts by
        :type method: function
        :return: json formatted strings of alerts: <alerts list>
        :rtype: str
        """
        alerts = []
        for _, alert in method(*args, **kwargs):
            alerts.append(self.with_formatted_traceback(alert))
        return j.data.serializers.json.dumps({"alerts": alerts})

    @j.baseclasses.actor_method
    def list_alerts(self, schema_out=None, user_session=None):
        return self._get_hr_json_from_list(j.tools.alerthandler.list)

    @j.baseclasses.actor_method
    def list_alerts_by_category(self, cat="", schema_out=None, user_session=None):
        """
        ```in
        cat = "" (S)
        ```
        """
        if not cat.strip():
            return self.list_alerts()
        return self._get_hr_json_from_list(j.tools.alerthandler.find, cat=cat)

    @j.baseclasses.actor_method
    def delete_alert(self, identifier, schema_out=None, user_session=None):
        """
        ```in
        identifier = (S)
        ```
        """
        alert_obj = j.tools.alerthandler.get(identifier)
        j.tools.alerthandler.delete(alert_obj)

    @j.baseclasses.actor_method
    def delete_alerts(self, identifiers, schema_out=None, user_session=None):
        """
        ```in
        identifiers = (LS)
        ```
        """
        for identifier in identifiers:
            alert_obj = j.tools.alerthandler.get(identifier)
            j.tools.alerthandler.delete(alert_obj)

    @j.baseclasses.actor_method
    def delete_all_alerts(self, schema_out=None, user_session=None):
        j.tools.alerthandler.delete_all()

    @j.baseclasses.actor_method
    def new_alert(
        self,
        alert_type="event_operator",
        level=20,
        message="",
        message_pub="",
        cat="",
        schema_out=None,
        user_session=None,
    ):
        """
        ```in
        alert_type = "bug,question,event_system,event_monitor,event_operator" (E)
        level = 20 (I)
        message = ""
        message_pub = ""                  #optional public message
        cat = ""                          #a freely chosen category can be in dot notation e.g. performance.cpu.high
        ```

        ```out
        res = (B)
        ```
        """
        j.tools.alerthandler.alert_raise(message, message_pub, cat, level, alert_type)

        res = schema_out.new()
        res.res = True
        return res
