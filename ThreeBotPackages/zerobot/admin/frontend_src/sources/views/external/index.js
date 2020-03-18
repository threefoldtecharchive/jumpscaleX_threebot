import { JetView } from "webix-jet";
import { packages } from "../../services/packages";

const STATUS_INSTALLED = 3;

export class ExternalView extends JetView {
    constructor(app, name, targetUrl, requiredPackages) {
        super(app, name);

        this.targetUrl = targetUrl || "/";
        this.requiredPackages = requiredPackages || {}; // required packages as name: git_url pairs
    }

    config() {
        const self = this;
        const iframe = {
            view: "iframe",
            localId: "iframe-external",
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
            rows: [{
                localId: "install-packages",
                hidden: true,
                cols: [
                    {
                        localId: "required_packages_div",
                        view: "template",
                        autoheight: true,
                    }, {
                        view: "button",
                        localId: "install_btn",
                        value: "Install required packages",
                        css: "webix_primary",
                        height: 50,
                        click: self.installRequiredPackages.bind(self)
                    }, {
                        view: "button",
                        localId: "go_to_packages_btn",
                        value: "Go to packages and install them manually",
                        css: "webix_primary",
                        height: 50,
                        click: function () {
                            this.$scope.show("/main/packages");
                        }
                    }
                ]
            }, iframe]
        }
    }

    installRequiredPackages() {
        let promises = Object.keys(this.requiredPackages).map((name) => {
            // add by git url
            return packages.add(null, this.requiredPackages[name]);
        });

        this.installButton.disable();
        Promise.all(promises).then(() => {
            webix.message({ type: "success", text: "All required packages installed successfully, page will be reloaded in 2 seconds" });
            setInterval(() => window.location.reload(true), 2000);
        }).catch(() => {
            webix.message({ type: "error", text: "An error occurred, please try installing from packages for more details" });
        });
    }

    init(view) {
        this.requiredPackagesDiv = this.$$("required_packages_div");
        view.installPackageContainer = this.$$("install-packages");
        this.installButton = this.$$("install_btn");

        view.externalIframe = this.$$("iframe-external");
        webix.extend(view.externalIframe, webix.ProgressBar);
        view.externalIframe.disable();
        view.externalIframe.showProgress({ type: "icon" });
        view.externalIframe.load(this.targetUrl);


        // check which packages to install
        packages.list().then(data => {
            const allPackages = data.json().packages;
            for (const p of allPackages) {
                const requiredPackage = this.requiredPackages[p.name];
                if (requiredPackage && p.status == STATUS_INSTALLED) {
                    delete this.requiredPackages[p.name];
                }
            }

            if (Object.keys(this.requiredPackages).length) {
                view.installPackageContainer.show();
                view.externalIframe.hide();

                const names = Object.keys(this.requiredPackages).join(", ");
                this.requiredPackagesDiv.setHTML(
                    `<div style='width:auto;text-align:center'><h3>You need to install the following required packages: ${names}<h3/></div>`
                );
            } else {
                view.installPackageContainer.hide();
                view.externalIframe.show();
            }
        });
    }

}
