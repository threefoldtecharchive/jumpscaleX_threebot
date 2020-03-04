import { JetView } from "webix-jet";

import ProcessesChildView from "./processesChildView";
import { health } from "../../services/health";

const colorsDataset = [
    {
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
            width: 500,
            height: 400,
            color: "#color#",
            value: "#vms#",
            label: "<h4>#name#</h4>",
            pieInnerText: "<h4>#vms#</h4>",
            data: "#chartsData#",
        }

        return {
            type: "space",
            rows: [
                {
                    template: "<div style='width:auto;text-align:center'><h3>Running processes memory usage (MB)<h3/></div>",
                    height: 50
                },
                processesInfo,
                {
                    view: "button",
                    id: "show_all",
                    value: "Show All",
                    align: "center",
                    css: "webix_primary",
                    inputWidth: 100,
                    click: function () {
                        this.$scope.childview.showFor(this.$scope.processesList)
                    }
                }

            ]
        }
    }


    init(view) {
        const self = this;

        this.processesList = []

        this.runProcessInfo = this.$$("process");

        self.childview = self.ui(ProcessesChildView);

        health.getRunningProcesses().then(data => {
            var chartsData = []

            data = data.json();
            self.processesList = data.processesList

            // memory usage
            self.memoryUsage = data.memoryUsage
            self.totalMemory = self.memoryUsage.total_mem
            self.percent = self.memoryUsage.usage_percent


            self.runProcessInfo.define("legend", {
                layout: "x",
                width: 110,
                values: [
                    {
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
                    "vms": Math.ceil(self.processesList[i].vms),
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
