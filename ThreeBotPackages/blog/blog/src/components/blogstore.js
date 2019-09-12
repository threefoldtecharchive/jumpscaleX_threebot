class BlogStore {

    getPosts(blogName) {
        let info = {
            "namespace": "default",
            "actor": "blog",
            "command": "get_posts",
            "args": {
                'blog': blogName
            },
            "headers": {
                "response_type": "json",
                "content_type": "json",
            }
        }
        console.log(info);

        return GEDIS_CLIENT.execute(info)

    }

    getPostBySlug(blogName, slug) {
        let info = {
            "namespace": "default",
            "actor": "blog",
            "command": "get_post_by_slug",
            "args": {
                'blog': blogName,
                'slug': slug,
            },
            "headers": {
                "response_type": "json",
                "content_type": "json",
            }
        }
        console.log(info);

        return GEDIS_CLIENT.execute(info)

    }
    getMeta(blogName) {
        let info = {
            "namespace": "default",
            "actor": "blog",
            "command": "get_metadata",
            "args": {
                'blog': blogName
            },
            "headers": {
                "response_type": "json",
                "content_type": "json",
            }
        }
        return GEDIS_CLIENT.execute(info)
    }

    getPostsByTag(blogName, tag) {
        let info = {
            "namespace": "default",
            "actor": "blog",
            "command": "get_posts_by_tag",
            "args": {
                'blog': blogName,
                'tag': tag
            },
            "headers": {
                "response_type": "json",
                "content_type": "json",
            }
        }
        console.log(info);
        return GEDIS_CLIENT.execute(info)

    }

    getTags(blogName) {
        console.log(`blog is ${blogName}`)
        let info = {
            "namespace": "default",
            "actor": "blog",
            "command": "get_tags",
            "args": {
                'blog': blogName,
            },
            "headers": {
                "response_type": "json",
                "content_type": "json",
            }
        }
        console.log(info);
        return GEDIS_CLIENT.execute(info)
    }

}
/*
> s = "/blog/postname"
'/blog/postname'
> s.split("/")
[ '', 'blog', 'postname' 
*/
export let blogStore = new BlogStore()