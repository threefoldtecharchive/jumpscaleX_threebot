import { ExternalView } from "../external";

const URL = "threefold/simulator/notebook/";
const REQUIRED_PACKAGES = {
    "threefold.simulator": "https://github.com/threefoldtech/jumpscaleX_threebot/tree/development/ThreeBotPackages/threefold/simulator"
}

export default class JupyterView extends ExternalView {
    constructor(app, name) {
        super(app, name, URL, REQUIRED_PACKAGES);
    }
}
