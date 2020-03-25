import { JetView } from "webix-jet";
import { health } from "../../services/health";

export default class JSXInfoView extends JetView {
    config() {
        const info = {
            id: "jsxInfo",
            responsive: true,
            view: "list",
            responsive: true,
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
                template: "<div style='width:auto;text-align:center'><h3>JSX Info<h3/></div>",
                height: 50
            },
                info
            ]
        }
    }

    init() {
        const self = this;

        this.info = this.$$("jsxInfo");

        health.getIdentity().then(data => {
            self.info.add({
                key: "3bot",
                value: data.text()
            })
        })

        health.getNetworkInfo().then(data => {
            data = data.json();
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

        health.getJsxVersion().then(data => {
            self.info.add({
                key: "JSX Version",
                value: data.text()
            })
        })

    }

}
