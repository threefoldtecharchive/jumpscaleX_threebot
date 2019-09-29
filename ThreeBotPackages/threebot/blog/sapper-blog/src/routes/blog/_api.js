import axios from "axios";
import metadata from './_metadata';
import posts from './_posts';
import tags from './_tags';
import pages from './_pages';
import blogs from './_blogs';

axios.defaults.headers.post["Content-Type"] = "application/json";




const BLOG_API = "/actors/blog";

function callActorWithArgs(actorCmd, actorArgs) {
    return axios.post(`${BLOG_API}/${actorCmd}`, {
        args: actorArgs
    });
}

// function search(e) {
//     // TBD
// }
export function getMetadata(blogName) {
    if (process.env.DEV) {

        return JSON.stringify(metadata);
    } else {
        callActorWithArgs("get_metadata", {
            blog_name: blogName,
        })

    }
}

export function getBlogs() {
    if (process.env.DEV) {

        return JSON.stringify(blogs);
    } else {
        callActorWithArgs("get_blogs", {
        })

    }

}
export function getPosts(blogName) {

    if (process.env.DEV) {

        return JSON.stringify(posts);
    } else { }
}

export function getTags(blogName) {
    if (process.env.DEV) {


        return JSON.stringify(tags);
    } else { }

}

export function getPages(blogName) {

    if (process.env.DEV) {

        return JSON.stringify(pages);
    } else { }

}

export function search(blogName, query) {

}