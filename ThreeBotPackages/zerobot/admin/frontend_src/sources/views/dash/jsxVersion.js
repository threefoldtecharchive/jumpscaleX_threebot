import {
    JetView
} from "webix-jet";

export default class JsxVersionView extends JetView {
    config() {
        const version_info = {
            id: "jsxVersion",
            view: "template",
            type: {
                height: 200,
            },
            template: ""
        }

        return version_info
    }
    init(view) {
        var self = this;

        this.version_info = this.$$("jsxVersion");

        webix.ajax().get("/zerobot/admin/actors/health/jsx_version", function (data) {
            self.version_info.setHTML(`
                <h3>JSX Version</h3>
                <p>${data}</p>
            `);
            // if (data.ip6) {
            //     self.info.add({
            //         key: "IPv6",
            //         value: data.ip6
            //     })
            // }
        });
    }

}