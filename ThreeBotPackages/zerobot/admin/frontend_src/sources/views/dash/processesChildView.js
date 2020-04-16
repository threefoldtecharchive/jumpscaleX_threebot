import {
    JetView
} from "webix-jet";

import ProcessDetailsView from "./processesDetails";
import { health } from "../../services/health";

export default class ProcessesChildView extends JetView {

    config() {
        const view = {
            view: "datatable",
            id: "process_table",
            resizeColumn: true,
            select: true,
            multiselect: true,
            css: "webix_header_border webix_data_border",
            scroll: true,
            autoConfig: true,
            columns: [{
                    id: "index",
                    header: "#",
                    sort: "int",
                    autowidth: true,
                },
                {
                    id: "name",
                    header: [
                        "Proccess",
                        {
                            content: "textFilter"
                        },
                    ],
                    sort: "string",
                },
                {
                    id: "pid",
                    header: "PID",
                    sort: "int"
                },
                {
                    id: "username",
                    header: "Username",
                    sort: "string"
                },
                {
                    id: "rss",
                    header: "Memory Usage",
                    sort: "int",
                    format: function (value) {
                        return Math.ceil(value)
                    }
                },
            ],
            scheme: {
                $init: function (obj) {
                    obj.index = this.count();
                }
            },
        }

        return {
            view: "window",
            head: "Running Processes, Memory usage in MB",
            modal: true,
            width: 550,
            height: 600,
            position: "center",
            body: {
                rows: [
                    view,
                    {
                        view: "button",
                        value: "OK",
                        css: "webix_primary",
                        click: function () {
                            this.getTopParentView().hide();
                        }
                    }
                ]
            }

        }
    }

    showFor(data) {
        this.table.parse(data)
        this.getRoot().show();
    }

    killProcess(objects) {
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
            title: "Kill processes",
            ok: "Yes",
            cancel: "No",
            text: `Kill processes with row ids ${indexes.join(", ")}`
        }).then(() => {

            const pids = items.map((item) => item.pid);

            health.kill_processes_by_pid(pids).then(() => {
                self.table.remove(ids)
                webix.message({ type: "success", text: "Processes killed successfully" });
            }).catch(error => {
                webix.message({ type: "error", text: "Could not kill process" });
            })
        });
    }

    init() {
        var self = this;

        self.table = $$("process_table");
        self.processDetailsView = self.ui(ProcessDetailsView);

        webix.ui({
            view: "contextmenu",
            id: "process_cm",
            data: ["Kill"]
        }).attachTo(self.table);

        self.table.attachEvent("onItemDblClick", function () {
            self.processDetailsView.showProcessDetails(self.table.getSelectedItem())
        });

        $$("process_cm").attachEvent("onMenuItemClick", function (id) {
            if (id == "Kill") {
                self.killProcess(self.table.getSelectedId(true));
            }
        });
    }
}