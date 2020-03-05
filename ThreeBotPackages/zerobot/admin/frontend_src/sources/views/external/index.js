import { JetView } from "webix-jet";
import { packages } from "../../services/packages";

const STATUS_INSTALLED = 3;

export class ExternalView extends JetView {
    constructor(app, name, targetUrl, requiredPackages) {
        super(app, name);

        this.targetUrl = targetUrl || "/";
        this.requiredPackages = requiredPackages || {}; // required packages as name: git_url pairs
        this.requiredPackageNames = Object.keys(this.requiredPackages);
        this.toInstallPackages = []; // packages names to install
    }

    config() {
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

        const names = this.requiredPackageNames.join(", ");
        return {
            rows: [{
                localId: "install-packages",
                hidden: true,
                cols: [
                    {
                        template: `<div style='width:auto;text-align:center'><h3>You need to install the following required packages: ${names}<h3/></div>`,
                        autoheight: true,
                    }, {
                        view: "button",
                        localId: "install_btn",
                        value: "Install required packages",
                        css: "webix_primary",
                        height: 50
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
        if (!this.toInstallPackages.length) {
            return;
        }

        let promises = this.toInstallPackages.map((name) => {
            return packages.add(null, this.requiredPackages[name]);
        });

        Promise.all(promises).then(() => {
            webix.message({ type: "success", text: "All required packages installed successfully" });
            setInterval(() => window.location.reload(true), 600);
        }).catch((error) => {
            webix.message({ type: "error", text: "An error occurred, please try installing from packages for more details" });
        });
    }

    init(view) {
        view.installPackageContainer = this.$$("install-packages");
        view.installButton = this.$$("install_btn");
        view.installButton.attachEvent("onItemClick", this.installRequiredPackages.bind(this));

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
                if (requiredPackage && p.status != STATUS_INSTALLED) {
                    this.toInstallPackages.push(p.name);
                }
            }

            if (this.toInstallPackages.length) {
                view.installPackageContainer.show();
                view.externalIframe.hide();
            } else {
                view.installPackageContainer.hide();
                view.externalIframe.show();
            }

        });
    }

}
