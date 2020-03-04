import {
    JetView
} from "webix-jet";

import {
    ansiUp,
    dateFormatter,
    json_ajax,
} from "../../common";
import AlertView from "./alert";

const MAX_MSG_LEN = 100;

export default class AlertsView extends JetView {
    config() {
        const view = {
            rows: [
                {
                    view: "datatable",
                    id: "alerts_table",
                    resizeColumn: true,
                    select: true,
                    multiselect: true,
                    css: "webix_header_border webix_data_border",
                    columns: [{
                        id: "index",
                        header: "#",
                        sort: "int",
                        autowidth: true,
                    },
                    {
                        id: "alert_type",
                        header: "Type",
                        sort: "string"
                    },
                    {
                        id: "count",
                        header: "Count",
                        sort: "int"
                    },
                    {
                        id: "status",
                        header: "Status",
                        sort: "string"
                    },
                    {
                        id: "level",
                        header: "Level",
                        sort: "int"
                    },
                    {
                        id: "cat",
                        header: [
                            "Category",
                            {
                                content: "textFilter"
                            }
                        ],
                        sort: "string"
                    },
                    {
                        id: "time_first",
                        header: "First time",
                        sort: "date",
                        format: dateFormatter,
                        width: 200
                    },
                    {
                        id: "time_last",
                        header: "Last time",
                        sort: "date",
                        format: dateFormatter,
                        width: 200
                    },
                    {
                        id: "message",
                        header: [
                            "Message",
                            {
                                content: "textFilter"
                            },
                        ],
                        sort: "str",
                        fillspace: true,
                        format: function (value) {
                            if (value.length > MAX_MSG_LEN) {
                                value = value.substr(0, MAX_MSG_LEN) + '...';
                            }
                            return ansiUp.ansi_to_html(value);
                        }
                    },
                    ],
                    autoConfig: true,
                    // url:{
                    //     $proxy:true,
                    //     load: function(view, params){
                    //         let data = webix.ajax("/zerobot/alerta/actors/alerta/list_alerts");
                    //         return data;
                    //     },
                    // }
                    scheme: {
                        $init: function (obj) {
                            obj.index = this.count();
                        }
                    },
                },
                {
                    $subview: true,
                    popup: true
                }
            ]
        };

        return view;
    }

    deleteItem(objects) {
        var self = this;

        let items = [],
            ids = [],
            indexes = [];

        for (let obj of objects) {
            ids.push(obj.id);
            let item = self.table.getItem(obj.id);
            items.push(item)
            indexes.push(item.index);
        }

        webix.confirm({
            title: "Delete alerts",
            ok: "Yes",
            cancel: "No",
            text: `Delete alert item(s) of ${indexes.join(", ")}`
        }).then(() => {
            const identifiers = items.map((item) => item.identifier);
            self.table.showProgress({
                hide: false
            })
            json_ajax.post("/zerobot/alerta/actors/alerta/delete_alerts", {
                args: {
                    identifiers: identifiers
                }
            }).then(() => {
                self.table.remove(ids)
                self.table.showProgress({
                    hide: true
                })
            });
        });
    }

    viewItem(id) {
        this.alertView.showFor(this.table.getItem(id));
    }

    init(view) {
        // this.use(plugins.ProgressBar, "progress");
        var self = this;
        self.table = $$("alerts_table");
        self.alertView = self.ui(AlertView);

        webix.extend(self.table, webix.ProgressBar);
        webix.ready(function () {
            self.table.clearAll();
            self.table.showProgress({
                hide: false
            });
            webix.ajax().get("/zerobot/alerta/actors/alerta/list_alerts", function (data) {
                let alerts = JSON.parse(data).alerts;
                self.table.parse(alerts);
            });
        });

        webix.ui({
            view: "contextmenu",
            id: "alerts_cm",
            data: ["View", "Delete"]
        }).attachTo(self.table);


        self.table.attachEvent("onItemDblClick", function () {
            self.viewItem(self.table.getSelectedId());
        });

        $$("alerts_cm").attachEvent("onMenuItemClick", function (id) {
            if (id == "Delete") {
                self.deleteItem(self.table.getSelectedId(true));
            } else if (id == "View") {
                self.viewItem(self.table.getSelectedId());
            }
        });
    }
}
