import { JetView } from "webix-jet";

import { ansiUp } from "../../common/colors";
import { dateFormatter } from "../../common/formatters";
import { invoices } from "../../services/invoices";

import InvoiceView from "./invoices";
import * as jsPDF from 'jspdf'


export default class InvoicesView extends JetView {
    config() {
        const view = {
            rows: [
                {
                    view: "datatable",
                    id: "invoices_table",
                    resizeColumn: true,
                    select: true,
                    multiselect: true,
                    scroll: "xy",
                    css: "webix_header_border webix_data_border",
                    columns: [{
                        id: "index",
                        header: "#",
                        sort: "int",
                        autowidth: true,
                    },
                    {
                        id: "id",
                        header: "Payment ID",
                        sort: "int",
                        autowidth: true,
                    },
                    {
                        id: "currency",
                        header: "Currency",
                        sort: "string",
                        autowidth: true,
                    },
                    {
                        id: "rid",
                        header: "Reservation ID",
                        sort: "string",
                    },
                    {
                        id: "payment_source",
                        header: "Payment Source",
                        sort: "string",
                        autowidth: true,
                    },
                    {
                        id: "time",
                        header: "Time",
                        sort: "date",
                        autowidth: true,
                        fillspace:1,
                    },
                    {
                        id: "total_amount",
                        header: "Total Amount",
                        sort: "int",
                        autowidth: true,
                    },
                    {
                        id: "transaction_fees",
                        header: "Transaction Fees",
                        sort: "int",
                        autowidth: true,
                    },
                    {
                        id: "escrow_address",
                        header: "Escrow Address",
                        sort: "string",
                        autowidth: true,
                        fillspace:1,
                    },
                    {
                        id: "escrow_asset",
                        header: "Escrow Asset",
                        sort: "string",
                        autowidth: true,
                        fillspace:1,
                    }
                    ],
                    autoConfig: true,
                    scheme: {
                        $init: function (obj) {
                            obj.index = this.count();
                            var d = new Date(0);
                            d.setUTCSeconds(obj.time);
                            obj.time = d
                        }
                    },
                }
            ]
        };

        return view;
    }


    exportItem(objects) {
        var self = this;

        let items = []
        let indexes = []

        if (Array.isArray(objects)) {
            for (let obj of objects) {
                let item = self.table.getItem(obj.id);
                items.push(item)
                indexes.push(item.index);
            }
        } else {
            let item = self.table.getItem(objects.id);
            items.push(item)
            indexes.push(item.index);
        }

        webix.confirm({
            title: "Export invoices",
            ok: "Yes",
            cancel: "No",
            text: `Export invoice(s) of ${indexes.join(", ")}`
        }).then(() => {
            var d = new Date();
            let filename = `invoices_export_${d.toString()}.pdf`
            let text = ``
            for (let item of items) {
                for (let [key, value] of Object.entries(item)) {
                    if (key == "index") {
                        continue
                    }
                    if (key == "farmer_payments") {
                        let payment_info = ""
                        for (let [key, value] of Object.entries(item.farmer_payments)) {
                            payment_info += `\nFarm Name: ${key},  Amount: ${value}\n`
                        }
                        text += payment_info
                    } else if (key == "time") {
                        text += `\n${key}: ${value.toString()}\n`
                    } else {
                        text += `\n${key}: ${value}\n`
                    }
                }

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

    init() {
        // this.use(plugins.ProgressBar, "progress");
        var self = this;
        self.table = $$("invoices_table");
         self.invoiceView = self.ui(InvoiceView)

        webix.extend(self.table, webix.ProgressBar);
        webix.ready(function () {
            self.table.clearAll();
            self.table.showProgress({
                hide: false
            });
            invoices.list().then(data => {
                let invoices = data.json().payments;
                self.table.parse(invoices);
            });
        });

        webix.ui({
            view: "contextmenu",
            id: "invoices_cm",
            data: ["View", "Export"]
        }).attachTo(self.table);


        self.table.attachEvent("onItemDblClick", function () {
            let item = self.table.getSelectedItem()
                self.invoiceView.viewItem(item);
        });

        $$("invoices_cm").attachEvent("onMenuItemClick", function (id) {
            if (id == "Export") {
                self.exportItem(self.table.getSelectedId());
            } else if (id == "View") {
                let item = self.table.getSelectedItem()
                self.invoiceView.viewItem(item);
            }
        });
    }
}
