import { JetView } from "webix-jet";

import { ErrorView } from "../errors/dialog";
import { taiga } from "../../services/taiga";

export default class CirclestoriesView extends JetView {
    config() {
        const grid = {
            rows: [{
                //Header
                view: "template",
                type: "header",
                template: "CirclesStories",
            },
            { //DataTable
                view: "datatable",
                id: "circlestories_table",
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
                    width: 700
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
                    width: 200,
                },
                {
                    id: "Due date",
                    header: "Due date",
                    sort: "string",
                    width: 200,
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
            id: "circlestories_cm"
        });

        this.storiesTable = this.$$("circlestories_table");
        webix.extend(this.storiesTable, webix.ProgressBar);

        webix.ajax().get("/auth/authenticated", function (data) {
            const info = JSON.parse(data);
            const username = info.username.replace(".3bot", "")
            taiga.userStories(username).then(data => {
                const stories = data.json();
                self.storiesTable.parse(stories);
            });
        });


    }
}
