import { JetView } from "webix-jet";

import { ErrorView } from "../errors/dialog";
import { solutions } from "../../services/deployedSolutions";

import ReservationView from "./reservation";

const UNKNOWN_STATUS = 'Unknown';


export default class DeployedSolutionsView extends JetView {
    config() {
        const grid = {
            rows: [{
                //Header
                view: "template",
                type: "header",
                template: "Deployed Solutions",
            },
            { //DataTable
                view: "datatable",
                id: "solutions_table",
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
                }, {
                    id: "solutionName",
                    header: ["Solution Name", {
                        content: "textFilter"
                    }],
                    sort: "string",
                    width: 200
                }, {
                    id: "resvId",
                    header: ["Reservation Id", {
                        content: "textFilter"
                    }],
                    sort: "string",
                    width: 200
                },
                {
                    id: "solutionType",
                    header: ["Solution Type", {
                        content: "selectFilter"
                    }],
                    sort: "string",
                    width: 200
                },
                {
                    id: "nextAction",
                    header: ["Next action", {
                        content: "selectFilter"
                    }],
                    sort: "string",
                    width: 200
                }
                ],
                scheme: {
                    $init: function (obj) {
                        obj.solutionName = obj.name;
                        obj.resvId = obj.reservation.id;
                        obj.solutionType = obj.type;
                        obj.nextAction = obj.reservation.next_action;
                        obj.index = this.count();
                    }
                },
                on: {
                    onAfterLoad: function () {
                        if (!this.count())
                            this.showOverlay("Sorry, there is no data");
                        else
                            this.hideOverlay();
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
        this.solutionsTable.showProgress({ hide: false });

        promise.then((data) => {
            const solutionItem = data.json().solution;
            if (callback instanceof Function) {
                callback(solutionItem);
            }

            webix.message({
                type: "success",
                text: "The operation has beed done successfully"
            });

            this.solutionsTable.showProgress({ hide: true });
        }).catch(error => {
            this.showError("Error has happened during this operation: " + error.response, "Error");
            this.solutionsTable.showProgress({ hide: true });
        })
    }

    deleteSolution(solutionType, solutionName, itemId) {
        this.handleResult(solutions.delete(solutionType, solutionName), () => {
            this.solutionsTable.remove(itemId)
        });

    }

    loadSolutions() {
        solutions.list().then(data => {
            let solutions = data.json().solutions
            for (let i = 0; i < solutions.length; i++) {
                solutions[i].reservation = JSON.parse(solutions[i].reservation)
                solutions[i].form_info = JSON.parse(solutions[i].form_info)

            }
            this.solutionsTable.parse(solutions);
        });
    }

    viewItem(id) {
        this.reservationView.showFor(this.solutionsTable.getItem(id));
    }

    init(view) {
        const self = this;

        self.errorView = this.ui(ErrorView);
        self.reservationView = self.ui(ReservationView);

        const menu = webix.ui({
            view: "contextmenu",
            id: "solutions_cm"
        });

        this.solutionsTable = this.$$("solutions_table");
        self.loadSolutions();
        webix.extend(this.solutionsTable, webix.ProgressBar);

        function checkAction(action, selectedItemId) {
            const item = self.solutionsTable.getItem(selectedItemId);
            if (item) {
                let itemId = item.id;
                let solutionName = item.solutionName;
                let solutionType = item.solutionType;
                let nextAction = item.reservation.next_action

                if (action == 'delete') {
                    webix.confirm({
                        title: "Cancel Solution",
                        ok: "Yes",
                        text: `Are you sure you want to cancel ${solutionName}?`,
                        cancel: "No",
                    }).then(() => {
                        self.deleteSolution(solutionType, solutionName, itemId)
                    });
                }
            } else {
                webix.message("You need to select a solution")
            }
        }

        $$("solutions_cm").attachEvent("onMenuItemClick", function (id) {
            checkAction(id, self.solutionsTable.getSelectedId());
        });

        self.solutionsTable.attachEvent("onItemDblClick", function () {
            self.viewItem(self.solutionsTable.getSelectedId());
        });

        webix.event(self.solutionsTable.$view, "contextmenu", function (e /*MouseEvent*/) {
            const pos = self.solutionsTable.locate(e);
            if (pos) {
                const item = self.solutionsTable.getItem(pos.row);
                const actions = ['delete'];

                menu.clearAll();
                menu.parse(actions);
                menu.show(e);
            }
            return webix.html.preventEvent(e);
        })

    }
}
