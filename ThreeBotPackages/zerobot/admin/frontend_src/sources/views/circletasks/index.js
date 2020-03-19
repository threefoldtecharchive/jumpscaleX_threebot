import { JetView } from "webix-jet";

import { ErrorView } from "../errors/dialog";
import { taiga } from "../../services/taiga";

export default class CirclesTasksView extends JetView {
    config() {
        const grid = {
            rows: [{
                //Header
                view: "template",
                type: "header",
                template: "CirclesTasks",
            },
            { //DataTable
                view: "datatable",
                id: "circlestasks_table",
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
                    id: "ID",
                    header: "ID",
                    sort: "int",
                    autowidth: true,
                },
                {
                    id: "Project",
                    header: ["Project", {
                        content: "textFilter"
                    }],
                    sort: "string",
                    width: 300
                }, {
                    id: "Subject",
                    header: "Subject",
                    sort: "string",
                    width: 800
                },
                {
                    id: "Milestone",
                    header: "Milestone",
                    sort: "string",
                    width: 200,
                },
                {
                    id: "Status",
                    header: "Status",
                    sort: "string",
                    width: 300,
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

    init(view) {
        const self = this;

        self.errorView = this.ui(ErrorView);

        const menu = webix.ui({
            view: "contextmenu",
            id: "circlestasks_cm"
        });

        this.tasksTable = this.$$("circlestasks_table");
        webix.extend(this.tasksTable, webix.ProgressBar);

        taiga.userTasks(36).then(data => {
            const circles = data.json();
            self.tasksTable.parse(circles);
        });

        webix.ajax().get("/auth/authenticated", function (data) {
            const info = JSON.parse(data);
            const username = info.username.replace(".3bot", "")
            taiga.userTasks(username).then(data => {
                const tasks = data.json();
                self.tasksTable.parse(tasks);
            });
        });


    }
}
