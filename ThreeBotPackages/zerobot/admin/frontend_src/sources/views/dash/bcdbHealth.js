import {
    JetView
} from "webix-jet";

export default class BcdbHealthView extends JetView {
    config() {
        const bcdb_info = {
            id: "bcdbHealth",
            responsive: true,
            view: "template",
            responsive: true,
            type: {
                height: 200,
            },
            template: ""
        }

        return {
            type: "space",
            rows: [{
                template: "<div style='width:auto;text-align:center'><h3>BCDB Health<h3/></div>",
                height: 50
            },
                bcdb_info]
        }
    }
    init(view) {
        var self = this;

        this.bcdb_info = this.$$("bcdbHealth");

        webix.ajax().get("/zerobot/admin/actors/health/bcdb_health", function (data) {
            data = JSON.parse(data);

            if (data.state === "OK") {
                self.bcdb_info.setHTML(`
                <span class='webix_icon wxi-checkbox-marked' style="color:green;width: 100%;font-size: 75px"></span>
                
            `)
            } else {
                self.bcdb_info.setHTML(`
                <span class='webix_icon wxi-close-circle' style="color:red;width: 100%;font-size: 75px"></span>
            `)
            }
        });

    }

}
