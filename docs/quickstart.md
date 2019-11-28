# threebot application

![workflow](./images/workflow.png)

application is driven using `package.py` file which controls the life cycle of the application, configurations (prepare) , start, stop .. etc

## Starting threebot with registered packages
- the recommended way is `j.servers.threebot.local_start_default()`.

- to simplify the development workflow you can start packages directly using their factories, for example:
    * `kosmos -p "j.threebot.package.alerta.start()"`

This will give you a ready shell in the same process where you can interact with your threebot:

```
*****************************
*** 3BOTSERVER IS RUNNING ***
*****************************

*** file: /sandbox/lib/jumpscale/Jumpscale/servers/threebot/ThreebotServer.py
*** function: start [linenr:295]

JSX>
```

## Registering package (using package manager)
After starting the server with recommended way is to use package manager (it's implemented as a package too and loaded by default):

Directly from threebot shell:

```
j.threebot.actors.zerobot.package_manager.package_add(path='/sandbox/code/github/threefoldtech/jumpscaleX_threebot/ThreeBotPackages/alerta')

```

Or through a client from another process:

```
kosmos -p
JSX> cl = j.clients.gedis.get(name="zerobot_client", port=8901, namespace="zerobot")
JSX> cl.actors.package_manager.package_add(path='/sandbox/code/github/threefoldtech/jumpscaleX_threebot/ThreeBotPackages/alerta')
```

## Package structure
- models directory registers the model on the package loading. no need to manually add the models
- actors directory is registered automatically when loading the package no need to manually add actors, can be accessed via http at `3BOT_URL/<threefold_name>/<package_name>/actors/<actor_name>/<actor_method>`.
- wiki directory is loaded automatically and can be accessed via, can be accessd via `3BOT_URL/<threefold_name>/<package_name>/wiki`.
- chatflows directory is loaded automatically, can be access via `3BOT_URL/<threefold_name>/<package_name>/chat`.

- package.py  where you define your package logic
- package.toml  define package information, bcdb and actors namespaces...

`package.toml` example:

```toml
[source]
name = "alerta_ui"
description = "alerting system for jumpscale"
threebot = "threefold"
version = "1.0.0"

[actor]
namespace = "zerobot"

[[bcdbs]]
namespace = "alerta"
type = "redis"
instance = "default"
```


- PACKAGE_NAME_Factory (optional) the entry point for your package so it can be referenced within jumpscaleX ecosystem

- for packages that need their own bcdb, you need to override bcdb property like this

```python
class Package(j.baseclasses.threebot_package):
    @property
    def bcdb(self):
        return self.threebot_server.bcdb_get("your_name")

    ...
```


## Example factory

```python
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

```python
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
- the actors of your registered packages are exposed on http endpoint `<threebot_name>/<package name>/actors/<actor_name>/<method_name>`.

- if you want to communicate over websocket (unrecommended) use `gedis/websocket`
- http/websocket clients available [here](https://github.com/threefoldtech/jumpscaleX_weblibs/tree/development/static/gedis) as well

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

# Locations
As you already figured out we use `openresty` for running applications and proxying requests based on their locations. There're multiple types

Auto-created locations are registered under `<threebot_name>/<package_name>`.

### Static:
Used to serve static assets directly (should use that for your css, js, images).

The following example creates a `/static` location to server some static files with [weblibs](https://github.com/threefoldtech/jumpscaleX_weblibs).

```python
class Package(j.baseclasses.threebot_package):

    def start():
        website = self.openresty.get_from_port(443)
        locations = website.locations.get("<my locations name>")

        static_location = locations.locations_static.new()
        static_location.name = "<location name>"
        static_location.path_url = "/static"
        static_location.path_location = "<static files location>
        static_location.use_jumpscale_weblibs = True # if set, will copy weblibs and serve it from /static/weblibs directly

        locations.configure()
        website.configure()
```

### Proxy
To `proxy` to requests on certain location to a running server.

The following examples creates a proxy on `/calendar` which will redirect requests to `0.0.0.0:8851/`, note `ipaddr_dest`, `port_dest`, `path_dest` and `schema` as these are very important for the proxy to work properly.

```python
class Package(j.baseclasses.threebot_package):

    def start():
        wsgi_app = ...  # get for example Bottle.app()
        rack = self.threebot_server.rack_server

        rack.bottle_server_add(name="calendar", port=8851, app=wsgi_app)
        website = self.openresty.get_from_port(443)

        locations = website.locations.get("calendar")
        proxy_location = locations.locations_proxy.new()
        proxy_location.name = "calendar"
        proxy_location.path_url = "/calendar/"
        proxy_location.ipaddr_dest = "0.0.0.0"
        proxy_location.port_dest = 8851
        proxy_location.path_dest = "/"
        proxy_location.scheme = "http"

        locations.configure()
        website.configure()
```

### Single page apps (SPA)
A special location to serve SPA (e.g. sapper exported) directories mainly.

The following example create an SPA location that serves the build directory of `html`.

```python
class Package(j.baseclasses.threebot_package):

    def start(self):
        server = self.openresty
        website = server.get_from_port(443)
        locations = website.locations.get("myjobs_locations")

        website_location = locations.locations_spa.new()
        website_location.name = "myjobs"
        website_location.path_url = "/myjobs"
        website_location.use_jumpscale_weblibs = False
        fullpath = j.sal.fs.joinPaths(self.package_root, "html/")
        website_location.path_location = fullpath

        locations.configure()
        website.configure()
```


### Custom
You can add there whatever configurations you want.

```python
class Package(j.baseclasses.threebot_package):

    def start(self):
        server = self.openresty
        website = server.get_from_port(443)
        locations = website.locations.get("<locations name>")

        website_location = locations.locations_cusotm.new()
        website_location.name = "<location name>"
        website_location.config = """
        location /mypath {
            index index.html
            alias /path/to/files
        }
        """

        locations.configure()
        website.configure()
```

#### Example for custom location

```python
            custom_location = locations.locations_custom.new()
            custom_location.name = "custom"
            custom_location.config = """rewrite ^/(.*)/path$ /path/$1;"""

```

# Conventions for Webapps
- If package has `frontend` directory, SPA location will be created with the name of the package as `<threebot_name>/<package_name>`.

- If package has `html` directory, Static location will be created with the name of the package as `<threebot_name>/<package_name>`.


# Webinterface package

[Webinterface](https://github.com/threefoldtech/jumpscaleX_threebot/blob/c58b3db99095a8a9635c75ac7f82647947a9d110/ThreeBotPackages/threebot/webinterface) package is always registered when starting your threebot responsible for
- exposing http endpoints for actors
- exposing websocket endpoints for actors
- exposing bcdbfs endpoints


# Complete examples

- Myjobs

  - [backend](https://github.com/threefoldtech/jumpscaleX_threebot/blob/development/ThreeBotPackages/myjobs/README.md)
  - [frontend](https://github.com/threefoldtech/jumpscaleX_threebot/blob/development/ThreeBotPackages/myjobs/JobsVisualSvelte/README.md)

- Alerta - [backend](https://github.com/threefoldtech/jumpscaleX_threebot/blob/development/ThreeBotPackages/alerta/README.md) - [frontend](https://github.com/threefoldtech/jumpscaleX_threebot/blob/development/ThreeBotPackages/alerta/alerta/README.md)
- Pastebin
  - [backend](https://github.com/threefoldtech/jumpscaleX_threebot/blob/development/ThreeBotPackages/pastebin/README.md)
  - [frontend](https://github.com/threefoldtech/jumpscaleX_threebot/blob/development/ThreeBotPackages/pastebin/pastebin/README.md)

- VueJS

  - [backend](https://github.com/threefoldtech/jumpscaleX_threebot/blob/development/ThreeBotPackages/examples/vuejs/README.md)
  - [frontend](https://github.com/threefoldtech/jumpscaleX_threebot/blob/development/ThreeBotPackages/examples/vuejs/newproject/README.md)
