import { JetView } from "webix-jet";

export default class InvoiceView extends JetView {
    config() {
        const info = {
            id: "invoice_info",
            view: "list",
            responsive: true,
            type: {
                height: 'auto',
            },
            template: `
                <p></font><font size="4"><b>#key#: </b>#value#</font><br></p>
            `
        }

        return {
            view: "window",
            head: "Invoice Details",
            modal: true,
            width: window.innerWidth * .8,
            height: window.innerHeight * .8,
            position: "center",
            body: {
                rows: [
                    info,
                    {
                        cols: [{
                            view: "button",
                            value: "Close",
                            css: "webix_primary",
                            click: function () {
                                this.getTopParentView().hide();
                            }
                        }]
                    }
                ]
            }
        }
    }


    init() {
        const self = this;
        self.info = this.$$("invoice_info");
    }

    viewItem(item) {
        var self = this
        self.info.clearAll()
        for (let [key, value] of Object.entries(item)) {
            if (key === "farmer_payments") {
                let payment_info = ""
                for (let [key, value] of Object.entries(item.farmer_payments)) {
                    payment_info += `<br><b>Farm Name:</b> ${key},  <b>Amount:</b> ${value}`
                }
                self.info.add({
                    key:"farmer_payments",
                    value:payment_info
                })
            }
            else {
                self.info.add({
                    key:key,
                    value:value
                })
            }
        }


        this.getRoot().show();
    }
}
