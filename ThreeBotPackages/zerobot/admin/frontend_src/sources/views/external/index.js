import { JetView } from "webix-jet";
import { packages } from "../../services/packages";

const STATUS_INSTALLED = 3;

export class ExternalView extends JetView {
    constructor(app, name, targetUrl, requiredPackages) {
        super(app, name);

        this.targetUrl = targetUrl || "/";
        this.requiredPackages = requiredPackages || {}; // required packages as name: git_url pairs
        this.packageNames = Object.keys(this.requiredPackages); // only names
        this.packagesToInstall = {}; // what we will install
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
        let promises = Object.values(this.packagesToInstall).map((path) => {
            // add by git url
            return packages.add(null, path);
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


        // check which packages to install
        this.packagesToInstall = {};
        // try to get info about required packages
        // if any is already registered and installed, then just ignore it
        packages.getStatus(this.packageNames).then(data => {
            const packageStates = data.json();

            // now go over required packages
            for (let name of this.packageNames) {
                // check if a required package is registered and installed
                if (packageStates[name] == STATUS_INSTALLED) {
                    continue;
                }

                this.packagesToInstall[name] = this.requiredPackages[name];
            }

            // check packages to be installed again if still need to install any of them
            const packageNamesToInstall = Object.keys(this.packagesToInstall);
            if (packageNamesToInstall.length) {
                view.installPackageContainer.show();
                view.externalIframe.hide();

                const names = packageNamesToInstall.join(", ");
                this.requiredPackagesDiv.setHTML(
                    `<div style='width:auto;text-align:center'><h3>You need to install the following required packages: ${names}<h3/></div>`
                );
            } else {
                view.installPackageContainer.hide();
                view.externalIframe.show();
                view.externalIframe.load(this.targetUrl);
            }
        });
    }

}
