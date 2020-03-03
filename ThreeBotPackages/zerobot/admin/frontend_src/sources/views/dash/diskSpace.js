import {
    JetView
} from "webix-jet";

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


    init(view) {
        var self = this;

        this.disk_info = this.$$("diskSpace");

        webix.ajax().get("/zerobot/admin/actors/health/get_disk_space", function (data) {
            data = JSON.parse(data);

            self.disk_info.add({
                key: "Used",
                value: data.used + " GB"
            });
            self.disk_info.add({
                key: "Free",
                value: data.free + " GB"
            });
            self.disk_info.add({
                key: "Total",
                value: data.total + " GB"
            });
            self.disk_info.add({
                key: "Percent",
                value: data.percent + " %"
            });
        });
    }

}
