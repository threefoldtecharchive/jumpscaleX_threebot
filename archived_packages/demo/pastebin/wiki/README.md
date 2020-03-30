# Pastebin

code sharing system built using svelte and gedis actors

![pastebin1](images/pastebin1.jpg)
![pastebin2](images/pastebin2.jpg)


## Running

- execute `kosmos -p 'j.threebot.package.pastebin.start()'`
- server will start at `172.17.0.2/pastebin`

## the package file

```python3

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

        for port in (443, 80):
            website = server.get_from_port(port)

            locations = website.locations.get("pastebin_locations")

            website_location = locations.locations_spa.new()
            website_location.name = "pastebin"
            website_location.path_url = "/pastebin"
            website_location.use_jumpscale_weblibs = False
            fullpath = j.sal.fs.joinPaths(self.package_root, "html/")
            website_location.path_location = fullpath

            locations.configure()
            website.configure()

```


## actors

- `new_paste` : new_paste
- `get_paste`: get paste

```python3
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

    def get_paste(self, paste_id):
        paste = j.data.serializers.json.dumps(self.paste_model.get(paste_id)._ddict)
        return paste

    def new_paste(self, code):
        paste = self.paste_model.new()
        paste.code = code
        paste.save()
        res = j.data.serializers.json.dumps(paste._ddict)
        return res
```

## PastebinFactory


```
from Jumpscale import j


class PastebinDashboardFactory(j.baseclasses.object, j.baseclasses.testtools):

    __jslocation__ = "j.threebot_factories.package.pastebin"

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
