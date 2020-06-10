import { ExternalView } from "../external";

const GRAFANA_URL = "/grafana/";
const REQUIRED_PACKAGES = {
    "zerobot.grafana": "https://github.com/threefoldtech/jumpscaleX_threebot/tree/development/ThreeBotPackages/zerobot/grafana"
}

export default class GrafanaView extends ExternalView {
    constructor(app, name) {
        super(app, name, GRAFANA_URL, REQUIRED_PACKAGES);
    }
}
