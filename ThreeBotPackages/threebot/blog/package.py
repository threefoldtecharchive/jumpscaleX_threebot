from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def start(self):
        """
        called when the 3bot starts
        :return:
        """
        server = self.openresty
        for port in [80, 443]:
            website = server.get_from_port(port)

            locations = website.locations.get(f"blogs_locations_{port}")
            # adding blogs static assests
            blog_model = self.bcdb.model_get(url="jumpscale.blog")
            for blog in blog_model.find():
                if blog.name:
                    blog_name = blog.name
                    website_location = locations.locations_static.new()
                    website_location.name = "blogs"
                    website_location.name = f"blog_{blog_name}_assets"
                    website_location.path_url = f"/blog_{blog_name}/assets"
                    assets_path = j.sal.fs.joinPaths(j.sal.fs.getParent(blog.metadata.posts_dir), "assets")
                    website_location.path_location = assets_path

            # blog spa
            website_location = locations.locations_spa.new()
            website_location.name = "blog"
            website_location.path_url = "/blog"
            website_location.use_jumpscale_weblibs = False
            fullpath = j.sal.fs.joinPaths(self.package_root, "html")
            website_location.path_location = fullpath

            locations.configure()
            website.configure()
