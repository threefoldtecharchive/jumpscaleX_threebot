import { JetView } from "webix-jet";

import { dateFormatter } from "../../common/formatters";
import { myjobs } from "../../services/myjobs";
import JobDetailsView from "./jobDetails";

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
            }],
            scheme: {
                $init: function (obj) {
                    obj.index = this.count();
                }
            },
        };

        return view;
    }

    init(view) {
        const self = this
        self.jobDetailsView = self.ui(JobDetailsView);
        self.jobTable = this.$$("jobs_table");
        
        myjobs.listJobs().then(data => {
            view.parse(data);
        });
        self.jobTable.attachEvent("onItemDblClick", function () {
            let id = self.jobTable.getSelectedId()
            let item = self.jobTable.getItem(id)
            self.jobDetailsView.showJobDetails(item);
        });
    }
}
