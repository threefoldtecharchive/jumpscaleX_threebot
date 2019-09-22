from Jumpscale import j
from os.path import dirname, abspath, join, splitext


import re
import unicodedata

__version__ = "0.0.1"


# TODO: improve and move to jsx
def remove_date(filename):
    return re.sub("(\d+\-)+", "", filename)


# TODO: improve and move to jsx
def slugify(string):

    """
    Slugify a unicode string.
    Example:
        >>> slugify(u"Héllø Wörld")
        u"hello-world"
    """
    string = remove_date(string)
    return re.sub(
        r"[-\s]+",
        "-",
        re.sub(r"[^\w\s-]", "", unicodedata.normalize("NFKD", string).encode("ascii", "ignore").decode())
        .strip()
        .lower(),
    )


class Package(j.baseclasses.threebot_package):
    def _init(self, **kwargs):
        # add models
        self.bcdb = j.data.bcdb.system
        models_location = j.sal.fs.joinPaths(self.package_root, "models")
        self.bcdb.models_add(models_location)

        if "branch" in kwargs.keys():
            self.branch = kwargs["branch"]
        else:
            self.branch = "*"

    def prepare(self, blog_name, repo_url):
        """
        is called at install time
        :return:
        """
        self.blog_name = blog_name
        dest = j.clients.git.pullGitRepo(repo_url)

        # JSX> j.sal.fs.listDirsInDir(dest)
        # ['/sandbox/code/gitlab/xmonader/sample-blog-jsx/.git', '/sandbox/code/gitlab/xmonader/sample-blog-jsx/posts']
        # JSX> j.sal.fs.listFilesInDir(dest)
        # ['/sandbox/code/gitlab/xmonader/sample-blog-jsx/metadata.yml']
        link_model = self.bcdb.model_get(url="jumpscale.blog.link")
        metadata = self.bcdb.model_get(url="jumpscale.blog.metadata")
        post_model = self.bcdb.model_get(url="jumpscale.blog.post")
        blog_model = self.bcdb.model_get(url="jumpscale.blog")

        dirs = j.sal.fs.listDirsInDir(dest)
        files = j.sal.fs.listFilesInDir(dest)
        metafiles = [f for f in files if j.sal.fs.getBaseName(f) == "metadata.yml"]
        if metafiles:
            metafile = metafiles[0]
        else:
            raise j.exceptions.RuntimeError("no metadata.yml file found in the rep.")

        meta = j.data.serializers.yaml.load(metafile)
        found = blog_model.find(name=blog_name)

        if not found:
            blog = blog_model.new()
            blog.name = self.blog_name
        else:
            blog = found[0]

        posts_dir_path = j.sal.fs.joinPaths(dest, meta.get("posts_dir", "posts"))
        pages_dir_path = j.sal.fs.joinPaths(dest, meta.get("pages_dir", "pages"))
        blog.metadata.blog_title = meta.get("blog_title", "blog title")
        blog.metadata.blog_description = meta.get("blog_description", "blog desc")
        blog.metadata.author_name = meta["author_name"]
        blog.metadata.author_email = meta["author_email"]
        blog.metadata.author_image_filepath = j.sal.fs.joinPaths(dest, meta["author_image_filename"])
        blog.metadata.posts_dir = posts_dir_path
        for link_obj in meta.get("sidebar_links", []):
            blog.metadata.sidebar_links.append(link_obj)
        for link_obj in meta.get("sidebar_social_links", []):
            blog.metadata.sidebar_social_links.append(link_obj)
        for link_obj in meta.get("nav_links", []):
            blog.metadata.nav_links.append(link_obj)

        blog.metadata.github_username = meta["github_username"]
        blog.metadata.posts_per_page = int(meta.get("posts_per_page", "3"))
        blog.metadata.github_repo_url = repo_url
        blog.metadata.blog_name = blog_name
        blog.posts = []
        blog.save()

        posts = j.sal.fs.listFilesInDir(posts_dir_path)
        for post in posts:
            basename = j.sal.fs.getBaseName(post)
            basename = splitext(basename)[0]
            content = j.sal.fs.readFile(post)
            parsed = j.data.markdown.document_get(content)
            meta = parsed.meta
            post_obj = post_model.new()
            post_title = remove_date(basename)
            post_obj.title = meta.get("title", [post_title])[0]
            post_obj.slug = slugify(post_title)
            post_obj.content_with_meta = content
            post_obj.content = parsed.strip_meta(content)
            tags = meta.get("tags", [""])[0]
            tags = [t.strip() for t in tags.split(",")]
            post_obj.tags = tags
            post_obj.save()
            print("POST INFO: ", post_obj)

            blog.posts.append(post_obj)

        pages = j.sal.fs.listFilesInDir(pages_dir_path)
        for post in pages:
            basename = j.sal.fs.getBaseName(post)
            basename = splitext(basename)[0]
            content = j.sal.fs.readFile(post)
            parsed = j.data.markdown.document_get(content)
            meta = parsed.meta
            post_obj = post_model.new()
            post_title = remove_date(basename)
            post_obj.title = meta.get("title", [post_title])[0]
            post_obj.slug = slugify(post_title)
            post_obj.content_with_meta = content
            post_obj.content = parsed.strip_meta(content)
            tags = meta.get("tags", [""])[0]
            tags = [t.strip() for t in tags.split(",")]
            post_obj.tags = tags
            post_obj.save()
            print("POST INFO: ", post_obj)

            blog.pages.append(post_obj)

        blog.save()

        self.gedis_server.actors_add(j.sal.fs.joinPaths(self.package_root, "actors"))

    def start(self):
        """
        called when the 3bot starts
        :return:
        """
        server = self.openresty
        server.install()
        server.configure()
        website = server.websites.get("blog")
        website.ssl = False
        website.port = 8084
        locations = website.locations.get("blog")

        website_location = locations.locations_static.new()
        website_location.name = f"{self.blog_name}"
        website_location.path_url = f"/{self.blog_name}"
        website_location.use_jumpscale_weblibs = False
        fullpath = j.sal.fs.joinPaths(self._dirpath, "html/")
        website_location.path_location = fullpath

        website_location_assets = locations.locations_static.new()
        website_location_assets.name = "assets"
        website_location_assets.path_url = "/"
        website_location_assets.use_jumpscale_weblibs = True
        fullpath = j.sal.fs.joinPaths(self.package_root, "html/")
        website_location_assets.path_location = fullpath

        ## START BOTTLE ACTORS ENDPOINT

        rack = j.servers.rack.get()
        app = j.servers.gedishttp.get_app()
        rack.bottle_server_add(name="gedishttp", port=9201, app=app)

        proxy_location = locations.locations_proxy.new()
        proxy_location.name = "gedishttp"
        proxy_location.path_url = "/actors"
        proxy_location.ipaddr_dest = "0.0.0.0"
        proxy_location.port_dest = 9201
        proxy_location.scheme = "http"
        ## END BOTTLE ACTORS ENDPOINT

        locations.configure()
        website.configure()

        server.start()

    def stop(self):
        """
        called when the 3bot stops
        :return:
        """
        pass

    def uninstall(self):
        """
        called when the package is no longer needed and will be removed from the threebot
        :return:
        """
        # TODO: clean up bcdb ?
        pass
