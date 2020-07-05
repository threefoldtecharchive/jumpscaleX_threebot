import { JetView } from "webix-jet";
import * as jsPDF from 'jspdf'

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
                        },
                        {
                            view: "button",
                            value: "Export",
                            css: "webix_primary",
                            click: function (){
                            this.$scope.exportItem()
                        }
                            }
                        ]
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
        self.itemObj = item
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

    exportItem() {
        var self = this;
        let item = self.itemObj
        webix.confirm({
            title: "Export invoice",
            ok: "Yes",
            cancel: "No",
            text: `Export invoice ${item.id}`
        }).then(() => {
                let filename = `invoice_${item.id}.pdf`
                let text = ``
                let payment_info = ""
                for (let [key, value] of Object.entries(item.farmer_payments)) {
                    payment_info += `\n\t\t- Farm Name: ${key},  Amount: ${value}\n`
                }
                for (let [key, value] of Object.entries(item)) {
                    text = `

\tPayment: ${item.id}

\tReservation ID: ${item.rid}

\tExplorer: ${item.explorer}

\tCurrency: ${item.currency}

\tTotal Amount: ${item.total_amount}

\tTransaction Fees: ${item.transaction_fees}

\tPayment Source: ${item.payment_source}

\tFarmer Payments:
${payment_info}
\tEscrow Address: ${item.escrow_address}

\tEscrow Asset: ${item.escrow_asset}

\tTime: ${item.time.toString()}
`
                }
            const specialElementHandlers = {
              '#editor': function (element, renderer) {
                return true;
              }
            };
            var doc = new jsPDF('landscape');
            doc.text(text, 1, 1);
            doc.save(filename)

        });
    }
}
