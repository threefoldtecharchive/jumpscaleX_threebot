import { Service } from "../common/api";

const BASE_URL = "/zerobot/admin/actors/wallet";

class WalletService extends Service {
    constructor() {
        super(BASE_URL);
    }

    createWallet(name) {
        return this.getCall("create_wallet", name);
    }

    manageWallet(name) {
        return this.getCall("manage_wallet", name);
    }

    getWallets() {
        return this.getCall("get_wallets");
    }

    updateTrustLines(name) {
        return this.postCall("updateTrustLines", {name: name});
    }

    importWallet(name, secret, network) {
        return this.postCall("import_wallet", {name, secret, network});
    }

    delete(name) {
        return this.postCall("delete_wallet", { name: name });
    }
}

export const wallet = new WalletService();
