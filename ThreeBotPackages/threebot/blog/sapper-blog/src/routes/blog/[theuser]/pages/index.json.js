import {
    getPages
} from '../../_api';


export function get(req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    res.end(getPages(req.params.theuser));
}