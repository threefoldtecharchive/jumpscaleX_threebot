import { Service } from "../common/api";

const BASE_URL = "/zerobot/admin/actors/pools";

class PoolsService extends Service {
    constructor() {
        super(BASE_URL);
    }

    list() {
        return this.getCall("list_pools");
    }

}

export const pools = new PoolsService();