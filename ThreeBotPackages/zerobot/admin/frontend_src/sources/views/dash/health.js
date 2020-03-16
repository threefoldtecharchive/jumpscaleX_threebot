import { JetView } from "webix-jet";
import { health } from "../../services/health";

export default class healthInfoView extends JetView {
    config() {
        const healthInfo = {
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
                healthInfo]
        }
    }
    init(view) {
        var self = this;

        this.healthInfo = this.$$("healthInfo");

        health.getHealth().then(data => {
            data = data.json();

            if (data.bcdb === "OK") {
                self.healthInfo.add({
                    key: "BCDB Status",
                    value: `<span class='webix_icon wxi-checkbox-marked' style="color:green">OK</span>`
                })
            }
            if (data.bcdb === "Error") {
                self.healthInfo.add({
                    key: "BCDB",
                    value: `<span class='webix_icon wxi-close-circle' style="color:red">Error</span>`
                })
            }
            if (data.wikis === "OK") {
                self.healthInfo.add({
                    key: "Wikis",
                    value: `<span class='webix_icon wxi-checkbox-marked' style="color:green">OK</span>`
                })
            }
            if (data.wikis === "Error") {
                self.healthInfo.add({
                    key: "Wikis",
                    value: `<span class='webix_icon wxi-close-circle' style="color:red">Error</span>`
                })
            }
            if (data.codeserver === "OK") {
                self.healthInfo.add({
                    key: "Codeserver",
                    value: `<span class='webix_icon wxi-checkbox-marked' style="color:green">OK</span>`
                })
            }
            if (data.codeserver === "Error") {
                self.healthInfo.add({
                    key: "Codeserver",
                    value: `<span class='webix_icon wxi-close-circle' style="color:red">Error</span>`
                })
            }
            if (data.jupyter === "OK") {
                self.healthInfo.add({
                    key: "Jupyter",
                    value: `<span class='webix_icon wxi-checkbox-marked' style="color:green">OK</span>`
                })
            }
            if (data.jupyter === "Error") {
                self.healthInfo.add({
                    key: "Jupyter",
                    value: `<span class='webix_icon wxi-close-circle' style="color:red">Error</span>`
                })
            }
        });

    }

}
