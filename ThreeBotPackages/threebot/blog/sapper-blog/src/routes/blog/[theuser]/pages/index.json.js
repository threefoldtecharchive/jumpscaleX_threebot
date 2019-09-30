import {
    getPages
} from '../../_api';


export async function get(req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    res.end(await getPages(req.params.theuser));
}