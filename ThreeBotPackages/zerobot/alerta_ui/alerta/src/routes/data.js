
import axios from 'axios'

export function getAlert(id) {
    return axios.get("/web/gedis/http/alerta/get_alert", { "params": { "alert_id": id}});
}
export function getAlerts(envName = "all") {
    return (axios.get("/web/gedis/http/alerta/list_alerts_by_env", { "params": { "env_name": envName } }))
}
export function deleteAll() {
    return (axios.post("/web/gedis/http/alerta/delete_all_alerts"))

}
export function deleteAlert(alertId) {
    return (axios.post("/web/gedis/http/alerta/delete_alert", { "args": { "alert_id": alertId } }))
}
