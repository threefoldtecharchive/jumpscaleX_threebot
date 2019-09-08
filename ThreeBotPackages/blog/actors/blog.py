from Jumpscale import j


class blog(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        self.blog_model = j.data.bcdb.system.model_get(url="jumpscale.blog")

    def get_posts(self, blog, page=0):
        # blog = self.blog_model.find(blog_name=blog)[0]
        # TODO: better way to search by name.
        blogs = self.blog_model.find()
        for b in blogs:
            print("Blog: ", b)
            if b.metadata.blog_name == blog:
                return j.data.serializers.json.dumps(blog.posts)

    def get_posts_by_tag(self, blog, tag, page=0):
        posts = []
        blogs = self.blog_model.find()
        for b in blogs:
            print("Blog: ", b)
            for p in b.posts:
                if tag in p.tags:
                    posts.append(p)

        return j.data.serializers.json.dumps(posts)

