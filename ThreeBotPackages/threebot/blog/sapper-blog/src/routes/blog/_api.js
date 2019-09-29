import axios from "axios";
import metadata from './_metadata';
import posts from './_posts';
import tags from './_tags';
import pages from './_pages';
import blogs from './_blogs';

axios.defaults.headers.post["Content-Type"] = "application/json";

const BLOG_API = "/actors/blog";

function callActorWithArgs(actorCmd, actorArgs) {
    return JSON.stringify(axios.post(`${BLOG_API}/${actorCmd}`, {
        args: actorArgs
    }));
}

export function getMetadata(blogName) {
    if (process.env.DEV !== "1") {
        if (blogName !== undefined) {
            return callActorWithArgs("get_metadata", {
                blog_name: blogName,
            })
        }
    }
    return JSON.stringify(metadata);
}

export function getBlogs() {
    if (process.env.DEV !== "1") {
        if (blogName !== undefined) {
            return callActorWithArgs("get_blogs", {
            })
        }
    }
    return JSON.stringify(blogs);
}

export function getPosts(blogName) {

    if (process.env.DEV !== "1") {

        if (blogName !== undefined) {
            return callActorWithArgs("get_posts", {
                blog_name: blogName,
            })
        }
    }
    return JSON.stringify(posts);
}

export function getTags(blogName) {

    if (process.env.DEV !== "1") {

        if (blogName !== undefined) {
            return callActorWithArgs("get_tags", {
                blog_name: blogName,
            })
        }
    }
    return JSON.stringify(tags);
}

export function getPages(blogName) {

    if (process.env.DEV !== "1") {

        if (blogName !== undefined) {
            return callActorWithArgs("get_pages", {
                blog_name: blogName,
            })
        }
    }
    return JSON.stringify(pages);
}

export function search(blogName, query) {

}