import {
    JetView
} from "webix-jet";
import {
    json_ajax
} from "../../common";

export default class PackagesView extends JetView {
    config() {
        const grid = {
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
                    onContext: {},
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
        return grid;
    }
    init(view) {
        var self = this;

        this.package_table = this.$$("packages_table");
        // TODO: check how can i change the data in the context related to every row in the table
        var pkgStatus = [{
                name: "Init",
                actions: ["delete"]
            },
            {
                name: "Installed",
                actions: ['delete', "start"]
            },
            {
                name: "Running",
                actions: ['delete', "stop"]
            },
            {
                name: "Halted",
                actions: ['delete', "start", "disable"]
            },
            {
                name: "Disabled",
                actions: ['delete', "enable"]
            },
            {
                name: "Error",
                actions: ["delete"]
            }
        ]
        var menu = webix.ui({
            view: "contextmenu",
            on: {
                onMenuItemClick: function (id) {
                    var item = this.getMenuItem(id);

                    console.log("event firing")
                    console.log(item)
                    console.log(id)
                    webix.message(JSON.stringify(item));
                }
            }
        });
        webix.event(self.package_table.$view, "contextmenu", function (e /*MouseEvent*/ ) {
            var pos = self.package_table.locate(e);
            var menudata = [];
            if (pos) {
                var item = self.package_table.getItem(pos.row);
                for (var i = 0; i < pkgStatus.length; i++) {
                    if (pkgStatus[i].name == item.status) {
                        menudata = addActions(menudata, i)
                    }

                }
            }
            menu.clearAll();
            menu.parse(menudata);
            menu.show(e);
            return webix.html.preventEvent(e);
        })

        /////////////////////////////////////////


        // Helper functions

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

        function addActions(menudata, pkgIndex) {
            for (var j = 0; j < pkgStatus[pkgIndex].actions.length; j++)
                menudata.push(pkgStatus[pkgIndex].actions[j]);
            return menudata

        }
        webix.ajax().get("/zerobot/packagemanager/actors/package_manager/packages_list", function (data) {
            let packages_json = JSON.parse(data).packages;
            let package_data = mapData(packages_json)
            self.package_table.parse(package_data);
        });
    }
}