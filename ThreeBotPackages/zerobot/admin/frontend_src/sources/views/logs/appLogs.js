import { JetView } from "webix-jet";

import { dateFormatter } from "../../common/formatters";

export default class AppLogsView extends JetView {
    config() {
        var pager = {
            view: "pager",
            id: "pager",
            size: 100,
            group: 20
        };
        const applogs = {
            view: "datatable",
            id: "applogs_table",
            pager: "pager",
            resizeColumn: true,
            select: true,
            multiselect: true,
            css: "webix_header_border webix_data_border",
            scroll: true,
            autoConfig: true,
            on: {
                onAfterLoad: function () {
                    this.sort("epoch", "des");
                    this.markSorting("epoch", "des");
                }
            },

            columns: [{
                id: "id",
                header: [
                    "Log#",
                    {
                        content: "textFilter"
                    },
                ],
                sort: "int",
                width: 50,
                autowidth: true,
            },

            {
                id: "filepath",
                header: [
                    "Path",
                    {
                        content: "textFilter"
                    },
                ],
                sort: "string",
                autowidth: true,
                width: 140
            },

            {
                id: "linenr",
                header: [
                    "Line.nr",
                    {
                        content: "textFilter"
                    },
                ],
                sort: "int",
                autowidth: true,
                width: 60
            },

            {
                id: "context",
                header: [
                    "Context",
                    {
                        content: "textFilter"
                    },
                ],
                sort: "string"
            },
            {
                id: "message",
                header: [
                    "Message",
                    {
                        content: "textFilter"
                    },
                ],
                sort: "string",
                width: 500,
                autowidth: true
            },
            {
                id: "level",
                header: [
                    "Level",
                    {
                        content: "textFilter"
                    },
                ],
                sort: "int",
                width: 50
            },
            {
                id: "epoch",
                header: [
                    "Time",
                    {
                        content: "textFilter"
                    },
                ],
                sort: "date",
                format: dateFormatter,
                width: 130
            },
            {
                id: "processid",
                header: [
                    "PID",
                    {
                        content: "textFilter"
                    },
                ],
                sort: "int",
                width: 60
            },
            {
                id: "cat",
                header: [
                    "Category",
                    {
                        content: "textFilter"
                    },
                ],
                sort: "string",
                width: 80
            },
            {
                id: "data",
                header: [
                    "Data",
                    {
                        content: "textFilter"
                    },
                ],
                sort: "string"
            }

            ],

        }


        return {
            rows: [
                applogs,
                pager
            ]
        }
    }

}
