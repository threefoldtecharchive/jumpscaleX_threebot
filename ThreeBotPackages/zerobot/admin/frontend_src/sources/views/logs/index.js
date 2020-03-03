import { JetView } from "webix-jet";

import {
    json_ajax
} from "../../common";

import AppLogsView from "./appLogs";

export default class LogsView extends JetView {
    config() {

        const view = {
            rows: [{
                cols: [
                    {
                        view: "template",
                        type: "header", template: "Logs",
                    },
                    {
                        view: "combo",
                        id: "logs_apps",
                        placeholder: "Choose your application",
                        options: "/zerobot/admin/actors/logs/list_apps",
                        on: {
                            onChange: function (appname) {
                                console.log(appname);
                                this.$scope.showFor(appname)

                            }
                        }
                    }
                ],
            },
                AppLogsView
            ]
        };

        return view;
    }

    init(view) {
        // this.appLogs = this.ui(AppLogsView);
        // var self = this;
        self.apps_combo = $$("logs_apps");
    }

    showFor(appname) {
        this.appLogs = $$("applogs_table")
        this.app_logs_res = []
        var self = this;

        json_ajax.post("/zerobot/admin/actors/logs/list", { args: { appname: appname } }).then(function (data) {
            self.appLogs.clearAll()
            self.appLogs.parse(data.json()[0])

            // self.getRoot().show();
        });
    }
}
