import { ansiUp } from "../../common";
import { JetView } from "webix-jet";

const MAX_MSG_LEN = 100;

export default class AlertView extends JetView {
    config() {
        const info = {
            view: "form",
            id: "form",
            elementsConfig: { labelWidth: 140 },
            elements: [
                {
                    view: "text",
                    label: "ID",
                    name: "identifier",
                    readonly: true
                },
                {
                    view: "text",
                    label: "Type",
                    name: "alert_type",
                    readonly: true
                },
                {
                    view: "text",
                    label: "Status",
                    name: "status",
                    readonly: true
                },
                {
                    view: "text",
                    label: "Level",
                    name: "level",
                    readonly: true
                },
                {
                    view: "text",
                    label: "Count",
                    name: "count",
                    readonly: true
                },
                {
                    view: "text",
                    label: "Category",
                    name: "cat",
                    readonly: true
                },
                {
                    view: "text",
                    label: "First time",
                    name: "time_first",
                    readonly: true
                },
                {
                    view: "text",
                    label: "Last time",
                    name: "time_last",
                    readonly: true
                },
                {
                    view: "text",
                    label: "Message (pub)",
                    name: "public",
                    readonly: true,
                },
            ]
        };

        const tab = {
            view: "tabview",
            cells: [
                {
                    header: "Information",
                    body: info,
                },
                {
                    header: "Message",
                    body: {
                        id: "message",
                        view: "template",
                        template: "",
                        scroll: "auto",
                    }
                },
                {
                    header: "Tracebacks",
                    body: {
                        rows: [
                            {
                                view: "tabbar",
                                id: "tb_tabs",
                                multiview: true,
                                options: []
                            },
                            {
                                view: "multiview",
                                id: "tb_views",
                                cells: [
                                    {
                                        template: ""
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    id: "logs",
                    view: "datatable",
                    resizeColumn: true,
                    select: true,
                    multiselect: true,
                    css: "webix_header_border webix_data_border",
                    scroll: true,
                    autoConfig: true,
                    columns: [
                        {
                            id: "index",
                            header: "#",
                            sort: "int",
                            autowidth: true,
                            width: 60
                        },
                        {
                            id: "threebot_name",
                            header: "Threebot Name",
                            sort: "string",
                            width: 180
                        },
                        {
                            id: "app_name",
                            header: "App Name",
                            sort: "string",
                            width: 180
                        },
                        {
                            id: "latest_logid",
                            header: "Latest Log#",
                            sort: "int",
                            width: 180
                        }
                    ],
                    scheme: {
                        $init: function (obj) {
                            obj.index = this.count();
                        }
                    },
                }
            ]
        };

        return {
            view: "window",
            head: "Alert",
            modal: true,
            width: 600,
            height: 800,
            position: "center",
            body: {
                rows: [
                    tab,
                    {
                        view: "button",
                        value: "OK",
                        css: "webix_primary",
                        click: function () {
                            this.getTopParentView().hide();
                        }
                    }
                ]
            }
        }
    }


    init() {
        var self = this;
        this.form = $$("form");
        this.message = $$("message");
        this.logs = $$("logs");

        this.tbViews = $$("tb_views");
        this.tbTabs = $$("tb_tabs");

        this.logs.attachEvent("onItemDblClick", function () {
            let logData = self.logs.getSelectedItem()
            this.$scope.show(`/logs?appname=${logData.app_name}&logid=${logData.latest_logid}`)
        });
    }

    addTraceback(tb) {
        const tbId = `${tb.threebot_name}_${tb.process_id}`;
        const tbTitle = `${tb.threebot_name} - PID: (${tb.process_id})`;

        this.tbViews.addView({
            view: "template",
            id: tbId,
            scroll: "xy",
            template: `<p>${ansiUp.ansi_to_html(tb.formatted)}</p>`
        });

        this.tbTabs.addOption(tbId, tbTitle, true);
    }

    clearTraceBacks() {
        let id = this.tbTabs.getValue();

        while (id) {
            this.tbTabs.removeOption(id);
            this.tbViews.removeView(id);

            id = this.tbTabs.getValue();
        }
    }

    showFor(item) {
        this.form.setValues(item);
        this.message.setHTML(`<p>${ansiUp.ansi_to_html(item.message)}</p>`);

        this.clearTraceBacks();

        for (let tb of item.tracebacks) {
            this.addTraceback(tb);
        }

        this.logs.clearAll()
        this.logs.parse(item.logs);

        this.getRoot().show();
    }
}
