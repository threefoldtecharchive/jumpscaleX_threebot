import {
    JetView
} from "webix-jet";

import ProcessesChildView from "./processesChildView";

export default class ProcessesView extends JetView {

    config() {
        const run_process_info = {
            id: "process",
            view: "chart",
            type: "pie",
            width: 500,
            height: 400,
            responsive: true,
            color: "#color#",
            value: "#vms#",
            label: "<h4>#name#</h4>",
            pieInnerText: "<h4>#vms#</h4>",
            data: "#chart_data#"
        }

        return {
            type: "space",
            rows: [
                {
                    template: "<div style='width:auto;text-align:center'><h3>Running Processes<h3/></div>",
                    height: 50
                },
                run_process_info,
                {
                    view: "button",
                    id: "show_all",
                    value: "Show All",
                    align: "center",
                    css: "webix_primary",
                    inputWidth: 100,
                    click: function () {
                        this.$scope.childview.showFor(this.$scope.all_data)
                    }
                }

            ]
        }
    }


    init(view) {
        var self = this;

        this.all_data = []

        this.run_process_info = this.$$("process");

        self.childview = self.ui(ProcessesChildView);

        var colors_dataset = [{
            color: "#ee3639"
        },
        {
            color: "#ee9e36"
        },
        {
            color: "#eeea36"
        },
        {
            color: "#a9ee36"
        },
        {
            color: "#36d3ee"
        },
        {
            color: "#367fee"
        },
        {
            color: "#9b36ee"
        }
        ];
        webix.ajax().get("/zerobot/admin/actors/health/get_running_processes", function (data) {
            var chart_data = []

            data = JSON.parse(data);
            self.all_data = data

            for (let i = 0; i < data.length; i++) {
                //Break when there is no more colors
                if (i == colors_dataset.length)
                    break;
                var temp = {
                    "color": colors_dataset[i].color,
                    "name": data[i].name,
                    "vms": Math.ceil(data[i].vms)
                }
                chart_data.push(temp)
                // console.log(myArray[i]);
            }
            self.run_process_info.parse({
                data: chart_data
            });
        });
    }

}
