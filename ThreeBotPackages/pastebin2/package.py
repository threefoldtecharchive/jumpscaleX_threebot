from Jumpscale import j
from os.path import dirname, abspath, join


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

        # website_location = locations.locations_static.new()
        # website_location.name = "pastebin"
        # website_location.path_url = "/"
        # website_location.use_jumpscale_weblibs = True
        # fullpath = j.sal.fs.joinPaths(self.package_root, "pastebin", "__sapper__", "export")
        # website_location.path_location = fullpath

        proxy_location = locations.locations_proxy.new()
        proxy_location.name = "pastebin"
        proxy_location.path_url = f"/"

        proxy_location.ipaddr_dest = "0.0.0.0"
        proxy_location.port_dest = 3000
        proxy_location.scheme = "http"

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
