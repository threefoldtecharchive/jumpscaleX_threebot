import { JetView } from "webix-jet";
import { health } from "../../services/health";

export default class DiskSpaceView extends JetView {
    config() {
        const diskSpace = {
            id: "diskSpace",
            responsive: true,
            view: "list",
            type: {
                height: 60,
            },
            template: `
            <p><font size="3"><b>#key#: </b></font> <font size="3">#value#</font></p>
            `
        }

        return {
            type: "space",
            rows: [{
                template: "<div style='width:auto;text-align:center'><h3>Disk Space<h3/></div>",
                height: 50
            },
                diskSpace
            ]
        }
    }


    init() {
        var self = this;

        this.diskInfo = this.$$("diskSpace");

        health.getDiskSpace().then(data => {
            data = data.json();

            self.diskInfo.add({
                key: "Used",
                value: data.used + " GB"
            });
            self.diskInfo.add({
                key: "Free",
                value: data.free + " GB"
            });
            self.diskInfo.add({
                key: "Total",
                value: data.total + " GB"
            });
            self.diskInfo.add({
                key: "Percent",
                value: data.percent + " %"
            });
        });
    }

}
