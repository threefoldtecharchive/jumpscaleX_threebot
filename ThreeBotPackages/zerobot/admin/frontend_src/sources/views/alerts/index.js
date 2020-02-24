

import { JetView, plugins } from "webix-jet";
import AnsiUp from "ansi_up";

export default class AlertsView extends JetView {
    config() {

        const ansiUp = new AnsiUp();

        const view = {
            rows: [
                {
                    view: "template",
                    type: "header", template: "ِAlerts",
                },
                {
                    view: "datatable",
                    id: "alerts_table",
                    resizeColumn: true,
                    select: true,
                    multiselect: true,
                    columns: [
                        {
                            id: "index",
                            header: "#",
                            sort: "int",
                            autowidth: true,
                        },
                        { id: "alert_type", header: "Type", sort: "string" },
                        { id: "status", header: "Status", sort: "string" },
                        { id: "level", header: "Level", sort: "int" },
                        {
                            id: "cat",
                            header: [
                                { content: "textFilter" },
                                "Category"
                            ],
                            sort: "string"
                        },
                        { id: "time_first", header: "First time", sort: "date", format: webix.Date.dateToStr("%Y-%m-%d %H %G:%i:%s"), width: 200 },
                        { id: "time_last", header: "Last time", sort: "date", format: webix.Date.dateToStr("%Y-%m-%d %G:%i:%s"), width: 200 },
                        {
                            id: "message", header: [{ content: "textFilter" }, "Message"], sort: "str", fillspace: true, format: function (value) {
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
                        $init: function (obj) { obj.index = this.count(); }
                    },
                }
            ]
        };

        return view;
    }

    deleteItem(id) {
        // TODO: handle multiple selection deletes
        var self = this;

        webix.confirm({
            title: "Delete alert",
            ok: "Yes",
            cancel: "No",
            text: `Delete alert item of ${id}`
        }).then(function (result) {
            const item = self.table.getItem(id);
            webix.ajax().post("/zerobot/alerta/actors/alerta/delete_alert", {
                args: {
                    identifier: item.identifier
                }
            }).then((result) => {
                self.table.remove(id);
            });
        });
    }
    init(view) {
        // this.use(plugins.ProgressBar, "progress");
        var self = this;
        self.table = $$("alerts_table");

        webix.extend(self.table, webix.ProgressBar);
        webix.ready(function () {
            self.table.clearAll();
            self.table.showProgress({ hide: false });
            webix.ajax().get("/zerobot/alerta/actors/alerta/list_alerts", function (data) {
                let alerts = JSON.parse(data).alerts;
                self.table.parse(alerts);
            });
        });

        webix.ui({
            view: "contextmenu", id: "alerts_cm",
            data: ["View", "Delete"]
        }).attachTo(self.table);


        $$("alerts_cm").attachEvent("onMenuItemClick", function (id) {
            if (id == "Delete") {
                const id = self.table.getSelectedId();
                self.deleteItem(id);
            }
        });
    }
}
