
import axios from 'axios'

export function getAlert(id) {
    return axios.post("/api/actors/alerta/get_alert", {
        args: {
            alert_id: id
        }
    });
}
export function getAlerts(envName = "all") {
    return (axios.post("/api/actors/alerta/list_alerts_by_env", { "args": { "env_name": envName } }))
}
export function deleteAll() {
    return (axios.post("/api/actors/alerta/delete_all_alerts"))

}
export function deleteAlert(alertId) {
    return (axios.post("/api/actors/alerta/delete_alert", { "args": { "alert_id": alertId } }))
}

