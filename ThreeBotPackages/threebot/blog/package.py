from Jumpscale import j
from JumpscaleLibs.data.markdown.mistune import markdown
from os.path import dirname, abspath, join, splitext
import re
import unicodedata
from datetime import datetime

__version__ = "0.0.1"

j.builders.runtimes.python3.pip_package_install("beautifulsoup4")


def get_excerpt(content, maxlen=400):

    html = markdown(content)
    from bs4 import BeautifulSoup

    text = "".join(BeautifulSoup(html).findAll(text=True))
    return text[:maxlen]


# TODO: wrong location, need to create a jumpscale module (j.tools....) and it will be loaded automatically with your required functionality
# best to make proper configuration manager
class BlogLoader(j.baseclasses.object):

    __jslocation__ = "j.tools.blogloader"

    def _init(self, **kwargs):
        self.blog = kwargs["blog"]
        self.meta = kwargs["meta"]
        self.dest = kwargs["dest"]
        self.blog_name = kwargs["blog_name"]
        self.repo_url = kwargs["repo_url"]
        self.post_model = kwargs["post_model"]
        self.posts_dir_path = j.sal.fs.joinPaths(self.dest, self.meta.get("posts_dir", "posts"))

    def remove_date(self, filename):
        return re.sub(r"(\d+\-)+", "", filename)

    def published_date(self, filename):
        found = re.findall(r"^(\d+\-\d+\-\d+)", filename)
        if found:
            return found[0]
        else:
            today = j.data.time.epoch
            return j.data.time.epoch2pythonDate(today).isoformat().replace("/", "-")

    def slugify(self, string):
        """
        Slugify a unicode string.
        Example:
            >>> slugify(u"Héllø Wörld")
            u"hello-world"
        """
        string = self.remove_date(string)
        return re.sub(
            r"[-\s]+",
            "-",
            re.sub(r"[^\w\s-]", "", unicodedata.normalize("NFKD", string).encode("ascii", "ignore").decode())
            .strip()
            .lower(),
        )

    # populate posts
    def create_blog(self):
        self.blog.metadata.blog_title = self.meta.get("blog_title", "blog title")
        self.blog.metadata.blog_description = self.meta.get("blog_description", "blog desc")
        self.blog.metadata.author_name = self.meta["author_name"]
        self.blog.metadata.author_email = self.meta["author_email"]
        self.blog.metadata.author_image = self.meta["author_image_filename"]
        self.blog.metadata.posts_dir = self.posts_dir_path
        self.blog.metadata.allow_disqus = self.meta.get("allow_disqus", True)

        sidebar_links = self.blog.metadata.sidebar_links
        sidebar_social_links = self.blog.metadata.sidebar_social_links
        sidebar_navlinks = self.blog.metadata.nav_links

        for link_obj in self.meta.get("sidebar_links", []):
            if link_obj not in sidebar_links:
                sidebar_links.append(link_obj)
        for link_obj in self.meta.get("sidebar_social_links", []):
            if link_obj not in sidebar_social_links:
                sidebar_social_links.append(link_obj)
        for link_obj in self.meta.get("nav_links", []):
            if link_obj not in sidebar_navlinks:
                sidebar_navlinks.append(link_obj)

        self.blog.metadata.github_username = self.meta["github_username"]
        self.blog.metadata.posts_per_page = int(self.meta.get("posts_per_page", "3"))
        self.blog.metadata.github_repo_url = self.repo_url
        self.blog.metadata.blog_name = self.blog_name
        self.blog.posts = []
        self.blog.save()

    def create_posts(self):
        posts = j.sal.fs.listFilesInDir(self.posts_dir_path)
        for post in posts:
            basename = j.sal.fs.getBaseName(post)
            basename = splitext(basename)[0]
            content = j.sal.fs.readFile(post)
            parsed = j.data.markdown.document_get(content)
            meta = parsed.meta

            post_title = self.remove_date(basename)

            the_title = post_title
            if "title" in meta:
                the_title = meta["title"][0]
            get_post = self.post_model.find(title=the_title)

            if get_post:
                post_obj = get_post[0]
            else:
                post_obj = self.post_model.new()

            post_obj.title = the_title
            post_obj.slug = self.slugify(post_title)
            post_obj.content_with_meta = content
            post_obj.content = parsed.strip_meta(content)
            if len(meta.get("tags", [])) > 0:
                tags = meta.get("tags", [])[0]
                tags = [t.strip() for t in tags.split(",")]
                post_obj.tags = tags

            the_author_name = meta.get("author_name", [self.blog.metadata.author_name])[0]
            the_author_email = meta.get("author_email", [self.blog.metadata.author_email])[0]
            the_author_image = meta.get("author_image", [self.blog.metadata.author_image])[0]
            the_author_published_at = ""
            if meta.get("published_at"):
                the_author_published_at = meta.get("published_at")[0]
            else:
                the_author_published_at = self.published_date(basename)

            post_obj.author_name = the_author_name
            post_obj.author_email = the_author_email
            post_obj.author_image = the_author_image
            post_obj.post_image = meta.get("post_image", [""])[0]
            post_obj.published_at = the_author_published_at
            post_obj.excerpt = meta.get("excerpt", [get_excerpt(post_obj.content)])[0]

            post_obj.save()
            # print("POST INFO: ", post_obj)
            self.blog.posts.append(post_obj)
            self.blog.save()

    def create_pages(self):

        pages_dir_path = j.sal.fs.joinPaths(self.dest, self.meta.get("pages_dir", "pages"))
        if not j.sal.fs.exists(pages_dir_path):
            return
        pages = j.sal.fs.listFilesInDir(pages_dir_path)
        for post in pages:
            basename = j.sal.fs.getBaseName(post)
            basename = splitext(basename)[0]
            content = j.sal.fs.readFile(post)
            parsed = j.data.markdown.document_get(content)
            meta = parsed.meta

            post_title = self.remove_date(basename)

            the_title = post_title
            if "title" in meta:
                the_title = meta["title"][0]

            get_post = self.post_model.find(title=the_title)
            if get_post:
                post_obj = get_post[0]
            else:
                post_obj = self.post_model.new()

            post_obj.title = meta.get("title", [the_title])[0]
            post_obj.slug = self.slugify(post_title)
            post_obj.content_with_meta = content
            post_obj.content = parsed.strip_meta(content)
            tags = meta.get("tags", [])[0]
            tags = [t.strip() for t in tags.split(",")]
            post_obj.tags = tags
            post_obj.save()
            print("POST INFO: ", post_obj)

            self.blog.pages.append(post_obj)
            self.blog.save()


class Package(j.baseclasses.threebot_package):
    def _init(self, **kwargs):
        self.blog_dest = ""

    # TODO: wrong location, this should be on actor so people can remotely call to add blogs
    def prepare(self, blog_name, repo_url):
        """
        is called at install time
        :return:
        """
        j.builders.runtimes.nodejs.install()

        self.blog_name = blog_name
        self.blog_dest = dest = j.clients.git.pullGitRepo(repo_url)

        # JSX> j.sal.fs.listDirsInDir(dest)
        # ['/sandbox/code/gitlab/xmonader/sample-blog-jsx/.git', '/sandbox/code/gitlab/xmonader/sample-blog-jsx/posts']
        # JSX> j.sal.fs.listFilesInDir(dest)
        # ['/sandbox/code/gitlab/xmonader/sample-blog-jsx/metadata.yml']
        # link_model = self.bcdb.model_get(url="jumpscale.blog.link")
        # metadata = self.bcdb.model_get(url="jumpscale.blog.metadata")

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
        blogobj = BlogLoader(
            blog=blog, meta=meta, dest=dest, post_model=post_model, blog_name=self.blog_name, repo_url=repo_url
        )
        blogobj.create_blog()
        blogobj.create_posts()
        blogobj.create_pages()

        # self.gedis_server.actors_add(j.sal.fs.joinPaths(self.package_root, "actors"))

    def start(self):
        """
        called when the 3bot starts
        :return:
        """

        server = self.openresty

        website = server.get_from_port(443)

        locations = website.locations.get("blogs_locations")

        website_location = locations.locations_static.new()
        website_location.name = "blogs"
        website_location.name = f"blog_{self.blog_name}_assets"
        website_location.path_url = f"/blog_{self.blog_name}/assets"

        fullpath = j.sal.fs.joinPaths(self.blog_dest, "assets")
        website_location.path_location = fullpath

        # website_location_assets = locations.locations_static.new()
        # website_location_assets.name = f"blogs_static"
        # website_location_assets.path_url = f"/blog/static"
        # fullpath = j.sal.fs.joinPaths(self.package_root, "sapper-blog", "static")
        # website_location_assets.path_location = fullpath

        # website_location_assets = locations.locations_static.new()
        # website_location_assets.name = f"blog_{self.blog_name}_assets"
        # website_location_assets.path_url = f"/blog/{self.blog_name}/assets"
        # fullpath = j.sal.fs.joinPaths(self.blog_dest, "assets")
        # website_location_assets.path_location = fullpath

        ## START BOTTLE ACTORS ENDPOINT

        # app = j.servers.gedishttp.get_app()
        # rack.bottle_server_add(name="gedishttp", port=8903, app=app)

        # TODO: think gedishttp not used properly, was in this file but need not to be here
        # proxy_location = locations.locations_proxy.new()
        # proxy_location.name = "gedishttp"
        # proxy_location.path_url = "/actors"
        # proxy_location.ipaddr_dest = "0.0.0.0"
        # proxy_location.port_dest = 8903
        # proxy_location.scheme = "http"
        ## END BOTTLE ACTORS ENDPOINT

        proxy_location = locations.locations_proxy.new()
        proxy_location.name = "nodeapp"
        # TODO: don't know how it could have worked because path_url did not exist on model
        proxy_location.path_url = f"/blog"
        proxy_location.path_dest = f"/blog"

        proxy_location.ipaddr_dest = "0.0.0.0"
        proxy_location.port_dest = 3000
        proxy_location.scheme = "http"

        locations.configure()
        website.configure()
