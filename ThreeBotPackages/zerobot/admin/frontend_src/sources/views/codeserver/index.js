import { JetView } from "webix-jet";

export default class CodeserverView extends JetView {
    config() {
        return {
            view: "iframe",
            id: "iframe-codeserver",
            on: {
                onAfterLoad: function () {
                    if (this.hideProgress) {
                        this.hideProgress();
                    }
                    this.enable();
                }
            }
        };
    }

    init(view) {
        webix.extend(view, webix.ProgressBar);
        view.disable();
        view.showProgress({ type: "icon" });
        view.load("/codeserver");
    }
}
