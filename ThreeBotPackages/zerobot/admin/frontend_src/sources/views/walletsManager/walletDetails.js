import { JetView } from "webix-jet";
import { wallet } from "../../services/wallet";

export default class WalletDetailsView extends JetView {
    config() {
        const info = {
            id: "wallet_info",
            view: "list",
            responsive: true,
            type: {
                height: 'auto',
            },
            template: `
                <p></font><font size="3"><b>#key#: </b>#value#</font><br></p>
            `
        }

        return {
            view: "window",
            head: "Wallet Details",
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
                            id: "secret_btn",
                            value: "Show Secret",
                            css: "webix_primary",
                            click: function () {
                                this.$scope.showSecret();
                            }
                        },  {
                            view: "button",
                            value: "Update trustlines",
                            css: "webix_primary",
                            click: function () {
                                this.$scope.updateTrustLines();
                            }
                        }, {
                            view: "button",
                            value: "Close",
                            css: "webix_primary",
                            click: function () {
                                $$("secret_btn").enable()
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
        self.info = this.$$("wallet_info");
        self.secret_btn = this.$$("secret_btn");
        self.secret = "";
    }

    showSecret() {
        var self = this;

        self.info.add({
            key: 'Secret',
            value: self.secret
        });
        self.secret_btn.disable()
    }

    updateTrustLines() {
        var self = this;
        wallet.updateTrustLines(self.name).then(data => {
            wallet.manageWallet(self.name).then(data => {
                showInfo(data);
            });
        }).catch(error => {
            webix.message({ type: "error", text: "Failed to update trustlines" });
        });
        
    }
    
    showInfo(data){
        var self = this

        var balances = "";
        for (var i in data.balances) {
            balances += `<br>${data.balances[i].balance} <b>${data.balances[i].asset_code}</b>`
        }
        self.info.clearAll()
        self.info.add({
            key: 'Name',
            value: data.name
        });
        self.info.add({
            key: 'Address',
            value: data.address
        });
        self.info.add({
            key: 'Balances',
            value: balances
        });
        self.secret = data.secret;
        self.name = data.name;

        this.getRoot().show();
    }
}
