import axios from "axios";


export function getJobs() {
    return axios.get("/web/gedis/http/myjobs/list_jobs");
}

export function getWorkers() {
    return axios.get("/web/gedis/http/myjobs/list_workers");
}

