import axios from "axios";


export function getJobs() {
    return axios.get("/threefold/myjobs_ui/actors/myjobs/list_jobs");
}

export function getWorkers() {
    return axios.get("/threefold/myjobs_ui/actors/myjobs/list_workers");
}
