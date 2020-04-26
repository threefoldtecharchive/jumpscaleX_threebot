import { JetView } from "webix-jet";

import { wallet } from "../../services/wallet";

export default class WalletImportView extends JetView {
    config() {
        const info = {
            view: "form",
            id: "import_form",
            elementsConfig: { labelWidth: 200 },
            elements: [
                {
                    view: "text",
                    label: "Secret",
                    name: "secret",
                    placeholder: "Wallet secret"
                },
                {
                    view: "text",
                    label: "Name",
                    name: "name",
                    placeholder: "Wallet name"
                }
            ]
        };

        return {
            view: "window",
            head: "Import wallet",
            modal: true,
            width: 600,
            height: 400,
            position: "center",
            body: {
                rows: [
                    info,
                    {
                        view: "button",
                        value: "OK",
                        css: "webix_primary",
                        click: function () {
                            var name = $$('import_form').getValues().name
                            var secret = $$('import_form').getValues().secret
                            console.log(name);
                            console.log(secret);
                            this.$scope.importWallet(name, secret);
                        }
                    }
                ]
            }
        }
    }

    init() {
        this.form = $$("import_form");
    }

    showForm() {
        this.getRoot().show();
    }

    importWallet(name, secret) {
        
        webix.extend(this.form, webix.ProgressBar);
        this.form.showProgress({
            type:"icon",
            hide: false
        });
        wallet.importWallet(name, secret).then(data => {
            webix.message({ type: "success", text: "Wallet imported successfully" });
            this.form.showProgress({hide: true});
            this.form.clear(); 
            this.form.getTopParentView().hide();
            this.app.refresh()
        }).catch(error => {
            webix.message({ type: "error", text: "Could not import wallet" });
            this.form.showProgress({hide: true});
            this.form.clear(); 
            this.form.getTopParentView().hide();
            this.app.refresh()
        });
    }
}