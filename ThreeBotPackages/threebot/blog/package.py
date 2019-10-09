from Jumpscale import j

__version__ = "0.0.1"

XMON_BLOG = "git@gitlab.com:xmonader/sample-blog-jsx.git"


class Package(j.baseclasses.threebot_package):
    def _init(self, **kwargs):
        self.branch = kwargs["package"].branch or "master"
        self.blog_dest = ""

    def prepare(self):
        """
        is called at install time
        :return:
        """
        self.blog_name = "xmon"
        self.blog_dest = dest = j.clients.git.pullGitRepo(XMON_BLOG)

        post_model = self.bcdb.model_get(url="jumpscale.blog.post")
        blog_model = self.bcdb.model_get(url="jumpscale.blog")

        # dirs = j.sal.fs.listDirsInDir(dest)
        files = j.sal.fs.listFilesInDir(dest)
        metafiles = [f for f in files if j.sal.fs.getBaseName(f) == "metadata.yml"]
        if metafiles:
            metafile = metafiles[0]
        else:
            raise j.exceptions.RuntimeError("no metadata.yml file found in the repo.")
        meta = j.data.serializers.yaml.load(metafile)

        found = blog_model.find(name=self.blog_name)
        if not found:
            blog = blog_model.new()
            blog.name = self.blog_name
        else:
            blog = found[0]

        # population
        blogobj = j.tools.blog_loader
        blogobj.blog = blog
        blogobj.meta = meta
        blogobj.dest = dest
        blogobj.post_model = post_model
        blogobj.blog_name = self.blog_name
        blogobj.repo_url = XMON_BLOG
        blogobj.create_blog()
        blogobj.create_posts()
        blogobj.create_pages()

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

        website_location = locations.locations_static.new()
        website_location.name = "blogs"
        website_location.name = f"blog_xmon_assets"
        website_location.path_url = f"/blog_xmon/assets"

        fullpath = j.sal.fs.joinPaths(self.blog_dest, "assets")
        website_location.path_location = fullpath

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
