
import axios from 'axios'

export function getAlert(identifier) {
    return axios.get("/zerobot/alerta/actors/alerta/get_alert", { "params": { "identifier": identifier } });
}
export function getAlerts(cat = "") {
    return (axios.get("/zerobot/alerta/actors/alerta/list_alerts_by_category", { "params": { "cat": cat } }))
}
export function deleteAll() {
    return (axios.post("/zerobot/alerta/actors/alerta/delete_all_alerts"))

}
export function deleteAlert(identifier) {
    return (axios.post("/zerobot/alerta/actors/alerta/delete_alert", { "args": { "identifier": identifier } }))
}
