import { JetView } from "webix-jet";

export default class WorkerDetailsView extends JetView {
    config() {
        const info = {
            view: "form",
            id: "form",
            elementsConfig: { labelWidth: 200 },
            elements: [
                {
                    view: "text",
                    label: "Name",
                    name: "name",
                    readonly: true,
                },{
                    view: "text",
                    label: "State",
                    name: "state",
                    readonly: true,
                },
                {
                    view: "text",
                    label: "Halted",
                    name: "halt",
                    readonly: true,
                },
                {
                    view: "text",
                    label: "PID",
                    name: "pid",
                    readonly: true
                }
                ,
                {
                    view: "text",
                    label: "Current job",
                    name: "current_job",
                    readonly: true
                },
                {
                    view: "text",
                    label: "Last update",
                    name: "last_update",
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
                    label: "Timeout",
                    name: "timeout",
                    readonly: true
                },
                {
                    view: "text",
                    label: "Type",
                    name: "type",
                    readonly: true
                },
                {
                    view: "text",
                    label: "Error",
                    name: "error",
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
            width: window.innerWidth * .8,
            height: window.innerHeight * .8,
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

    showWorkerDetails(data) {
        this.form.parse(data)
        this.getRoot().show();
    }

    init() {
        this.form = $$("form");
    }
}