

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

    init(view) {
        // this.use(plugins.ProgressBar, "progress");
        const table = $$("alerts_table");
        webix.extend(table, webix.ProgressBar);
        webix.ready(function () {
            table.clearAll();
            table.showProgress({ hide: false });
            webix.ajax().get("/zerobot/alerta/actors/alerta/list_alerts", function (data) {
                let alerts = JSON.parse(data).alerts;
                $$('alerts_table').parse(alerts);
            });
        });

        webix.ui({
            view: "contextmenu", id: "alerts_cm",
            data: ["View", "Delete"]
        }).attachTo(table);


        $$("alerts_cm").attachEvent("onMenuItemClick", function (id) {
            var menu = this.getMenu(id);
            if (menu == "View") {

            }

            if (menu == "Delete") {
                let item = table.getSelectedItem();
                debugger;
            }
        });
    }
}
