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
                        id: "apps_combo",
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
        view.appsCombo = $$("apps_combo");
        logs.listApps().then(data => {
            view.appsCombo.define("options", data.json());
            view.appsCombo.render();
        });

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

        logs.list(appName, logId).then(data => {
            self.appLogs.clearAll()
            self.appLogs.parse(data.json()[0])
            self.appLogs.showProgress({ hide: true });
        });
    }
}
