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
                            onChange: function (appName) {
                                this.$scope.showFor(appName)

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

    urlChange(view, url) {
        const appName = url[0].params.appname, logId = url[0].params.logid;
        if (appName) {
            this.showFor(appName, logId);
        }
    }

    showFor(appName, logId) {
        var self = this;
        self.appLogs = $$("applogs_table");
        webix.extend(self.appLogs, webix.ProgressBar);
        self.appLogs.showProgress({ hide: false });

        json_ajax.post("/zerobot/admin/actors/logs/list", { args: { appname: appName, id_from: logId } }).then(function (data) {
            self.appLogs.clearAll()
            self.appLogs.parse(data.json()[0])
            self.appLogs.showProgress({ hide: true });
        });
    }
}
