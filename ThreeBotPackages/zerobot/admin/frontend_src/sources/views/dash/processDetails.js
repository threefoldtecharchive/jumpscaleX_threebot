import { JetView } from "webix-jet";

export default class ProcessDetailsView extends JetView {
    config() {
        const info = {
            view: "form",
            id: "form",
            elementsConfig: { labelWidth: 200 },
            elements: [
                {
                    view: "text",
                    label: "Process",
                    name: "name",
                    readonly: true,
                },
                {
                    view: "text",
                    label: "PID",
                    name: "pid",
                    readonly: true
                },
                {
                    view: "text",
                    label: "Cmd line",
                    name: "cmdline",
                    readonly: true
                }
                ,
                {
                    view: "text",
                    label: "Username",
                    name: "username",
                    readonly: true
                },
                {
                    view: "text",
                    label: "Memory usage in MB",
                    name: "rss",
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
                    label: "Creation time",
                    name: "create_time",
                    readonly: true
                },
                {
                    view: "text",
                    label: "CPU - user mode (seconds)",
                    name: "cpu_user",
                    readonly: true
                },
                {
                    view: "text",
                    label: "CPU - kernel mode (seconds)",
                    name: "cpu_system",
                    readonly: true
                },
                {
                    view: "text",
                    label: "Number of threads",
                    name: "threads",
                    readonly: true
                },
                {
                    view: "text",
                    label: "Number of fds opened",
                    name: "fds",
                    readonly: true
                },
                {
                    view: "text",
                    label: "Parent process pid",
                    name: "parent_pid",
                    readonly: true
                },
                {
                    view: "text",
                    label: "Parent process name",
                    name: "parent_name",
                    readonly: true
                }
            ]
        };

        return {
            view: "window",
            head: "Process Details",
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

    showProcessDetails(data) {
        this.form.parse(data)
        this.getRoot().show();
    }

    init() {
        this.form = $$("form");
    }
}
