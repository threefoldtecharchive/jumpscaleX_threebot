import { JetView } from "webix-jet";

export default class WalletDetailsView extends JetView {
    config() {
        const info = {
            id: "wallet_info",
            responsive: true,
            view: "list",
            responsive: true,
            type: {
                height: 'auto',
            },
            template: `
                <p>
                </font><font size="3"><b>Name: </b>#name#</font><br>
                </font><font size="3"><b>Address: </b>#address#</font><br>
                </font><font size="3"><b>Balances:</b></font><br>
                </font><font size="3">#balances#</font>
                </p>
            `
        }

        return {
            view: "window",
            head: "Wallet Details",
            modal: true,
            width: 800,
            height: 500,
            position: "center",
            body: {
                rows: [
                    info,
                    {
                        view: "button",
                        value: "OK",
                        css: "webix_primary",
                        click: function () {
                            this.getTopParentView().hide();
                        }
                    }
                ]
            }
        }
    }

    showInfo(data){
        var self = this

        var balances = "";
        for (var i in data.balances) {
            balances += `${data.balances[i].balance} <b>${data.balances[i].asset_code}</b> ${data.balances[i].asset_issuer}<br>`
        }
        self.info.clearAll()
        self.info.add({
            name: data.name,
            address: data.address,
            balances: balances
        })

        this.getRoot().show();
    }

    init() {
        const self = this;

        self.info = this.$$("wallet_info");
    }
}