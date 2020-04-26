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

    getWalletBySecret(secret) {
        return this.getCall("get_wallet", secret);
    }
}

export const wallet = new WalletService();