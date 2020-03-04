import { JetView } from "webix-jet";

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
            columns: [
                {
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
                    id: "vms",
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

    init() {
        this.table = $$("process_table");
    }
}
