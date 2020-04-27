import { JetView } from "webix-jet";

import { health } from "../../services/health";
import ProcessDetailsView from "./processDetails";

export default class processesListView extends JetView {
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
                        "Process",
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
            type: "space",
            rows: [
                {
                    template: "<div style='width:auto;text-align:center'><h3>Processes<h3/></div>",
                    height: 50
                },
                view
            ]
        }
    }

    killProcess(objects) {
        var self = this;

        let items = [],
            ids = [],
            indexes = [];

        for (let obj of objects) {
            ids.push(obj.id);
            let item = self.processTable.getItem(obj.id);
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

            health.killProcessesByPid(pids).then(() => {
                self.processTable.remove(ids)
                webix.message({ type: "success", text: "Processes killed successfully" });
            }).catch(error => {
                webix.message({ type: "error", text: "Could not kill process" });
            })
        });
    }

    init() {
        const self = this;
        self.processDetailsView = self.ui(ProcessDetailsView);

        self.processTable = this.$$("process_table");
        health.getRunningProcesses().then(data => {
            self.processTable.parse(data.json().processes_list);
        });

        webix.ui({
            view: "contextmenu",
            id: "process_cm",
            data: ["Kill"]
        }).attachTo(self.processTable);

        self.processTable.attachEvent("onItemDblClick", function () {
            let pid = self.processTable.getSelectedItem()["pid"]
            health.getProcessDetails(pid).then((data) =>{
                self.processDetailsView.showProcessDetails(data.json())
            }).catch(err => {
                webix.message({ type: "error", text: "Could not get process details" });
            })
        });

        $$("process_cm").attachEvent("onMenuItemClick", function (id) {
            if (id == "Kill") {
                self.killProcess(self.processTable.getSelectedId(true));
            }
        });
    }

}
