# Threebot Application Server

Threebot is a pluggable application server based on [openresty](https://openresty.org/en/) and gevent servers and comes with lots of goodies by default

- [Wiki system](./docs/wikis/README.md)
- [Chat](./ThreeBotPackages/zerobot/webinterface/wiki/chatbot/README.md)
- [Multisite blog](./ThreeBotPackages/threebot/blog/wiki/README.md)
- [Alerta](./ThreeBotPackages/zerobot/alerta_ui/wiki/README.md)
- [MyJobs Dashboard](./ThreeBotPackages/zerobot/myjobs_ui/wiki/README.md)
- [Pastebin](./ThreeBotPackages/demo/pastebin/wiki/README.md)
- [Package Manager](./ThreeBotPackages/zerobot/packagemanager/wiki/README.md)
- [Webhooks](./ThreeBotPackages/zerobot/webhooks/wiki/README.md)
- [BCDBFS](https://github.com/threefoldtech/jumpscaleX_core/blob/development/docs/BCDB/README.md)
- [API Server](./ThreeBotPackages/zerobot/webinterface/wiki/README.md)


## Starting the server
Using  `j.servers.threebot.local_start_default()`.

This will give you a ready shell in the same process where you can interact with your threebot:

```
*****************************
*** 3BOTSERVER IS RUNNING ***
*****************************

*** file: /sandbox/lib/jumpscale/Jumpscale/servers/threebot/ThreebotServer.py
*** function: start [linenr:295]

JSX>
```
The server starts with `base`, `webinterface`, `myjobs_ui`, and `packagemanager` packages by default


## What is a package

Package is an extension to ThreebotServer and it is driven using `package.py` file which controls the life cycle of the application, including configurations (prepare) , start, stop .. etc


## Creating a new package

You can create a new package using `package-new` jsx subcommand to scaffold a new package
```
3BOTDEVEL:3bot:tmp: jsx package-new --name hello
3BOTDEVEL:3bot:tmp: tree hello/
hello/
├── actors
│   └── hello.py
├── chatflows
│   └── hello.py
├── models
├── package.py
└── wiki

```

## Registering package (using package manager)
After starting the server with the recommended way, the package created can be added using the package manager (It's implemented as a package too and loaded by default):

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
- **Models directory** registers the model on the package loading. There is no need to manually add the models
- **Actors directory** is registered automatically when loading the package. There is no need to manually add actors, they can be accessed via http at `3BOT_URL/<threefold_name>/<package_name>/actors/<actor_name>/<actor_method>`.
- **Wiki directory** is loaded automatically and can be accessed via `3BOT_URL/<threefold_name>/<package_name>/wiki`.
- **Chatflows directory** is loaded automatically, can be access via `3BOT_URL/<threefold_name>/<package_name>/chat`.

- **package.py**  is where the  package logic is defined.

    For packages that need their own bcdb, you need to override bcdb property like this

    ```python
    class Package(j.baseclasses.threebot_package):
        @property
        def bcdb(self):
            return self.threebot_server.bcdb_get("your_name")

        ...
    ```
- **package.toml**  is where the package information is defined, such as bcdb's and actors' namespaces.


## Example package.toml


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

## Example package.py


Packages does the lifecycle management of your application

typical `package.py` should look like 

```python
from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    pass

```

In case you wanted to do more, creating proxies, special locations .. etc it may look like the following

```python
from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def setup_locations(self):
        """
        ports & paths used for threebotserver
        see: {DIR_BASE}/code/github/threefoldtech/jumpscaleX_core/docs/3Bot/web_environment.md
        will start bottle server web interface which include (gedis http interface, gedis websocket interface and
        bcdbfs web server)
        endpoints:
        "/web/gedis/http"       >    gedis htto interface
        "/web/gedis/websocket"  >    gedis websocket interface
        "/web/bcdbfs"           >    bcdbfs web server
        "/weblibs"              >    static jumpscale weblibs files
        """

        self.openresty.configure()

        # get our main webserver
        for port in (443, 80):
            website = self.openresty.get_from_port(port)

            # PROXY for gedis HTTP
            locations = website.locations.get(name="webinterface_locations")

            package_actors_location = locations.locations_proxy.new()
            package_actors_location.name = "package"
            package_actors_location.path_url = "~* /(.*)/(.*)/actors/(.*)/(.*)$"
            package_actors_location.ipaddr_dest = "127.0.0.1"
            package_actors_location.port_dest = 9999
            package_actors_location.path_dest = ""
            package_actors_location.type = "http"
            package_actors_location.scheme = "http"

            ## more code omitted.


            website.configure()

    def start(self):

        # add the main webapplication

        self.setup_locations()

        from threebot_packages.zerobot.webinterface.bottle.gedis import app

        self.gevent_rack.bottle_server_add(name="bottle_web_interface", port=9999, app=app, websocket=True)
        # self.gevent_rack.webapp_root = webapp

```



## APIs (actors)

```python
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

```
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

# Locations
As you already figured out we use `openresty` for running applications and proxying requests based on their locations. There're multiple types:

Auto-created locations are registered under `<threebot_name>/<package_name>`.

### Static:
Used to serve static assets directly (should use that for your css, js, images).

The following example creates a `/static` location to serve some static files with [weblibs](https://github.com/threefoldtech/jumpscaleX_weblibs).

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

The following examples creates a proxy on `/calendar` which will redirect requests to `0.0.0.0:8851/`, make sure of `ipaddr_dest`, `port_dest`, `path_dest` and `schema` as these are very important for the proxy to work properly.

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
- If package has a `frontend` directory, SPA location will be created with the name of the package as `<threebot_name>/<package_name>`.

- If package has a `html` directory, Static location will be created with the name of the package as `<threebot_name>/<package_name>`.


# Webinterface package

[Webinterface](https://github.com/threefoldtech/jumpscaleX_threebot/blob/c58b3db99095a8a9635c75ac7f82647947a9d110/ThreeBotPackages/threebot/webinterface) package is always registered when starting your threebot. It is responsible for
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
