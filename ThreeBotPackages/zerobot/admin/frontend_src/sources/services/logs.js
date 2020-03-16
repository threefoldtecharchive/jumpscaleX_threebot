import { Service } from "../common/api";

const BASE_URL = "/zerobot/admin/actors/logs";

class LogsService extends Service {
    constructor() {
        super(BASE_URL);
    }

    listApps() {
        return this.getCall("list_apps");
    }

    list(appName, logId) {
        return this.postCall("list", {
            appname: appName,
            id_from: logId
        });
    }
}

export const logs = new LogsService();
