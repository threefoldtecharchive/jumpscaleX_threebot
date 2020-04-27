import { JetView } from "webix-jet";

import { health } from "../../services/health";

export default class runningPortsView extends JetView {
    config() {
        const ports = {
            id: "runningPorts",
            view: "datatable",
            responsive: true,
            autoConfig: true,
            type: {
                height: 200,
            },
            template: "Running Ports",
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
                id: "port_number",
                header: ["Port Number", {
                    content: "textFilter"
                },],
                sort: "string"
            }, {
                id: "process",
                header: ["Process", {
                    content: "textFilter"
                }],
                sort: "string"
            }
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
                    template: "<div style='width:auto;text-align:center'><h3>Ports<h3/></div>",
                    height: 50
                },
                ports
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
            let item = self.portsTable.getItem(obj.id);
            items.push(item)
            indexes.push(item.index);
        }

        webix.confirm({
            title: "Kill processes",
            ok: "Yes",
            cancel: "No",
            text: `Kill processes with row ids ${indexes.join(", ")}`
        }).then(() => {

            const ports = items.map((item) => item.port_number);
            
            health.killProcessesByPort(ports).then(() => {
                self.portsTable.remove(ids)
                webix.message({ type: "success", text: "Processes killed successfully" });
            }).catch(error => {
                webix.message({ type: "error", text: "Could not kill process" });
            })
        });
    }

    init() {
        const self = this;

        self.portsTable = this.$$("runningPorts");
        health.getRunningPorts().then(data => {
            self.portsTable.parse(data.json());
        });

        webix.ui({
            view: "contextmenu",
            id: "port_cm",
            data: ["Kill"]
        }).attachTo(self.portsTable);

        $$("port_cm").attachEvent("onMenuItemClick", function (id) {
            if (id == "Kill") {
                self.killProcess(self.portsTable.getSelectedId(true));
            }
        });
    }

}
