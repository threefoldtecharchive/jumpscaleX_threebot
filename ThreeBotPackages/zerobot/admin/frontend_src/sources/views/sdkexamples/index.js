import { ExternalView } from "../external";

const URL = "/threefold/sdkexamples/notebook/";
const REQUIRED_PACKAGES = {
    "threefold.sdkexamples": "https://github.com/threefoldtech/jumpscaleX_threebot/tree/development/ThreeBotPackages/threefold/sdkexamples"
}

export default class JupyterView extends ExternalView {
    constructor(app, name) {
        super(app, name, URL, REQUIRED_PACKAGES);
    }
}
