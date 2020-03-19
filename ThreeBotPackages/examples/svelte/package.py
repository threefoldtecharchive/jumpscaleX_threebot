from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def start(self):
        self.openresty.configure()

        # get our main webserver
        for port in (443, 80):
            website = self.openresty.get_from_port(port)
            # PROXY for gedis HTTP
            locations = website.locations.get(name=f"svelte_example_locations_{port}")
            bottle_proxy_location = locations.get_location_proxy("svelte_example_proxy")
            bottle_proxy_location.path_url = "/svelte_example"
            bottle_proxy_location.ipaddr_dest = "127.0.0.1"
            bottle_proxy_location.port_dest = 8383
            bottle_proxy_location.path_dest = ""
            bottle_proxy_location.type = "http"
            bottle_proxy_location.scheme = "http"

        from threebot_packages.examples.svelte.bottle.server import app

        self.gevent_rack.bottle_server_add(name="svelte_example", port=8383, app=app, websocket=True)
