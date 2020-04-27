import { JetView } from "webix-jet";

import { dateFormatter } from "../../common/formatters";
import { ansiUp } from "../../common/colors";

export default class JobDetailsView extends JetView {
    config() {
        const info = {
            view: "form",
            id: "form",
            elementsConfig: { labelWidth: 200 },
            elements: [
                {
                    view: "text",
                    label: "Action ID",
                    name: "action_id",
                    readonly: true,
                }, {
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

        const tab = {
            view: "tabview",
            cells: [
                {
                    header: "Information",
                    body: info,
                },
                {
                    header: "Error",
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
                            
                                id: 'pid',
                                view: "template",
                                template: `<b>PID #pid#</b>`,
                                scroll: "auto",
                                height: 30,
                                align: 'center'
                                
                            },
                            {
                                id: "tracebacks",
                                view: "template",
                                template: "",
                                scroll: "auto"
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
                            id: "context",
                            header: "Context",
                            sort: "string",
                            width: 180
                        },
                        {
                            id: "processid",
                            header: "Process id",
                            sort: "string",
                            width: 180
                        },
                        {
                            id: "message",
                            header: "Message",
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
            head: "Job Details",
            modal: true,
            width: 600,
            height: 700,
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

    showJobDetails(data) {
        let item = Object.assign({}, data);
        let jobData = {
            'action_id': item['action_id'],
            'debug': item['debug'].toString(),
            'die': item['die'].toString(),
            'error_cat': item['error_cat'],
            'category': item['category'] ? item['category'] : 'No Category',
            'result': JSON.stringify(item['result']),
            'name': item['name'],
            'state': item['state'],
            'kwargs': JSON.stringify(item['kwargs']),
            'time_stop': dateFormatter(item['time_stop']),
            'time_start': dateFormatter(item['time_start']),
            'timeout': item['timeout'],
            'dependencies': item['dependencies']
        }

        if (Object.keys(item['error']).length !== 0) {
            jobData['pid'] = item['error']['processid']
            $$('pid').setValues({ pid: item['error']['processid'] }, true);
            $$('pid').show()
            this.message.setHTML(`<p>${ansiUp.ansi_to_html(item['error']['message'])}</p>`);
            this.tracebacks.setHTML(`<p>${ansiUp.ansi_to_html(item['error']['formatted'])}</p>`);

        }else{
            $$('pid').hide();
            this.message.setHTML(`<p>"No message"</p>`);
            this.tracebacks.setHTML(`<p>"All is fine"</p>`)
        }
        this.form.parse(jobData)
        this.getRoot().show();

        this.logs.clearAll()
        this.logs.parse(item['logs']);
    }

    init() {
        this.form = $$("form");
        this.message = $$("message");
        this.logs = $$("logs");

        this.tracebacks = $$("tracebacks");
        this.tbTabs = $$("tb_tabs");

        this.logs.attachEvent("onItemDblClick", function () {
            this.$scope.show(`/main/logs?appname=workers_1`)
        });
    }
}
