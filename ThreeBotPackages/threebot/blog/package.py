from Jumpscale import j

__version__ = "0.0.1"


class Package(j.baseclasses.threebot_package):
    def _init(self, **kwargs):
        self.branch = kwargs["package"].branch or "master"

    def start(self):
        """
        called when the 3bot starts
        :return:
        """
        j.builders.runtimes.nodejs.install()

        server = self.openresty
        server.install(reset=False)
        server.configure()

        website = server.get_from_port(443)

        locations = website.locations.get("blogs_locations")

        ## START BOTTLE ACTORS ENDPOINT
        rack = j.servers.rack.get()
        app = j.servers.gedishttp.get_app()
        rack.bottle_server_add(name="gedishttp", port=9201, app=app)

        proxy_location = locations.locations_proxy.new()
        proxy_location.name = "gedishttp"
        proxy_location.path_url = "/actors"
        proxy_location.ipaddr_dest = "0.0.0.0"
        proxy_location.port_dest = 8903
        proxy_location.scheme = "http"
        ## END BOTTLE ACTORS ENDPOINT

        proxy_location = locations.locations_proxy.new()
        proxy_location.name = "nodeapp"
        proxy_location.path_url = f"/blog"
        proxy_location.path_dest = f"/blog"

        proxy_location.ipaddr_dest = "0.0.0.0"
        proxy_location.port_dest = 3000
        proxy_location.scheme = "http"

        locations.configure()
        website.configure()
        self._start_blog_app()
        j.tools.blog_loader.launch_blog("xmon", "git@gitlab.com:xmonader/sample-blog-jsx.git")

    def _start_blog_app(self, reset=True):

        s = j.servers.startupcmd.get("blogs")
        s.cmd_start = f"""
        cd {self._dirpath}/sapper-blog
        export DEV=0
        npm run build
        node __sapper__/build
        """
        s.executor = "tmux"
        s.interpreter = "bash"
        s.timeout = 10
        s.ports = [3000]

        s.start(reset=reset)


"""cl = j.servers.threebot.local_start_default(web=True); cl.actors.package_manager.package_add(path="/sandbox/code/github/threefoldtech/jumpscaleX_threebot/ThreeBotPackages/threebot/blog")"""
