import {
    getPosts
} from "../../_api.js";



export function get(req, res, next) {
    // the `slug` parameter is available because
    // this file is called [slug].json.js
    const {
        theuser, slug
    } = req.params;
    let posts = JSON.parse(getPosts(theuser))

    const lookup = new Map();
    posts.forEach(post => {
        lookup.set(post.slug, JSON.stringify(post));
    });
    if (lookup.has(slug)) {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(lookup.get(slug));
    } else {
        res.writeHead(404, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify({
            message: `Not found`
        }));
    }
}