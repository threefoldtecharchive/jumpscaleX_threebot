import {
    getPosts
} from "./_api"


export function get(req, res) {
    console.log("dev: ", process.env.DEV)
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    if (process.env.DEV) {
        res.end(getPosts());
    } else {

    }
}