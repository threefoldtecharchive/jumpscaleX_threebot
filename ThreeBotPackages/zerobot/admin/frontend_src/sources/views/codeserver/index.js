import { JetView } from "webix-jet";
import { health } from "../../services/health";
import { packages } from "../../services/packages";

const CODE_URL = "/codeserver&folder=/sandbox/code";
const PACKAGE_PATH = "/sandbox/code/github/threefoldtech/jumpscaleX_threebot/ThreeBotPackages/zerobot/codeserver"

export default class CodeserverView extends JetView {
    config() {
        const iframe = {
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

        return {
            type: "space",
            rows: [{
                id: "install-package",
                cols: [
                    {
                        template: "<div style='width:auto;text-align:center'><h3>You need to install Codeserver package<h3/></div>",
                        height: 50,
                        id: "info-message"
                    }, {
                        view: "button",
                        id: "install_btn",
                        value: "Install Package",
                        css: "webix_primary",
                        inputWidth: 140,
                        height: 50
                    }, {
                        template: "<div style='width:auto;text-align:center'><h3>Codeserver<h3/></div>",
                        height: 50,
                        id: "codeserver_title",
                    }
                ]
            }, iframe]
        }
    }

    installCodeserverPackage() {
        packages.add(PACKAGE_PATH);
    }

    init(view) {
        view.codeserverIframe = $$("iframe-codeserver");
        view.installPackageContainer = $$("install-package");

        webix.extend(view.codeserverIframe, webix.ProgressBar);

        view.codeserverIframe.disable();
        view.codeserverIframe.showProgress({ type: "icon" });
        view.codeserverIframe.load(CODE_URL);

        $$("install_btn").attachEvent("onItemClick", function (id) {
            view.installCodeserverPackage();
        });

        health.getHealth().then(data => {
            let codeServerStatus = data.json().codeserver
            if (codeServerStatus == "OK") {
                view.codeserverIframe.show();
                view.installPackageContainer.hide();
            }
            else {
                view.codeserverIframe.show();
                view.installPackageContainer.hide();
            }
        });
    }

}
