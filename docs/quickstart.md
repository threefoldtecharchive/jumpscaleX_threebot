# threebot application

![workflow](./images/workflow.png)

application is driven using `package.py` file which controls the life cycle of the application, configurations (prepare) , start, stop .. etc

## Registering package (using package manager)
NOT WORKING YET

## Starting threebot with registered packages 
- the recommended way is `j.servers.threebot.local_default_start()`
- to simplify the development workflow you can start packages directly using their factories

## Package structure
- models directory registers the model on the package loading. no need to manually add the models
- actors directory is registered automatically when loading the package no need to manually add actors

- package.py  where you define your package logic
- PACKAGE_NAME_Factory the entry point for your package so it can be referenced within jumpscaleX ecosystem

## Example factory
```
from Jumpscale import j


class PastebinFactory(j.baseclasses.threebot_factory):

    __jslocation__ = "j.threebot.package.pastebin2"
```

## Example package.py


Packages does the lifecycle management of your application

```python
from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def start(self):
        """
        called when the 3bot starts
        :return:
        """
        server = self.openresty
        server.install(reset=False)
        server.configure()

        website = server.get_from_port(443)

        locations = website.locations.get("pastebin_locations")

        website_location = locations.locations_spa.new()
        website_location.name = "pastebin"
        website_location.path_url = "/"
        website_location.use_jumpscale_weblibs = False
        fullpath = j.sal.fs.joinPaths(self.package_root, "html/")
        website_location.path_location = fullpath

        locations.configure()
        website.configure()


```

## APIs (actors)

```
from Jumpscale import j


class pastebin(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):

        from random import choice

        paste_schema = """
        @url = jumpscale.pastebin.paste
        code = "" (S)
        """

        self.paste_model = j.data.bcdb.system.model_get(schema=paste_schema)
        for i in range(10):
            paste = self.paste_model.new()
            paste.code = """print("hello")"""

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
- the actors of your registered packagesare exposed on http endpoint `/api/actors` more [here](https://github.com/threefoldtech/jumpscaleX_core/blob/be2496d7ca03ad1cbf43caa2b9ec132ae471598a/JumpscaleCore/servers/gedis_http)

- if you want to communicate over websocket (unrecommended) use `/api/actors_websocket
- http/websocket clients available [here](https://github.com/threefoldtech/jumpscaleX_weblibs/tree/master/static/gedis) as well

or if you want to use pure http client, here's an example in javascript
```javascript
import axios from 'axios'

export function getPaste(pasteId) {
    return (axios.post("/api/actors/pastebin/get_paste", { "args": { "paste_id": pasteId } }))
}

export function newPaste(code) {
    return (axios.post("/api/actors/pastebin/new_paste", { "args": { "code": code } }))
}
```

# Locations
As you already figured out we use `openresty` for running applications and proxying requests based on their locations. There're multiple types

1- location_static: used to serve static assets directly (should use that for your css, js, images)
2- location_proxy: to `proxy` to requests on certain location to a running server
3- location_spa: special location to serve SPA (sapper exported) directories mainly
4- location_custom: you can add there whatever configurations you want.



# Complete examples

- Myjobs

  - [backend](https://github.com/threefoldtech/jumpscaleX_threebot/blob/development/ThreeBotPackages/myjobs/README.md)
  - [frontend](https://github.com/threefoldtech/jumpscaleX_threebot/blob/development/ThreeBotPackages/myjobs/JobsVisualSvelte/README.md)

- Alerta - [backend](https://github.com/threefoldtech/jumpscaleX_threebot/blob/development/ThreeBotPackages/alerta/README.md) - [frontend](https://github.com/threefoldtech/jumpscaleX_threebot/blob/development/ThreeBotPackages/alerta/alerta/README.md)
- Pastebin
  - [backend](https://github.com/threefoldtech/jumpscaleX_threebot/blob/development/ThreeBotPackages/pastebin/README.md)
  - [frontend](https://github.com/threefoldtech/jumpscaleX_threebot/blob/development/ThreeBotPackages/pastebin/pastebin/README.md)
