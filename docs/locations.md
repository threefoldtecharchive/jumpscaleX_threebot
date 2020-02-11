# Locations
As you already figured out we use `openresty` for running applications and proxying requests based on their locations:

Inside a package, you can define one of the following location types:

- [Static](#static)
- [Proxy](#proxy)
- [Single Page Apps](#single-page-apps-(spa))
- [Custom](#custom)

All `openresty/nginx` configuration files will be generated from this locations, also, there's [a convention for some directories](#conventions-for-web-app-directories) inside a package (if found), also auto-created locations are registered under `<threebot_name>/<package_name>`.

## Static:
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

## Proxy
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

## Single page apps (SPA)
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


## Custom
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

## Conventions for web app directories
- If package has a `frontend` directory, SPA location will be created with the name of the package as `<threebot_name>/<package_name>`.

- If package has a `html` directory, Static location will be created with the name of the package as `<threebot_name>/<package_name>`.
