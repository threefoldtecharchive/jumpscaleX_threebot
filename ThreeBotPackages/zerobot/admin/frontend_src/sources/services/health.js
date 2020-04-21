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

    killProcessesByPid(ids) {
        return this.getCall('kill_processes_by_pid', ids)
    }

    killProcessesByPort(ports) {
        return this.getCall('kill_processes_by_port', ports)
    }

    getProcessDetails(pid) {
        return this.getCall('get_process_details', pid)
    }
}

export const health = new HealthService();
