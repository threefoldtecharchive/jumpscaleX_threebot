import axios from "axios"

const BLOG_API = "/actors/blog"

axios.defaults.headers.post['Content-Type'] = 'application/json';

class BlogStore {

    getPosts(blogName) {
        return axios.post(`${BLOG_API}/get_posts`, {
            args: {
                blog: blogName
            }
        })

    }

    getPostBySlug(blogName, slug) {
        return axios.post(`${BLOG_API}/get_post_by_slug`, {
            args: {
                blog: blogName,
                slug: slug
            }
        })

    }
    getMeta(blogName) {
        return axios.post(`${BLOG_API}/get_metadata`, {
            args: {
                blog: blogName
            }
        })
    }

    getPostsByTag(blogName, tag) {

        return axios.post(`${BLOG_API}/get_posts_by_tag`, {
            args: {
                blog: blogName,
                tag: tag,
            }
        })
    }

    getTags(blogName) {
        return axios.post(`${BLOG_API}/get_tags`, {
            args: {
                blog: blogName,
            }
        })
    }

}

export let blogStore = new BlogStore()