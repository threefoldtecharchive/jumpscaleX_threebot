import {
    JetView
} from "webix-jet";

import {
    health
} from "../../services/health";

const colorsDataset = [{
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

export default class ProcessesView extends JetView {

    config() {
        const processesInfo = {
            id: "process",
            view: "chart",
            responsive: true,
            type: "pie",
            color: "#color#",
            value: "#rss#",
            label: "<h4>#name#</h4>",
            pieInnerText: "<h4>#rss#</h4>",
            data: "#chartsData#",
        }

        return {
            type: "space",
            rows: [{
                    template: "<div style='width:auto;text-align:center'><h3>Running processes memory usage (RSS) (MB)<h3/></div>",
                    height: 50
                },
                processesInfo

            ]
        }
    }


    init(view) {
        const self = this;

        this.processesList = []

        this.runProcessInfo = this.$$("process");

        health.getRunningProcesses().then(data => {
            var chartsData = []

            data = data.json();
            self.processesList = data.processes_list

            // memory usage
            self.memoryUsage = data.memory_usage
            self.totalMemory = self.memoryUsage.total_mem
            self.percent = self.memoryUsage.usage_percent


            self.runProcessInfo.define("legend", {
                layout: "x",
                width: 110,
                values: [{
                        text: `<b>Total memory: </b>${self.totalMemory}GB`
                    },
                    {
                        text: `<b>Usage: </b>${self.percent}%`
                    }
                ]
            })
            self.runProcessInfo.refresh()

            for (let i = 0; i < self.processesList.length; i++) {
                //Break when there is no more colors
                if (i == colorsDataset.length)
                    break;

                var temp = {
                    "color": colorsDataset[i].color,
                    "name": self.processesList[i].name,
                    "rss": Math.ceil(self.processesList[i].rss),
                }
                chartsData.push(temp)
                // console.log(myArray[i]);
            }

            self.runProcessInfo.parse({
                data: chartsData,
            });
        });
    }

}