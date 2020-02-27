import {
    JetView
} from "webix-jet";

export default class ProcessesView extends JetView {

    config() {
        const run_process_info = {
            id: "process",
            view: "chart",
            type: "pie",
            dynamic: true,
            color: "#color#",
            value: "#vms#",
            label: "#name#",
            pieInnerText: "#vms#",
            data: "#all_data#"
        }

        return run_process_info
    }
    init(view) {
        var self = this;

        this.run_process_info = this.$$("process");

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
            var all_data = []

            data = JSON.parse(data);

            for (let i = 0; i < data.length; i++) {
                //Break when there is no more colors
                if (i == colors_dataset.length)
                    break;
                var temp = {
                    "color": colors_dataset[i].color,
                    "name": data[i].name,
                    "vms": Math.ceil(data[i].vms)
                }
                all_data.push(temp)
                // console.log(myArray[i]);
            }
            self.run_process_info.parse({
                data: all_data
            });
        });
    }

}