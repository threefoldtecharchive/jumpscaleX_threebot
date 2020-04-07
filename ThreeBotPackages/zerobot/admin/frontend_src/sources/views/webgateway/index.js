import { ExternalView } from "../external";

const URL = "/tfgrid_solutions/webgateway/chat/webgateway";
const REQUIRED_PACKAGES = {
    "tfgrid_solutions.webgateway": "https://github.com/threefoldtech/jumpscaleX_threebot/tree/development/ThreeBotPackages/tfgrid_solutions/webgateway"
}

export default class WebgatewayView extends ExternalView {
    constructor(app, name) {
        super(app, name, URL, REQUIRED_PACKAGES);
    }
}
