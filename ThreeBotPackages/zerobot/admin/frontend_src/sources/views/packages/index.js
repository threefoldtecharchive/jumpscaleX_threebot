import { JetView } from "webix-jet";

import { ErrorView } from "../errors/dialog";
import { packages } from "../../services/packages";

const pkgStatus = [
    {
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
                    id: 'method_selector',
                    options: ["Path", "Giturl"],
                    width: 100
                },
                //text area
                {
                    view: "text",
                    id: 'package_path',
                    inputAlign: "left",
                },
                //submit button
                {
                    view: "button",
                    id: "add_package_button",
                    value: "Add package",
                    autowidth: true,
                    type: "",
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
                scroll: "xy",
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
                },
                {
                    id: "author",
                    header: ["Author", {
                        content: "selectFilter"
                    }],
                    sort: "string",
                    width: 200
                }, {
                    id: "name",
                    header: ["Name", {
                        content: "textFilter"
                    }],
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

    showError(message) {
        this.errorView.showError(message);
    }

    handleResult(promise, callback) {
        this.packageTable.showProgress({ hide: false });

        promise.then((data) => {
            if (callback instanceof Function) {
                callback(data);
            }

            webix.message({
                type: "success",
                text: "The operation has beed done successfully"
            });
            this.packageTable.showProgress({ hide: true });
        }).catch(error => {
            this.showError("Error has happened during this operation: " + error.response, "Error");
            this.packageTable.showProgress({ hide: true });
        })
    }

    addPackage(path, gitUrl) {
        this.handleResult(packages.add(path, gitUrl));
    }


    deletePackage(packageName, elementID) {
        this.handleResult(packages.delete(packageName), () => {
            this.packageTable.remove(elementID)
        });
    }

    startPackage(packageName) {
        this.handleResult(packages.start(packageName));
    }

    stopPackage(packageName) {
        this.handleResult(packages.stop(packageName));

    }

    enablePackage(packageName) {
        this.handleResult(packages.enablePackage(packageName));
    }

    disablePackage(packageName) {
        this.handleResult(packages.disable(packageName));

    }

    init(view) {
        const self = this;

        self.errorView = this.ui(ErrorView);

        const menu = webix.ui({
            view: "contextmenu",
            id: "packages_cm"
        });

        this.packageTable = this.$$("packages_table");
        webix.extend(this.packageTable, webix.ProgressBar);

        function checkAction(action, selectedItemId) {
            if (self.packageTable.getItem(selectedItemId)) {
                let name = self.packageTable.getItem(selectedItemId).name
                let author = self.packageTable.getItem(selectedItemId).author
                let elementID = self.packageTable.getItem(selectedItemId).id
                let packageName = author + "." + name
                if (action == 'delete') {
                    //deletePackage(packageName)
                    // self.packageTable.remove(elementID)
                    //
                    webix.confirm({
                        title: "Delete Package",
                        ok: "Yes",
                        text: `Are you sure you want to delete ${author}.${name}?`,
                        cancel: "No",
                    }).then(() => {
                        self.deletePackage(packageName, elementID)
                    });
                    //
                } else if (action == 'start') {
                    self.startPackage(packageName)
                } else if (action == 'stop') {
                    self.stopPackage(packageName)
                } else if (action == 'disable') {
                    self.disablePackage(packageName)
                } else if (action == 'enable') {
                    self.enablePackage(packageName)
                }
            } else {
                webix.message("you have to select a package")
            }
        }

        $$("add_package_button").attachEvent("onItemClick", function (id) {
            let pacakgeLocation = $$("package_path").getValue()
            if (pacakgeLocation == "") {
                alert("please enter package location")
            } else {
                let packageMethod = $$("method_selector").getValue()
                let gitUrl = null;
                let path = null;
                if (packageMethod == "Giturl") {
                    gitUrl = pacakgeLocation
                } else if (packageMethod == "Path") {
                    path = pacakgeLocation
                } else {
                    alert("something went wrong during selecting the package method")
                }
                self.addPackage(path, gitUrl)
            }
        });

        $$("packages_cm").attachEvent("onMenuItemClick", function (id) {
            checkAction(id, self.packageTable.getSelectedId());
        });


        webix.event(self.packageTable.$view, "contextmenu", function (e /*MouseEvent*/) {
            var pos = self.packageTable.locate(e);
            var menudata = [];
            if (pos) {
                var item = self.packageTable.getItem(pos.row);
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
        function mapData(allitems) {
            return allitems.map(item => {
                return {
                    "name": item.source.name,
                    "author": item.source.threebot,
                    "path": item.path,
                    "status": pkgStatus[item.status].name
                }
            });
        }

        function addActions(menudata, pkgIndex) {
            for (var j = 0; j < pkgStatus[pkgIndex].actions.length; j++)
                menudata.push(pkgStatus[pkgIndex].actions[j]);
            return menudata

        }

        packages.list().then(data => {
            const allPackages = data.json().packages;
            self.packageTable.parse(mapData(allPackages));
        });


    }
}
