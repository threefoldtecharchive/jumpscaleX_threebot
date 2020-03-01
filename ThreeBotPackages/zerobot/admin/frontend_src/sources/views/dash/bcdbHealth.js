import {
    JetView
} from "webix-jet";

export default class BcdbHealthView extends JetView {
    config() {
        const bcdb_info = {
            id: "bcdbHealth",
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
            self.bcdb_info.setHTML(`
            <font size="4">${data.state}</font>
        `)
        });
    }

}
