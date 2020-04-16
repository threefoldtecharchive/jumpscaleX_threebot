import { JetView } from "webix-jet";

export default class ProcessDetailsView extends JetView {
    config() {
        const info = {
            view: "form",
            id: "form",
            elementsConfig: { labelWidth: 140 },
            elements: [
                {
                    view: "text",
                    label: "Process",
                    name: "name",
                    readonly: true
                },
                {
                    view: "text",
                    label: "PID",
                    name: "pid",
                    readonly: true
                },
                {
                    view: "text",
                    label: "Username",
                    name: "username",
                    readonly: true
                },
                {
                    view: "text",
                    label: "Memory",
                    name: "rss",
                    readonly: true
                }
            ]
        };

        return {
            view: "window",
            head: "Process Details",
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

    showProcessDetails(data) {
        this.form.parse(data)
        this.getRoot().show();
    }

    init() {
        this.form = $$("form");
    }
}
