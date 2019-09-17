import axios from "axios"
import { members } from "./members.js"
import { partners } from "./community.js"

axios.defaults.headers.post['Content-Type'] = 'application/json';

// class API {
//     getMembers() {
//         return axios.post("/actors/team/list_members")
//     }

//     getPartners() {
//         return axios.post("/actors/community/list_partners")

//     }

// }
class API {
    getMembers() {
        return new Promise(function (resolve, reject) {
            resolve(members)
        });
    }

    getPartners() {
        return new Promise(function (resolve, reject) {
            resolve(partners)
        });
    }

}
export let api = new API()