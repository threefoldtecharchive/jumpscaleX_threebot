import { Service } from "../common/api";

const BASE_URL = "/tfgrid_solutions/tfgrid_solutions/actors/tfgrid_solutions";

class InvoicesService extends Service {
    constructor() {
        super(BASE_URL);
    }

    list() {
        return this.getCall("payments_list");
    }
}

export const invoices = new InvoicesService();
