import { JetView } from "webix-jet";
import { json_ajax } from "../../common";

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
    init(view) {
        $$("install_btn").attachEvent("onItemClick", function (id) {
            addPackage();
        });
        webix.ajax().get("/zerobot/admin/actors/health/health", function (data) {
            let codeServerStatus = JSON.parse(data).codeserver
            if (codeServerStatus == "OK") {
                $$("iframe-codeserver").show();
                $$("info-message").hide();
                $$("install_btn").hide();
                $$("codeserver_title").show();
            }
            else {
                $$("iframe-codeserver").hide();
                $$("info-message").show();
                $$("install_btn").show();
                $$("codeserver_title").hide();

            }
        });

        //Api calls 
        function addPackage() {
            let url = "/zerobot/packagemanager/actors/package_manager/package_add";
            let package_path = "/sandbox/code/github/threefoldtech/jumpscaleX_threebot/ThreeBotPackages/zerobot/codeserver"
            let package_git_url = null;
            json_ajax.post(url, {
                args: {
                    git_url: package_git_url,
                    path: package_path
                }
            }).then(function (data) {
                webix.message({
                    type: "success",
                    text: "The operation has beed done successfully"
                });
            }).catch(function (error) {
                webix.message({
                    type: "error",
                    text: "error has happened " + error.response
                });
            })
        }
    }

    init(view) {
        webix.extend(view, webix.ProgressBar);
        view.disable();
        view.showProgress({ type: "icon" });
        view.load("/codeserver");
    }
}
