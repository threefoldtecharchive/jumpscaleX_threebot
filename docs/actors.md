# Actors
Actors can be used easily to write APIs.

Example actor:

````python
from Jumpscale import j

class alerta(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        self.alert_model = j.tools.alerthandler.model

    @j.baseclasses.actor_method
    def get_alert(self, alert_id, schema_out=None, user_session=None):
        """
        ```in
        alert_id = (I)
        ```

        """
        res = self.alert_model.find(id=alert_id)
        if res:
            return j.data.serializers.json.dumps(res[0]._ddict)
        return "{}"

    @j.baseclasses.actor_method
    def list_alerts(self, schema_out=None, user_session=None):
        alerts = j.data.serializers.json.dumps({"alerts": [alert._ddict for alert in self.alert_model.find()]})
        return alerts

````

- actors should be decorated with `@j.baseclasses.actor_method` so you can access it directly from threebot shell.

- The actors of your registered packages are exposed on http endpoint `<threebot_name>/<package name>/actors/<actor_name>/<method_name>`.

- If you want to communicate over websocket (unrecommended) use `gedis/websocket`
- http/websocket clients are available [here](https://github.com/threefoldtech/jumpscaleX_weblibs/tree/development/static/gedis) as well

or if you want to use pure http client, here's an example in javascript
```javascript
import axios from 'axios'

export function getPaste(pasteId) {
    return (axios.post("/threefold/pastebin/actors/pastebin/get_paste", { "args": { "paste_id": pasteId } }))
}

export function newPaste(code) {
    return (axios.post("/threefold/pastebin/actors/pastebin/new_paste", { "args": { "code": code } }))
}
```

Or you can use [gedis_package.js](https://github.com/threefoldtech/jumpscaleX_weblibs/tree/development/static/gedis/gedis_package.js), and call actors in the form of:

`packageGedisClient.<threebot_name>.<package_name>.actors.<actor_name>.<method_name>...`

like:

`packageGedisClient.threefold.alerta_ui.actors.alerta.list_alerts()`
