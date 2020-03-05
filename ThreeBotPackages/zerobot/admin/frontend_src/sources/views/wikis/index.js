import { ExternalView } from "../external";

const WIKIS_URL = "/wiki";

export default class WikisView extends ExternalView {
    constructor(app, name) {
        super(app, name, WIKIS_URL);
    }
}
