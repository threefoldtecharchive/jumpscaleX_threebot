
import { JetView } from "webix-jet";
import { health } from "../../services/health";
import { identity } from "../../services/identity";

export default class JSXInfoView extends JetView {
    config() {
        const info = {
            id: "jsxInfo",
            view: "list",
            responsive: true,
            type: {
                height: 'auto',
            },
            template: `
                <p><font size="3"><b>#key#: </b></font> <font size="3">#value#</font></p>
            `
        }
        const botInfo = {
            id: "botInfo",
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
                botInfo,
                info
            ]
        }
    }

    init() {
        const self = this;

        this.info = this.$$("jsxInfo");
        this.botinfo = this.$$("botInfo");
        
        health.getIdentity().then(data => {
            self.botinfo.add({
                key: "3bot name",
                value: data.text()
            })
        })
        
        identity.get_identity().then(data => {
            self.botinfo.add({
                key: "3bot id",
                value: data.json().tid
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

