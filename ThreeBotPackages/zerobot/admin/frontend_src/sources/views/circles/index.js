import { JetView } from "webix-jet";

import { ErrorView } from "../errors/dialog";
import { taiga } from "../../services/taiga";

export default class CirclesView extends JetView {
    config() {
        const grid = {
            rows: [{
                //Header
                view: "template",
                type: "header",
                template: "Circles",
            },
            { //DataTable
                view: "datatable",
                id: "circles_table",
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
                    id: "Name",
                    header: "Name",
                    sort: "string",
                    width: 200
                }, {
                    id: "Owner",
                    header: ["Owner", {
                        content: "textFilter"
                    }],
                    sort: "string",
                    width: 200
                },
                {
                    id: "Description",
                    header: "Description",
                    sort: "string",
                    width: 1300,
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
            id: "circles_cm"
        });

        this.circleTable = this.$$("circles_table");
        webix.extend(this.circleTable, webix.ProgressBar);


        webix.ajax().get("/auth/authenticated", function (data) {
            const info = JSON.parse(data);
            const username = info.username.replace(".3bot", "")
            taiga.userCircles(username).then(data => {
                const circles = data.json();
                self.circleTable.parse(circles);
            });
        });


    }
}
