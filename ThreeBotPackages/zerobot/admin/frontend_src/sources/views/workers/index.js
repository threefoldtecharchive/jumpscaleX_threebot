import { JetView } from "webix-jet";
import { dateFormatter } from "../../common";

export default class JobsView extends JetView {
    config() {
        const view = {
            view: "datatable",
            id: "workers_table",
            resizeColumn: true,
            select: true,
            multiselect: true,
            css: "webix_header_border webix_data_border",
            columns: [{
                id: "index",
                header: "#",
                sort: "int",
                autowidth: true,
            },
            {
                id: "state",
                header: "State",
                sort: "string"
            },
            {
                id: "halt",
                header: "Halted",
                sort: "string",
                format: function (value) {
                    return value ? 'Yes' : 'No';
                },
            },
            {
                id: "pid",
                header: "PID",
            },
            {
                id: "current_job",
                header: "Current job",
                format: function (value) {
                    return value == 2147483647 ? 'N/A' : value;
                }
            },
            {
                id: "last_update",
                header: "Last update",
                sort: "date",
                format: dateFormatter,
                width: 200
            },
            {
                id: "time_start",
                header: "Start time",
                sort: "date",
                format: dateFormatter,
                width: 200
            },
            {
                id: "timeout",
                header: "Timeout",
            },
            {
                id: "type",
                header: "Type",
            },
            {
                id: "error",
                header: "Error",
            },
                // {
                //     id: "message",
                //     header: [
                //         "Message",
                //         {
                //             content: "textFilter"
                //         },
                //     ],
                //     sort: "str",
                //     fillspace: true,
                //     format: function (value) {
                //         if (value.length > MAX_MSG_LEN) {
                //             value = value.substr(0, MAX_MSG_LEN) + '...';
                //         }
                //         return ansiUp.ansi_to_html(value);
                //     }
                // },
            ],
            autoConfig: true,
            // url:{
            //     $proxy:true,
            //     load: function(view, params){
            //         let data = webix.ajax("/zerobot/alerta/actors/alerta/list_alerts");
            //         return data;
            //     },
            // }
            scheme: {
                $init: function (obj) {
                    obj.index = this.count();
                }
            },
        };

        return view;
    }

    init(view) {
        webix.ajax().get("/zerobot/myjobs_ui/actors/myjobs/list_workers", function (data) {
            // throw ValueError(data);
            view.parse(data);
        });

    }
}
