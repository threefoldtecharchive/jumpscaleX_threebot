from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    # CHANGE ME WITH YOUR BLOG DATA
    blog_name = "VonSub"
    repo_url = "https://github.com/VonSub/blog"

    def add_blog(self):

        self.dest = j.clients.git.pullGitRepo(self.repo_url)

        post_model = self.bcdb.model_get(url="jumpscale.blog.post")
        blog_model = self.bcdb.model_get(url="jumpscale.blog")

        # dirs = j.sal.fs.listDirsInDir(dest)
        files = j.sal.fs.listFilesInDir(self.dest)
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
        blogobj.dest = self.dest
        blogobj.post_model = post_model
        blogobj.blog_name = self.blog_name
        blogobj.repo_url = self.repo_url
        blogobj.create_blog()
        blogobj.create_posts()
        blogobj.create_pages()
        self._log_info(f"blog {self.blog_name} loaded")

    def prepare(self):
        # set locations
        self.add_blog()
        server = self.openresty
        server.install(reset=False)
        server.configure()
        website = server.get_from_port(443)

        locations = website.locations.get("blogs_locations")

        website_location = locations.locations_static.new()
        website_location.name = "blogs"
        website_location.name = f"blog_{self.blog_name}_assets"
        website_location.path_url = f"/blog_{self.blog_name}/assets"

        fullpath = j.sal.fs.joinPaths(self.dest, "assets")
        website_location.path_location = fullpath

        locations.configure()
        website.configure()
        server.reload()

    def start(self):
        self.prepare()
