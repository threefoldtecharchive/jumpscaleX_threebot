import { ExternalView } from "../external";

const THREEFOLD_URL = "/threefold/info_threefold/";
const REQUIRED_PACKAGES = {
    "threefold.wikis": "https://github.com/threefoldtech/jumpscaleX_threebot/tree/development/ThreeBotPackages/threefold/wikis"
}

export default class ThreefoldWiki extends ExternalView {
    constructor(app, name) {
        super(app, name, THREEFOLD_URL, REQUIRED_PACKAGES);
    }
}
