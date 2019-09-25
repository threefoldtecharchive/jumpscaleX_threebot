import {
    getPosts
} from "../_api"


export function get(req, res) {
    console.log("dev: ", process.env.DEV)
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    if (process.env.DEV) {
        // console.log(JSON.stringify(req.params))
        res.end(getPosts());
    } else {

    }
}