import {
    getPages
} from '../_api.js';


export function get(req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    res.end(getPages());
}