import { JetView } from "webix-jet";

import AppLogsView from "./appLogs";
import { logs } from "../../services/logs";

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

        self.appsComob = $$("apps_combo");
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

        logs.listApps().then(data => {
            this.appsComob.config.options = data;
            this.appsComob.refresh();
        });

        webix.extend(self.appLogs, webix.ProgressBar);
        self.appLogs.showProgress({ hide: false });

        logs.list(appName, logId).then(data => {
            self.appLogs.clearAll()
            self.appLogs.parse(data.json()[0])
            self.appLogs.showProgress({ hide: true });
        });
    }
}
