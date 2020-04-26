import { JetView } from "webix-jet";

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
                            var secret = $$('import_form').getValues().secret
                            console.log(secret);
                            $$('import_form').clear();
                            this.getTopParentView().hide();
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
}