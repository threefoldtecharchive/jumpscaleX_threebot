import {
    JetView
} from "webix-jet";

export default class BcdbHealthView extends JetView {
    config() {
        const bcdb_info = {
            id: "bcdbHealth",
            view: "template",
            type: {
                height: 200,
            },
            template: ""
        }

        return bcdb_info
    }
    init(view) {
        var self = this;

        this.bcdb_info = this.$$("bcdbHealth");

        webix.ajax().get("/zerobot/admin/actors/health/bcdb_health", function (data) {
            data = JSON.parse(data);
            self.bcdb_info.setHTML(`
            <h4>BCDB Health<h4>
            ${data.state}
        `)
        });
    }

}