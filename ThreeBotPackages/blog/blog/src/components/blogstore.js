class BlogStore {

    getPosts(blog_name) {
        let info = {
            "namespace": "default",
            "actor": "blog",
            "command": "get_posts",
            "args": {
                'blog': blog_name
            },
            "headers": {
                "response_type": "json",
                "content_type": "json",
            }
        }
        console.log(info);

        return GEDIS_CLIENT.execute(info)

    }
    getMeta(blog_name) {
        let info = {
            "namespace": "default",
            "actor": "blog",
            "command": "get_metadata",
            "args": {
                'blog': blog_name
            },
            "headers": {
                "response_type": "json",
                "content_type": "json",
            }
        }
        return GEDIS_CLIENT.execute(info)


    }

    getPostsByTag(blog_name, tag) {
        let info = {
            "namespace": "default",
            "actor": "blog",
            "command": "get_posts_by_tag",
            "args": {
                'blog': blog_name,
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

    getTags(blog_name) {
        console.log(`blog is ${blog_name}`)
        let info = {
            "namespace": "default",
            "actor": "blog",
            "command": "get_tags",
            "args": {
                'blog': blog_name,
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