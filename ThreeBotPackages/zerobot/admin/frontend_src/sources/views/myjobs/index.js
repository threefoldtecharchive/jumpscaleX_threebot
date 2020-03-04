import { JetView } from "webix-jet";
import { dateFormatter, json_ajax } from "../../common";

export default class JobsView extends JetView {
    config() {
        const view = {
            view: "datatable",
            id: "jobs_table",
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
                id: "category",
                header: "Category",
                sort: "string"
            },
            {
                id: "time_start",
                header: "Start time",
                sort: "date",
                format: dateFormatter,
                width: 200
            },
            {
                id: "time_stop",
                header: "Stop time",
                sort: "date",
                format: dateFormatter,
                width: 200
            },
            {
                id: "timeout",
                header: "Timeout",
                sort: "int"
            },
            {
                id: "action_id",
                header: "Action",
                sort: "string"
            },
            {
                id: "kwargs",
                header: "Arguments",
                sort: "string",
                format: JSON.stringify
            },
            {
                id: "result",
                header: [
                    "Result",
                    {
                        content: "textFilter"
                    }
                ],
                sort: "string",
                format: JSON.stringify,
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
        webix.ajax().get("/zerobot/myjobs_ui/actors/myjobs/list_jobs", function (data) {
            view.parse(data);
        });
    }
}
