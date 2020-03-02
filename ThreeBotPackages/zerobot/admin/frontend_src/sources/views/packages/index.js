import {
    JetView
} from "webix-jet";
import {
    json_ajax
} from "../../common";

export default class PackagesView extends JetView {
    config() {
        const view = {
            rows: [{
                    //Header
                    view: "template",
                    type: "header",
                    template: "Packages",
                },
                { //adding Package
                    cols: [{
                            //selector
                            view: "select",
                            options: ["Path", "Giturl"],
                        },
                        //text area
                        {
                            view: "text",
                            inputAlign: "left",
                        },
                        //submit button
                        {
                            view: "button",
                            id: "my_button",
                            value: "Add package",
                            autowidth: true,
                            type: ""
                        }
                    ]
                },
                { //DataTable
                    view: "datatable",
                    id: "packages_table",
                    resizeColumn: true,
                    type: {
                        height: 200,
                    },
                    select: true,
                    multiselect: true,
                    css: "webix_header_border webix_data_border",
                    scroll: true,
                    autoConfig: true,
                    view: "datatable",
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
                        }, {
                            id: "name",
                            header: "Name",
                            sort: "string"
                        },
                        {
                            id: "status",
                            header: "Status",
                            sort: "string"
                        }, {
                            id: "path",
                            header: "Path",
                            sort: "string",
                        }
                    ],
                    scheme: {
                        $init: function (obj) {
                            obj.index = this.count();
                        }
                    }
                }
            ]
        };
        return view;
    }
    init(view) {
        var self = this;

        this.package_table = this.$$("packages_table");
        // TODO: check how can i change the data in the context related to every row in the table
        webix.ui({
            view: "contextmenu",
            id: "packages_cm",
            data: ["View", "Delete"]
        }).attachTo(self.package_table);

        const pkgStatus = {
            0: {
                name: "Init",
                actions: ["delete"]
            },
            1: {
                name: "Installed",
                actions: ['delete', "start"]
            },
            2: {
                name: "Running",
                actions: ['delete', "stop"]
            },
            3: {
                name: "Halted",
                actions: ['delete', "start", "disable"]
            },
            4: {
                name: "Disabled",
                actions: ['delete', "enable"]
            },
            5: {
                name: "Error",
                actions: ["delete"]
            }
        }

        // Mapping the data to the right format to be able to diplay the actual status
        function mapData(packages_json) {
            let package_data = []
            for (var i = 0; i < packages_json.length; i++) {
                let tmp = {
                    "name": packages_json[i].name,
                    "path": packages_json[i].path,
                    "status": pkgStatus[packages_json[i].status].name
                }
                package_data.push(tmp)

            }
            return package_data
        }

        webix.ajax().get("/zerobot/packagemanager/actors/package_manager/packages_list", function (data) {
            let packages_json = JSON.parse(data).packages;

            let package_data = mapData(packages_json)
            console.log(package_data)
            self.package_table.parse(package_data);
        });
    }
}