import { JetView } from "webix-jet";

import { dateFormatter } from "../../common/formatters";
import { myjobs } from "../../services/myjobs";
import WorkerDetailsView from "./workerDetails"

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
            }],
            autoConfig: true,
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
        self.workerDetailsView = self.ui(WorkerDetailsView);

        myjobs.listWorkers().then(data => {
            view.parse(data);
        });

        self.workerTable = this.$$("workers_table");

        self.workerTable.attachEvent("onItemDblClick", function () {
            let id = self.workerTable.getSelectedId()
            let item = self.workerTable.getItem(id)
            let WorkerData = {
                'debug':item['debug'].toString(),
                'halt':item['halt'].toString(),
                'error':item['error']['message'],
                'pid':item['pid'],
                'current_job':item['current_job'],
                'name':item['name'],
                'state':item['state'],
                'last_update':dateFormatter(item['last_update']),
                'time_start':dateFormatter(item['time_start']),
                'timeout':item['timeout'],
                'type':item['type']
            }
            self.workerDetailsView.showWorkerDetails(WorkerData);
        });
    }
}
