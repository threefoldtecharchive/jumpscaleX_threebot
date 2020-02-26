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
                        scroll: true,
                    }
                },
                {
                    header: "Tracebacks",
                    body: {
                        rows: [
                            {
                                view: "tabbar",
                                id: "tabs",
                                multiview: true,
                                options: []
                            },
                            {
                                view: "multiview",
                                id: "views",
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
                    header: "Logs",
                    body: {
                        id: "logs",
                        view: "template",
                        template: "",
                    }
                }
            ]
        };

        return {
            view: "window",
            head: "Alert",
            modal: true,
            width: 500,
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
        this.form = $$("form");
        this.message = $$("message");
        this.tracebacks = $$("tracebacks");
        this.logs = $$("logs");
    }

    addTraceback(tb) {


    }

    clearTraceBacks() {

    }

    showFor(item) {
        this.getRoot().show();

        this.form.setValues(item);

        this.message.setHTML(ansiUp.ansi_to_html(item.message));

        // let tracebackCells = []

        // for (let tb of item.tracebacks) {
        //     tracebackCells.push({
        //         header: `${tb.threebot_name} - PID: (${tb.process_id})`,
        //         body: {
        //             view: "template",
        //             template: ansiUp.ansi_to_html(tb.formatted)
        //         }
        //     })
        // }

        // // this.tracebacks.setValue("");
        // this.tracebacks.addView({
        //     view: "tabview",
        //     cells: tracebackCells
        // });

    }
}
