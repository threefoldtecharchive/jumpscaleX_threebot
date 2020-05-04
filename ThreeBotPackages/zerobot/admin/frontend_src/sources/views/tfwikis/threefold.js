import { ExternalView } from "../external";
import { admin } from "../../services/admin";


export default class ThreefoldWiki extends ExternalView {
    constructor(app, name) {
        super(app, name);
    }

    showIframe() {
        this.externalIframe.show();
        this.externalIframe.showProgress({ type: "icon" });
        this.externalIframe.load("https://wiki.threefold.io");
    }
}
