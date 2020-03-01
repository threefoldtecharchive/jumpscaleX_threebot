import {
    JetView
} from "webix-jet";

export default class JSXInfoView extends JetView {
    config() {
        const info = {
            id: "jsxInfo",
            responsive: true,
            view: "list",
            responsive: true,
            type: {
                height: 100,
            },
            template: `
                <h3>#key#</h3><font size="4">#value#</font>
            `
        }

        return {
            type: "space",
            rows: [{
                template: "<div style='width:auto;text-align:center'><h3>JSX Info<h3/></div>",
                height: 50
            },
                info
            ]
        }
    }
    init(view) {
        const self = this;

        this.info = this.$$("jsxInfo");

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

        webix.ajax().get("/zerobot/admin/actors/health/jsx_version", function (data) {
            self.info.add({
                key: "JSX Version: ",
                value: data
            })
        })

    }

}
