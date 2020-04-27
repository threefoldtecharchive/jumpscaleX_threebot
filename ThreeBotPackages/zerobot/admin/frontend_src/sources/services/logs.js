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

    delete(appname){
        return this.postCall("delete",{
            appname: appname
        })
    }

    deleteAll(){
        return this.postCall("delete")
    }

    deleteSelected(ids){
        return this.postCall("delete_selected",{ids})
    }
}

export const logs = new LogsService();
