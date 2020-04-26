import { JetView } from "webix-jet";

export default class JobDetailsView extends JetView {
    config() {
        const info = {
            view: "form",
            id: "form",
            elementsConfig: { labelWidth: 200 },
            elements: [
                {
                    view: "text",
                    label: "ID",
                    name: "action_id",
                    readonly: true,
                },{
                    view: "text",
                    label: "State",
                    name: "state",
                    readonly: true,
                },
                {
                    view: "text",
                    label: "Name",
                    name: "name",
                    readonly: true,
                },
                {
                    view: "text",
                    label: "Category",
                    name: "category",
                    readonly: true
                }
                ,
                {
                    view: "text",
                    label: "kwargs",
                    name: "kwargs",
                    readonly: true
                },
                {
                    view: "text",
                    label: "Die",
                    name: "die",
                    readonly: true
                },
                {
                    view: "textarea",
                    label: "Error",
                    name: "error",
                    readonly: true
                },
                {
                    view: "text",
                    label: "Start time",
                    name: "time_start",
                    readonly: true,
                },
                {
                    view: "text",
                    label: "Stop time",
                    name: "time_stop",
                    readonly: true,
                },
                {
                    view: "text",
                    label: "Timeout",
                    name: "timeout",
                    readonly: true
                },
                {
                    view: "text",
                    label: "Result",
                    name: "result",
                    readonly: true
                },
                {
                    view: "text",
                    label: "Dependencies",
                    name: "dependencies",
                    readonly: true
                },
                {
                    view: "text",
                    label: "Debug",
                    name: "debug",
                    readonly: true
                }
            ]
        };

        return {
            view: "window",
            head: "Worker Details",
            modal: true,
            width: 600,
            height: 800,
            position: "center",
            body: {
                rows: [
                    info,
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

    showJobDetails(data) {
        this.form.parse(data)
        this.getRoot().show();
    }

    init() {
        this.form = $$("form");
    }
}
