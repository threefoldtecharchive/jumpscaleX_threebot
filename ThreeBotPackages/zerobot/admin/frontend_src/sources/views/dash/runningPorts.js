import {
    JetView
} from "webix-jet";

export default class runningPortsView extends JetView {
    config() {
        const running_ports = {
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
                header: "Port Number",
                sort: "string"
            }, {
                id: "process",
                header: "Process",
                sort: "string"
            }], scheme: {
                $init: function (obj) {
                    obj.index = this.count();
                }
            },
        }

        // return running_ports
        return {
            type: "space",
            rows: [
                {
                    template: "<div style='width:auto;text-align:center'><h3>Running Ports<h3/></div>",
                    height: 50
                }, running_ports]
        }
    }
    init(view) {
        var self = this;

        this.running_ports = this.$$("runningPorts");

        webix.ajax().get("/zerobot/admin/actors/health/get_running_ports", function (data) {
            console.log(data)
            // let data = JSON.parse(data);
            self.running_ports.parse(data);
        });
    }

}
