import { Service } from "../common/api";

const BASE_URL = "/zerobot/admin/actors/health";

class HealthService extends Service {
    constructor() {
        super(BASE_URL);
    }

    getDiskSpace() {
        return this.getCall("get_disk_space");
    }

    getHealth() {
        return this.getCall("health");
    }

    getIdentity() {
        return this.getCall("get_identity");
    }

    getNetworkInfo() {
        return this.getCall("network_info");
    }

    getJsxVersion() {
        return this.getCall("jsx_version");
    }

    getRunningProcesses() {
        return this.getCall("get_running_processes");
    }

    getRunningPorts() {
        return this.getCall("get_running_ports");
    }

    kill_processes(ids) {
        return this.getCall('kill_processes', ids)
    }
}

export const health = new HealthService();
