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

    init() {
        const self = this;

        self.portsTable = this.$$("runningPorts");
        health.getRunningPorts().then(data => {
            self.portsTable.parse(data.json());
        });
    }

}
