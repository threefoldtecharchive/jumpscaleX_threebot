import axios from "axios";


export function getJobs() {
    return axios.post("/api/actors/myjobs/list_jobs");
}

export function getWorkers() {
    return axios.post("/api/actors/myjobs/list_workers");
}

