from Jumpscale import j
from os.path import dirname, abspath, join


class Package(j.baseclasses.threebot_package):
    def _init(self, **kwargs):
        if "branch" in kwargs.keys():
            self.branch = kwargs["branch"]
        else:
            self.branch = "*"

    def prepare(self):
        """
        is called at install time
        :return:
        """
        pass

    def start(self):
        """
        called when the 3bot starts
        :return:
        """
        self.gedis_server.actors_add(j.sal.fs.joinPaths(self.package_root, "actors"))

        server = self.openresty
        server.install(reset=False)
        server.configure()

        website = server.get_from_port(443)

        locations = website.locations.get("alerta_locations")

        website_location = locations.locations_spa.new()
        website_location.name = "alerta"
        website_location.path_url = "/"
        website_location.use_jumpscale_weblibs = False
        fullpath = j.sal.fs.joinPaths(self.package_root, "html/")
        website_location.path_location = fullpath

        # if you start with a different port please enable gedis http part down.
        ## IF U WANT PER APP (specific endpoints or relative urls u can proxy the calls on ur website to :8903)
        # PROXY for gedis HTTP
        # proxy_location = website.locations.get().locations_proxy.new()
        # proxy_location.name = "gedishttp"
        # proxy_location.path_url = "/api/actors/"
        # proxy_location.ipaddr_dest = "127.0.0.1"
        # proxy_location.port_dest = 8903
        # proxy_location.path_dest = "/"
        # proxy_location.type = "http"
        # proxy_location.scheme = "http"

        locations.configure()
        website.configure()
