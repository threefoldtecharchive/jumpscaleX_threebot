import axios from "axios";
import metadata from './_metadata.js.js.js';
import posts from './_posts.js.js.js';
import tags from './_tags.js.js.js';
import pages from './_pages.js.js.js';
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
export function getMetadata() {
    if (process.env.DEV) {

        return JSON.stringify(metadata);
    } else {
        callActorWithArgs("get_metadata", {
            blog_name: getBlog
        })

    }
}

export function getBlogName() {
    if (process.env.DEV) {
        return JSON.parse(getMetadata()).blog_name;
    } else {

    }
}
export function getPosts() {
    let blogName = getBlogName()

    if (process.env.DEV) {

        return JSON.stringify(posts);
    } else {}
}

export function getTags() {
    let blogName = getBlogName()

    if (process.env.DEV) {


        return JSON.stringify(tags);
    } else {}

}

export function getPages() {

    if (process.env.DEV) {

        return JSON.stringify(pages);
    } else {}

}

export function search(blogName, query) {

}