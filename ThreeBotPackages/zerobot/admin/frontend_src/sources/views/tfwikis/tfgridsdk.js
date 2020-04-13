import { ExternalView } from "../external";

const TFGRIDSDK_URL = "/threefold/info_tfgridsdk/";
const REQUIRED_PACKAGES = {
    "threefold.wikis": "https://github.com/threefoldtech/jumpscaleX_threebot/tree/development/ThreeBotPackages/threefold/wikis"
}

export default class TFGridSDKWiki extends ExternalView {
    constructor(app, name) {
        super(app, name, TFGRIDSDK_URL, REQUIRED_PACKAGES);
    }
}
