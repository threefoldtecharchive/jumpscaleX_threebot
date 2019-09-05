# MyJobs

Job visualizer for myjobs


## Running 

- cd myjobs package directory
- `kosmos -p run_server.py`


## the package file

- create openresty server on a port
- create a location to server from
- `use_jumpscale_weblibs` to support gedis/extra jsx assets
- add actors

```python3
    def start(self):
        """
        called when the 3bot starts
        :return:
        """
        j.servers.myjobs.workers_tmux_start()

        server = j.servers.openresty.get("test")
        server.install(reset=False)
        server.configure()
        website = server.websites.get("myjobs")
        website.ssl = False
        website.port = 8080
        locations = website.locations.get("myjobs")

        website_location = locations.locations_static.new()
        website_location.name = "myjobs"
        website_location.path_url = ""
        website_location.use_jumpscale_weblibs = True
        fullpath = join(dirname(abspath(__file__)), "html/")
        website_location.path_location = fullpath
        locations.configure()
        website.configure()
        self.gedis_server.actors_add(j.sal.fs.joinPaths(self.package_root, "actors"))
        server.start()

```