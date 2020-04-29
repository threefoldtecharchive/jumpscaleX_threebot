import { Service } from "../common/api";

const BASE_URL = "/zerobot/webinterface/actors/identity";


class IdentityService extends Service {
    constructor() {
        super(BASE_URL);
    }


    get_identity() {
        return this.getCall("threebot_name");
    }


}

export const identity = new IdentityService();
