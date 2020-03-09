import { Service } from "../common/api";

const BASE_URL = "/zerobot/myjobs_ui/actors/myjobs";

class MyjobsService extends Service {
    constructor() {
        super(BASE_URL);
    }

    listJobs() {
        return this.getCall("list_jobs");
    }

    listWorkers() {
        return this.getCall("list_workers");
    }
}

export const myjobs = new MyjobsService();
