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
                height: 'auto',
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
            for (var i in data) {
                var ip = data[i].ip;
                var ip6 = data[i].ip6.length ? data[i].ip6 : "Not set";

                self.info.add({ 
                    key: data[i].name,
                    value: `<br><b>IP: </b>${ip}<br><b>IPv6: </b>${ip6}`
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