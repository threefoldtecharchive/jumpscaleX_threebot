import axios from "axios";
import metadata from './_metadata';
import posts from './_posts';
import tags from './_tags';
import pages from './_pages';
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
            blog_name: getBlogName()
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