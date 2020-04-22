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
                        align:"right",
                        on: {
                            onChange: function (appName) {
                                this.$scope.show(`/main/logs`)
                                this.$scope.showFor(appName)
                            }
                        }
                    },
                    {
                        view:"button", 
                        id:"btn_delete", 
                        value:"Delete", 
                        css:"webix_danger", 
                        inputWidth:120,
                        click: function (){
                            this.$scope.delete()
                        }
                    },
                    {
                        view:"button", 
                        id:"btn_delete_all", 
                        value:"Delete All", 
                        css:"webix_danger", 
                        align:'right',
                        inputWidth:100,
                        click: function (){
                            this.$scope.delete_all()
                        }
                    },
                    { width:20 }
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

        // webix.ui({
        //     view: "contextmenu",
        //     id: "logs_cm",
        //     data: ["Kill"]
        // }).attachTo(self.appLogs);

        webix.extend(self.appLogs, webix.ProgressBar);
        self.appLogs.showProgress({ hide: false });

        logs.list(appName, logId).then(data => {
            self.appLogs.clearAll()
            self.appLogs.parse(data.json()[0])
            self.appLogs.showProgress({ hide: true });
        });

        // $$("logs_cm").attachEvent("onMenuItemClick", function (id) {
        //     if (id == "Kill") {
        //         self.deleteSelected(self.appLogs.getSelectedId(true));
        //     }
        // });
    }

    delete(){
        let appname = $$("apps_combo").getValue();
        if(appname){
            webix.confirm({
                title: "Delete logs",
                ok: "Delete",
                cancel: "No",
                text: `Delete ${appname} logs?`
            }).then(() => {
                logs.delete(appname).then(() => {
                    this.refresh();
                    webix.message({ type: "success", text: `${appname} logs deleted successfully` });
                }).catch(error => {
                    webix.message({ type: "error", text: "Could not delete logs" });
                })
            });
        }else{
            webix.message({ type: "error", text: "Please select app for delete" });
        }
    }

    delete_all(){
        webix.confirm({
            title: "Delete all logs",
            ok: "Delete",
            cancel: "No",
            text: `Delete all logs?`
        }).then(() => {
            logs.deleteAll().then(() => {
                this.refresh();
                webix.message({ type: "success", text: `All logs deleted successfully` });
            }).catch(error => {
                webix.message({ type: "error", text: "Could not delete logs" });
            })
        });
    }
}
