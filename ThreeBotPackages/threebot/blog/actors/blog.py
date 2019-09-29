from Jumpscale import j


class blog(j.baseclasses.threebot_actor):
    def _init(self, **kwargs):
        self.blog_model = j.data.bcdb.system.model_get(url="jumpscale.blog")

    def get_metadata(self, blog, user_session=None):
        """
        ```in
            blog = (S)
        ```
        """
        # get saved blog's metadata from bcdb by name
        found_blog = self.blog_model.find(name=blog)[0]
        if found_blog:
            return j.data.serializers.json.dumps(found_blog.metadata._ddict)
        return False

    def get_posts(self, blog, page=0, user_session=None):
        """
        ```in
            blog = (S)
            page = 0 (I)
        ```
        """
        # get the requested blog by name from bcdb
        # if a hit found will return its posts
        found_blog = self.blog_model.find(name=blog)[0]
        if found_blog:
            res = [p._ddict for p in found_blog.posts]
            return j.data.serializers.json.dumps(res)

    def _list_posts(self, blog, page=0, user_session=None):
        """
        ```in
            blog = (S)
            page = 0 (I)
        ```
        """
        found_blog = self.blog_model.find(name=blog)[0]
        if found_blog:
            return found_blog.posts

    def get_pages(self, blog, page=0, user_session=None):
        """
        ```in
            blog = (S)
            page = 0 (I)
        ```
        """
        found_blog = self.blog_model.find(name=blog)[0]
        if found_blog:
            return found_blog.pages

    def get_post_by_slug(self, blog, slug, user_session=None):
        """
        ```in
            blog = (S)
            slug = (S)
        ```
        """
        all_posts = self._list_posts(blog)
        for post in all_posts:
            if post.slug == slug:
                return post._json
            else:
                return {}

    def get_posts_by_tag(self, blog, tag, page=0, user_session=None):
        """
        ```in
            blog = (S)
            tag  = (S)
            page = 0 (I)
        ```
        """
        posts = []
        all_posts = self._list_posts(blog)
        for post in all_posts:
            if tag in post.tags:
                posts.append(post._ddict)
        return j.data.serializers.json.dumps(posts)

    def get_tags(self, blog, user_session=None):
        """
        ```in
            blog = (S)
        ```
        """
        tags = set()
        found_blog = self.blog_model.find(name=blog)[0]
        if found_blog:
            for post in found_blog.posts:
                for tag in post.tags:
                    tags.add(tag)

        tags = list(tags)
        return j.data.serializers.json.dumps(tags)

    def search(self, blog, query, user_session=None):
        """
        ```in
            blog = (S)
            query = (S)
        ```
        """
        # takes a slice of a content of a post / page and returns the post's / page's slug
        posts = self._list_posts(blog)
        pages = self.get_pages(blog)
        results = []
        for post in posts:
            if query in post.content_with_meta:
                temp = {"type": "post", "slug": post.slug}
                if not temp in results:
                    results.append(temp)

        for page in pages:
            if query in page.content_with_meta:
                temp = {"type": "page", "slug": page.slug}
                if not temp in results:
                    results.append(temp)

        if results:
            return j.data.serializers.json.dumps(results)
