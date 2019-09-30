import axios from "axios";
import metadata from './_metadata';
import posts from './_posts';
import tags from './_tags';
import pages from './_pages';
import blogs from './_blogs';

axios.defaults.headers.post["Content-Type"] = "application/json";

axios.defaults.baseURL = "http://0.0.0.0:9201";
axios.defaults.port = 9201
const BLOG_API = "http://0.0.0.0:9201/actors/blog";

function callActorWithArgs(actorCmd, actorArgs) {
    var data = "";
    axios.post(`${BLOG_API}/${actorCmd}`, {
        args: actorArgs
    }).then(resp => {
        data = resp.data;
        console.log(data, ">>")
    }).catch(err => {
        console.log(err);
    })
    return JSON.stringify(data);

}

export function getMetadata(blogName) {
    if (process.env.DEV !== "1") {
        if (blogName !== "undefined") {
            return callActorWithArgs("get_metadata", {
                blog_name: blogName,
            })
        }
    } else {
        return JSON.stringify(metadata);
    }
}

export function getBlogs() {

    if (process.env.DEV !== "1") {
        let all_blogs = callActorWithArgs("get_blogs", {})
        return all_blogs
    }
    return JSON.stringify(blogs);
}

export function getPosts(blogName) {

    if (process.env.DEV !== "1") {

        if (blogName !== "undefined") {
            return callActorWithArgs("get_posts", {
                blog_name: blogName,
            })
        }
    } else {
        return JSON.stringify(posts);
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
        return JSON.stringify(tags);
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
        return JSON.stringify(pages);
    }
}

export function search(blogName, query) {

}