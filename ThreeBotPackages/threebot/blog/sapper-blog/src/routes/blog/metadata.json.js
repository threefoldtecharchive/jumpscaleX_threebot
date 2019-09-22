import metadata from './_metadata.js';

const contents = JSON.stringify(metadata);

export function get(req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    res.end(contents);
}
