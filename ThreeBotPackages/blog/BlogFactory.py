from Jumpscale import j


class BlogFactory(j.baseclasses.object, j.baseclasses.testtools):

    __jslocation__ = "j.threebot.package.blog"

    def install(self, blog_name, repo_url):
        self.server = j.servers.threebot.get("blog")
        self.server.save()

        package = j.tools.threebot_packages.get("blog", path=self._dirpath, threebot_server_name=self.server.name)
        package.prepare(blog_name, repo_url)
        package.save()
        self._log_info("blog loaded")

        return "OK"

    def start(self, blog_name, repo_url=None):
        repo_url = repo_url or "git@gitlab.com:xmonader/sample-blog-jsx.git"
        self.install(blog_name, repo_url)
        self.server.start(web=True)

    def test(self, name=""):
        pass
