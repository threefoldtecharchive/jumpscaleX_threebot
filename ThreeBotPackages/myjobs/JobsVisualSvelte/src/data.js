import axios from "axios";

function getJobs() {
    return (axios.post("/actors/myjobs/list_jobs"));
}



function getWorkers() {
    return (axios.post("/actors/myjobs/list_workers"));
}


export {
    getJobs,
    getWorkers
}