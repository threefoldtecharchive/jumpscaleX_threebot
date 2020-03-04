import {
    JetView
} from "webix-jet";

export default class healthInfoView extends JetView {
    config() {
        const health_info = {
            id: "healthInfo",
            responsive: true,
            view: "list",
            responsive: true,
            type: {
                height: 60,
            },
            template: `
            <p><font size="3"><b>#key#: </b></font> #value#</p>
            `
        }

        return {
            type: "space",
            rows: [{
                template: "<div style='width:auto;text-align:center'><h3>Health Checks<h3/></div>",
                height: 50
            },
                health_info]
        }
    }
    init(view) {
        var self = this;

        this.health_info = this.$$("healthInfo");

        webix.ajax().get("/zerobot/admin/actors/health/health", function (data) {
            data = JSON.parse(data);

            if (data.bcdb === "OK") {
                self.health_info.add({
                    key: "BCDB Status",
                    value: `<span class='webix_icon wxi-checkbox-marked' style="color:green">OK</span>`
                })
            }
            if (data.bcdb === "Error") {
                self.health_info.add({
                    key: "BCDB",
                    value: `<span class='webix_icon wxi-close-circle' style="color:red">Error</span>`
                })
            }
            if (data.wikis === "OK") {
                self.health_info.add({
                    key: "Wikis",
                    value: `<span class='webix_icon wxi-checkbox-marked' style="color:green">OK</span>`
                })
            }
            if (data.wikis === "Error") {
                self.health_info.add({
                    key: "Wikis",
                    value: `<span class='webix_icon wxi-close-circle' style="color:red">Error</span>`
                })
            }
            if (data.codeserver === "OK") {
                self.health_info.add({
                    key: "Codeserver",
                    value: `<span class='webix_icon wxi-checkbox-marked' style="color:green">OK</span>`
                })
            }
            if (data.codeserver === "Error") {
                self.health_info.add({
                    key: "Codeserver",
                    value: `<span class='webix_icon wxi-close-circle' style="color:red">Error</span>`
                })
            }
            if (data.jupyter === "OK") {
                self.health_info.add({
                    key: "Jupyter",
                    value: `<span class='webix_icon wxi-checkbox-marked' style="color:green">OK</span>`
                })
            }
            if (data.jupyter === "Error") {
                self.health_info.add({
                    key: "Jupyter",
                    value: `<span class='webix_icon wxi-close-circle' style="color:red">Error</span>`
                })
            }
        });

    }

}
