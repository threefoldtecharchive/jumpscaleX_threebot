import {
    JetView
} from "webix-jet";

export default class NetworkInfoView extends JetView {
    config() {
        const info = {
            id: "networkInfo",
            responsive: true,
            view: "list",
            type: {
                height: 100,
            },
            template: `
                <h4>#key#</h4>: <span>#value#</value>",
            `
        }

        return info
    }
    init(view) {
        const self = this;

        this.info = this.$$("networkInfo");

        webix.ajax().get("/zerobot/admin/actors/health/get_identity", function (data) {
            self.info.add({
                key: "3bot: ",
                value: data
            })
        })

        webix.ajax().get("/zerobot/admin/actors/health/network_info", function (data) {
            data = JSON.parse(data);
            self.info.add({
                key: "IP",
                value: data.ip,
            });
            if (data.ip6.length) {
                self.info.add({
                    key: "IPv6",
                    value: data.ip6
                })
            } else {
                self.info.add({
                    key: "IPv6",
                    value: "Not set"
                })
            }
        });
    }

}
