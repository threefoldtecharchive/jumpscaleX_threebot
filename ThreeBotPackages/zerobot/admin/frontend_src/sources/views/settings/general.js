import { JetView } from "webix-jet";

import { admin } from "../../services/admin";

export default class GeneralView extends JetView {
    config() {

        return {
            localId: "general_form",
            view: "form",
            elements: [
                {
                    view: "richselect",
                    id: "explorer_list",
                    label: "Explorer",
                    labelWidth: 150,
                    value: "testnet",
                    yCount: 2,
                    options: [
                        { id: "testnet", value: "Test Net" },
                        { id: "main", value: "Main" },
                    ]
                },
                {
                    localId: "explorer_address",
                    view: "text",
                    type: "text",
                    readonly: true,
                    label: "Explorer address",
                    labelWidth: 150,
                },
            ]
        }

    }

    doAction(promise, callback) {
        this.form.showProgress()
        promise.then((data) => {
            if (callback) {
                callback(data);
            }
            console.log(data);
            this.form.showProgress({ hide: true });
        });
    }

    init() {
        var self = this;

        self.form = self.$$('general_form');
        webix.extend(self.form, webix.ProgressBar);

        self.explorerList = self.$$('explorer_list');
        self.explorerAddress = self.$$('explorer_address');


        self.doAction(admin.get_explorer(), (data) => {
            const explorer = data.json();
            self.explorerList.setValue(explorer.type);
            self.explorerAddress.setValue(explorer.url);
        });

        self.explorerList.attachEvent("onChange", (newValue) => {
            self.doAction(admin.set_explorer(newValue.toLowerCase()), (data) => {
                const explorer = data.json();
                self.explorerAddress.setValue(explorer.url);
            });
        });


    }
}
