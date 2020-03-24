import { ExternalView } from "../external";

const URL = "/#/farmmanagement";
const REQUIRED_PACKAGES = {
    "threebot.farmmanagement": "https://github.com/threefoldtech/jumpscaleX_threebot/tree/development/ThreeBotPackages/threebot/farmmanagement"
}

export default class FarmmanagementView extends ExternalView {
    constructor(app, name) {
        super(app, name, URL, REQUIRED_PACKAGES);
    }
}
