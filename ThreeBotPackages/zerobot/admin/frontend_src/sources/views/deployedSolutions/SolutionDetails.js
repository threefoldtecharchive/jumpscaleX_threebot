import { JetView } from "webix-jet";

export default class SolutionDetailsView extends JetView {
    config() {
        const info = {
            id: "solution_info",
            view: "list",
            responsive: true,
            type: {
                height: 'auto',
            },
            template: `
                <p></font><font size="4"><b>#key#: </b>#value#</font><br></p>
            `
        }

        return {
            view: "window",
            head: "Solution Details",
            modal: true,
            width: window.innerWidth * .8,
            height: window.innerHeight * .8,
            position: "center",
            body: {
                rows: [
                    info,
                    {
                        cols: [{
                            view: "button",
                            value: "Close",
                            css: "webix_primary",
                            click: function () {
                                this.getTopParentView().hide();
                            }
                        }]
                    }
                ]
            }
        }
    }

    init() {
        const self = this;
        self.info = this.$$("solution_info");
    }

    showInfo(data) {
        var self = this
        self.info.clearAll()
        for (let [key, value] of Object.entries(data)) {
            if(key == 'nodes'){
                let nodeInfo = ''
                for (let i = 0; i < value.length; i++) {
                    const node = value[i];
                    nodeInfo += `<br><b>Node id:</b> ${node.node_id},  <b>IP range:</b> ${node.iprange}`
                }
                self.info.add({
                    key:key,
                    value:nodeInfo
                })
            }else{
                self.info.add({
                    key:key,
                    value:value
                })
            }
        }

        
        this.getRoot().show();
    }
}
