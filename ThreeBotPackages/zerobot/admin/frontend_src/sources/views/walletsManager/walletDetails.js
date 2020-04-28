import { JetView } from "webix-jet";

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
            width: 800,
            height: 500,
            position: "center",
            body: {
                rows: [
                    info,
                    {
                        view: "button",
                        id: "secret_btn",
                        value: "Show Secret",
                        css: "webix_primary",
                        click: function () {
                            this.$scope.showSecret();
                        }
                    },
                    {
                        view: "button",
                        value: "OK",
                        css: "webix_primary",
                        click: function () {
                            $$("secret_btn").enable()
                            this.getTopParentView().hide();
                        }
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

        this.getRoot().show();
    }
}
