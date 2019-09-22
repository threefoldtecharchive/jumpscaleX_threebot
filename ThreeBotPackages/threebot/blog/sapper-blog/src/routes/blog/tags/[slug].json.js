import posts from '../_posts.js';

const lookup = new Map()
posts.forEach(post => {
    post.tags.forEach(tag => {
        if (lookup.has(tag)) {
            lookup.set(tag, [...lookup.get(tag), post])
        } else {
            lookup.set(tag, [post])
        }
    })
});
// console.log(lookup)

export function get(req, res, next) {
    // the `slug` parameter is available because
    // this file is called [slug].json.js
    const { slug } = req.params;

    if (lookup.has(slug)) {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        console.log(`result: ${JSON.stringify(lookup.get(slug))}`)
        res.end(JSON.stringify(lookup.get(slug)));
    } else {
        res.writeHead(404, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify({
            message: `Not found`
        }));
    }
}
