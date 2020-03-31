import { Service } from "../common/api";

const BASE_URL = "/zerobot/admin/actors/admin";

class AdminService extends Service {
    constructor() {
        super(BASE_URL);
    }

    list() {
        return this.getCall("admin_list");
    }


    add(name) {
        return this.postCall("admin_add", {
            "name": name
        });
    }

    delete(name) {
        return this.postCall("admin_delete", {
            "name": name
        });
    }
}

export const admin = new AdminService();
