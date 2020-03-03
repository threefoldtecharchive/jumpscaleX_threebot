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
                    scroll: true,
                    autoConfig: true,
                    view: "datatable",
                    select: true,
                    css: "webix_header_border webix_data_border",
                    onContext: {},
                    columns: [{
                            id: "index",
                            header: "#",
                            sort: "int",
                            autowidth: true,
                        }, {
                            id: "name",
                            header: "Name",
                            sort: "string",
                            width: 200
                        },
                        {
                            id: "status",
                            header: "Status",
                            sort: "string"
                        }, {
                            id: "path",
                            header: "Path",
                            sort: "string",
                            width: 700
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
            id: "packages_cm"
        });
        //

        function checkAction(action, selected_item_id) {
            if (self.package_table.getItem(selected_item_id)) {
                let packageName = self.package_table.getItem(selected_item_id).name
                console.log(packageName)
                if (action == 'delete') {
                    deletePackage(packageName)
                } else if (action == 'start') {
                    startPackage(packageName)
                } else if (action == 'stop') {
                    stopPackage(packageName)
                } else if (action == 'disable') {
                    disablePackage(packageName)
                } else if (action == 'enable') {
                    enablePackage(packageName)
                } else {
                    console.log("something wrong")
                }
            } else {
                alert("you have to select a process")
            }
        }
        $$("packages_cm").attachEvent("onMenuItemClick", function (id) {
            console.log("new event fired")

            checkAction(id, self.package_table.getSelectedId());
        });
        //
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
        // API calls
        webix.ajax().get("/zerobot/packagemanager/actors/package_manager/packages_list", function (data) {
            let packages_json = JSON.parse(data).packages;
            let package_data = mapData(packages_json)
            self.package_table.parse(package_data);
        });

        function deletePackage(packageName) {
            let path = "/zerobot/packagemanager/actors/package_manager/package_delete";

            json_ajax.post(path, {
                args: {
                    name: packageName
                }
            }).then(function (data) {
                console.log(data)
            });
        }

        function startPackage(packageName) {
            let path = "/zerobot/packagemanager/actors/package_manager/package_start";
            json_ajax.post(path, {
                args: {
                    name: packageName
                }
            }).then(function (data) {
                console.log(data)
            });
        }

        function stopPackage(packageName) {
            let path = "/zerobot/packagemanager/actors/package_manager/package_stop";
            json_ajax.post(path, {
                args: {
                    name: packageName
                }
            }).then(function (data) {
                console.log(data)
            });
        }

        function disablePackage(packageName) {
            let path = "/zerobot/packagemanager/actors/package_manager/package_disable";
            json_ajax.post(path, {
                args: {
                    name: packageName
                }
            }).then(function (data) {
                console.log(data)
            });
        }

        function enablePackage(packageName) {
            let path = "/zerobot/packagemanager/actors/package_manager/package_enable";
            json_ajax.post(path, {
                args: {
                    name: packageName
                }
            }).then(function (data) {
                console.log(data)
            });
        }
    }
}