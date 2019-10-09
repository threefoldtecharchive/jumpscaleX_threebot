from Jumpscale import j


class BlogsFactory(j.baseclasses.threebot_factory):

    __jslocation__ = "j.threebot.package.blogs"

    # TODO: move to actor, everything to do with adding/removing blogs should be in actor
    def install(self, blogs_info_list=None):
        self.server = j.servers.threebot.get("blog")
        self.server.save()
        for blog_name, repo_url in blogs_info_list:  # blog_name, url
            package = j.tools.threebot_packages.get("blog", path=self._dirpath, threebot_server_name=self.server.name)
            package.prepare(blog_name, repo_url)
            package.save()
            self._log_info(f"blog {blog_name} loaded")

        return "OK"

    # TODO: move to actor
    # there need to be separate packge (like we did with wiki) which then calls the actor and adds the required blogs from the required locations
    def start(self, blogs_info_list=None):
        """
        blogs_info_list List[tuple[str, str]]: list of blogs in format of blog_name, git url
        """
        if not blogs_info_list:
            repo_url = "git@gitlab.com:xmonader/sample-blog-jsx.git"
            blogs_info_list = [("xmon", repo_url)]

        self.install(blogs_info_list)
        self._start_blog_app()

        self.server.start(web=True)
        self.server.openresty.start()

    # TODO: why needed can this not be done differently, e.g. always use 3bot
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
