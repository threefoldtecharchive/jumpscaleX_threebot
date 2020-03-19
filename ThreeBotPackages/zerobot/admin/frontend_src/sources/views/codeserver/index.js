import { ExternalView } from "../external";

const CODE_URL = "/codeserver/?folder=/sandbox/code";
const REQUIRED_PACKAGES = {
    "zerobot.codeserver": "https://github.com/threefoldtech/jumpscaleX_threebot/tree/development/ThreeBotPackages/zerobot/codeserver"
}

export default class CodeserverView extends ExternalView {
    constructor(app, name) {
        super(app, name, CODE_URL, REQUIRED_PACKAGES);
    }
}
