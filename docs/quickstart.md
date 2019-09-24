# threebot application

![workflow](./images/workflow.png)

application is driven using `package.py` file which controls the life cycle of the application, configurations (prepare) , start, stop .. etc

## example package.

```python
from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def start(self):
        """
        called when the 3bot starts
        :return:
        """
        self.gedis_server.actors_add(j.sal.fs.joinPaths(self.package_root, "actors"))

        server = self.openresty
        server.install(reset=False)
        server.configure()
        website = server.websites.get("pastebin")
        website.ssl = False
        website.port = 8082
        locations = website.locations.get("pastebin")

        website_location = locations.locations_static.new()
        website_location.name = "pastebin"
        website_location.path_url = "/"
        website_location.use_jumpscale_weblibs = True
        fullpath = j.sal.fs.joinPaths(self.package_root, "html/")
        website_location.path_location = fullpath

        ## START BOTTLE ACTORS ENDPOINT

        rack = j.servers.rack.get()
        # get gedis http server
        app = j.servers.gedishttp.get_app()

        # add gedis http server to the rack
        rack.bottle_server_add(name="gedishttp", port=9201, app=app)

        # create location `/actors` to on your website `8084` to forward
        # requests to `9201` where the bottle server is running
        proxy_location = locations.locations_proxy.new()
        proxy_location.name = "gedishttp"
        proxy_location.path_url = "/actors"
        proxy_location.ipaddr_dest = "0.0.0.0"
        proxy_location.port_dest = 9201
        proxy_location.scheme = "http"
        ## END BOTTLE ACTORS ENDPOINT

        locations.configure()
        website.configure()



```

## Factory

abstraction over the package and gets registerd in jumpscale god object using `__jslocation__`


### Example factory
```
from Jumpscale import j


class PastebinDashboardFactory(j.baseclasses.object, j.baseclasses.testtools):

    __jslocation__ = "j.threebot.package.pastebin"

    def install(self):
        server = j.servers.threebot.default
        server.save()

        package = j.tools.threebot_packages.get("pastebin", path=self._dirpath, threebot_server_name=server.name)
        package.prepare()
        package.save()
        self._log_info("pastebin loaded")

        return "OK"

    def start(self):
        self.install()
        server = j.servers.threebot.default
        server.start(web=True, ssl=False)

    def test(self, name=""):
        pass

```




## Backend
APIs are driven using actors 

### example actor

```python

from Jumpscale import j


class pastebin(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):

        self.paste_model = ... # CODE to get the model.

    def get_paste(self, paste_id, schema_out=None, user_session=None):
        paste = j.data.serializers.json.dumps(self.paste_model.get(paste_id)._ddict)
        return paste

    def new_paste(self, code, schema_out=None, user_session=None):
        paste = self.paste_model.new()
        paste.code = code
        paste.save()
        res = j.data.serializers.json.dumps(paste._ddict)
        return res

```

#### Exposing APIs

We need to reach our actors APIs from the frontend using axios or our library of choice

```python
        ## START BOTTLE ACTORS ENDPOINT

        rack = j.servers.rack.get()
        # get gedis http server
        app = j.servers.gedishttp.get_app()

        # add gedis http server to the rack
        rack.bottle_server_add(name="gedishttp", port=9201, app=app)

        # create location `/actors` to on your website `8084` to forward
        # requests to `9201` where the bottle server is running
        proxy_location = locations.locations_proxy.new()
        proxy_location.name = "gedishttp"
        proxy_location.path_url = "/actors"
        proxy_location.ipaddr_dest = "0.0.0.0"
        proxy_location.port_dest = 9201
        proxy_location.scheme = "http"
        ## END BOTTLE ACTORS ENDPOINT
```
convention is to use `/actors` endpoint on the server for API calls 


## Frontend
Driven using any modern web tech or even static files (totally up to the developers)

### communicating with backend APIs

Using axios or your http library of choice communicate with API endpoints


```javascript
import axios from 'axios'

export function getPaste(pasteId) {
    return (axios.post("/actors/pastebin/get_paste", { "args": { "paste_id": pasteId } }))
}

export function newPaste(code) {
    return (axios.post("/actors/pastebin/new_paste", { "args": { "code": code } }))
}
```


# Complete examples

- Myjobs
    - [backend](https://github.com/threefoldtech/jumpscaleX_threebot/blob/development/ThreeBotPackages/myjobs/README.md)
    - [frontend](https://github.com/threefoldtech/jumpscaleX_threebot/blob/development/ThreeBotPackages/myjobs/JobsVisualSvelte/README.md)

- Alerta
    - [backend](https://github.com/threefoldtech/jumpscaleX_threebot/blob/development/ThreeBotPackages/alerta/README.md)
    - [frontend](
https://github.com/threefoldtech/jumpscaleX_threebot/blob/development/ThreeBotPackages/alerta/alerta/README.md)
- Pastebin
    - [backend](https://github.com/threefoldtech/jumpscaleX_threebot/blob/development/ThreeBotPackages/pastebin/README.md)
    - [frontend](https://github.com/threefoldtech/jumpscaleX_threebot/blob/development/ThreeBotPackages/pastebin/pastebin/README.md)



