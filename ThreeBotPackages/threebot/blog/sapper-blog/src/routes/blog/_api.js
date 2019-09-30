import axios from "axios";
import metadata from './_metadata';
import posts from './_posts';
import tags from './_tags';
import pages from './_pages';
import blogs from './_blogs';

axios.defaults.headers.post["Content-Type"] = "application/json";

axios.defaults.baseURL = "http://127.0.0.1:9201";
axios.defaults.port = 9201
const BLOG_API = "http://127.0.0.1:9201/actors/blog";

function callActorWithArgs(actorCmd, actorArgs) {

    return new Promise((resolve, reject) => {
        let p = axios.post(`${BLOG_API}/${actorCmd}`, {
            args: actorArgs
        })
        p.json = () => p.data

        resolve(p)

    })
}

export function getMetadata(blogName) {
    if (process.env.DEV !== "1") {
        if (blogName !== "undefined") {
            return callActorWithArgs("get_metadata", {
                blog_name: blogName,
            })
        }
    } else {
        return new Promise(function (resolve, reject) {
            resolve(JSON.stringify(metadata))
        });
    }
}

// TODO::
// getPageBySlug(blogName, page_slug)..

// getPostsBySlug()...


export function getBlogs() {

    if (process.env.DEV !== "1") {
        return callActorWithArgs("get_blogs", {})
    }
    else {
        return new Promise(function (resolve, reject) {
            resolve(JSON.stringify(blogs))
        });
    }
}

export function getPosts(blogName) {

    if (process.env.DEV !== "1") {

        if (blogName !== "undefined") {
            return callActorWithArgs("get_posts", {
                blog_name: blogName,
            })
        }
    } else {
        return new Promise(function (resolve, reject) {
            resolve(JSON.stringify(posts))
        });
    }
}

export function getTags(blogName) {

    if (process.env.DEV !== "1") {

        if (blogName !== "undefined") {
            return callActorWithArgs("get_tags", {
                blog_name: blogName,
            })
        }
    } else {
        return new Promise(function (resolve, reject) {
            resolve(JSON.stringify(tags))
        });
    }
}

export function getPages(blogName) {
    if (process.env.DEV !== "1") {
        if (blogName !== "undefined") {
            return callActorWithArgs("get_pages", {
                blog_name: blogName,
            })
        }
    } else {
        return new Promise(function (resolve, reject) {
            resolve(JSON.stringify(pages))
        });
    }
}

export function search(blogName, query) {

}