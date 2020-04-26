import { JetView } from "webix-jet";

import WalletFormView from "./walletForm";
import WalletDetailsView from "./walletDetails";
import WalletImportView from  "./importForm"
import { wallet } from "../../services/wallet";

export default class WalletManagerView extends JetView {
    config() {
        const wallets = {
            view: "datatable",
            id: "wallets_table",
            resizeColumn: true,
            select: true,
            multiselect: true,
            css: "webix_header_border webix_data_border",
            scroll: true,
            autoConfig: true,
            columns: [{
                id: "index",
                header: "#",
                sort: "int",
                autowidth: true,
            },
            {
                id: "name",
                header: ["Name"],
                sort: "string",
                autowidth: true,
                width: 140
            },
            {
                id: "address",
                header: ["Address"],
                sort: "string",
                autowidth: true,
                width: 'auto'
            }
            ],
            scheme: {
                $init: function (obj) {
                    obj.index = this.count();
                }
            }
        };

        const view = {
            cols: [
                {
                    view: "template",
                    type: "header", template: "Wallets",
                },
                {
                    view:"button", 
                    id:"btn_create", 
                    value:"Create Wallet", 
                    css:"webix_secondary", 
                    autowidth:true,
                    click: function (){
                        this.$scope.WalletFormView.showForm()
                    }
                },
                {
                    view:"button", 
                    id:"btn_import", 
                    value:"Import Wallet", 
                    css:"webix_secondary", 
                    autowidth:true,
                    click: function (){
                        this.$scope.WalletImportView.showForm()
                    }
                }
            ]
        };

        return {
            rows: [
                view,
                wallets
            ]
        }
    }

    init(view) {
        var self = this;

        self.wallets_table = $$("wallets_table");
        self.WalletDetailsView = self.ui(WalletDetailsView)
        self.WalletFormView = self.ui(WalletFormView);
        self.WalletImportView = self.ui(WalletImportView);

        self.wallets_table.attachEvent("onItemDblClick", function () {
            let item = self.wallets_table.getSelectedItem()
            wallet.manageWallet(item.name).then(data => {
                console.log(data.json())
                let res = data.json()
                var info = {
                    'name': item.name,
                    'address': res.address,
                    'secret': res.secret,
                    'balances': res.balances
                }
                self.WalletDetailsView.showInfo(info)
            });
        });
    }

    urlChange(view, url) {
        var self = this;
    
        self.wallets_table =  $$("wallets_table");
        wallet.getWallets().then(data => {
            console.log(data.json())
            self.wallets_table.parse(data.json())
        });
    }
}
