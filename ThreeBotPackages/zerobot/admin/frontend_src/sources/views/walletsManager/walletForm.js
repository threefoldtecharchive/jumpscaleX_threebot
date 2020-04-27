import { JetView } from "webix-jet";
import { wallet } from "../../services/wallet";

export default class WalletFormView extends JetView {
    config() {
        const info = {
            view: "form",
            id: "form",
            elementsConfig: { labelWidth: 200 },
            elements: [
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
            head: "Create new wallet",
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
                            var wallet_name = $$('form').getValues().name
                            this.$scope.createWallet(wallet_name);
                        }
                    }
                ]
            }
        }
    }

    init() {
        this.form = $$("form");
    }

    showForm() {
        this.getRoot().show();
    }

    createWallet(name){

        webix.extend(this.form, webix.ProgressBar);
        this.form.showProgress({
            type:"icon",
            hide: false
        });
        wallet.createWallet(name).then(data => {
            webix.message({ type: "success", text: "Wallet created successfully" });
            this.form.showProgress({hide: true});
            this.form.getTopParentView().hide();
            this.app.refresh()
        }).catch(error => {
            webix.message({ type: "error", text: "Could not create wallet" });
            this.form.showProgress({hide: true});
            this.form.getTopParentView().hide();
            this.app.refresh()
        });
    }
}