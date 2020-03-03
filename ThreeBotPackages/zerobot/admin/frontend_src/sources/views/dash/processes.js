import {
    JetView
} from "webix-jet";

import ProcessesChildView from "./processesChildView";

export default class ProcessesView extends JetView {

    config() {
        const run_process_info = {
            id: "process",
            view: "chart",
            responsive: true,
            type: "pie",
            width: 500,
            height: 400,
            color: "#color#",
            value: "#vms#",
            label: "<h4>#name#</h4>",
            pieInnerText: "<h4>#vms#</h4>",
            data: "#chart_data#",
        }

        return {
            type: "space",
            rows: [
                {
                    template: "<div style='width:auto;text-align:center'><h3>Running processes memory usage (MB)<h3/></div>",
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
                        this.$scope.childview.showFor(this.$scope.processes_list)
                    }
                }

            ]
        }
    }


    init(view) {
        var self = this;

        this.processes_list = []

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
            self.processes_list = data.processes_list

            // memory usage
            self.memory_usage = data.memory_usage
            self.total_memory = self.memory_usage.total_mem
            self.percent = self.memory_usage.usage_percent


            self.run_process_info.define("legend", {
                layout: "x",
                width: 110,
                values: [
                    {
                        text: `<b>Total memory: </b>${self.total_memory}GB`
                    },
                    {
                        text: `<b>Usage: </b>${self.percent}%`
                    }
                ]
            })
            self.run_process_info.refresh()

            for (let i = 0; i < self.processes_list.length; i++) {
                //Break when there is no more colors
                if (i == colors_dataset.length)
                    break;
                var temp = {
                    "color": colors_dataset[i].color,
                    "name": self.processes_list[i].name,
                    "vms": Math.ceil(self.processes_list[i].vms),
                }
                chart_data.push(temp)
                // console.log(myArray[i]);
            }
            self.run_process_info.parse({
                data: chart_data,
            });
        });
    }

}
