
import axios from 'axios'

export function getAlerts(envName = "all") {
    return (axios.post("/actors/alerta/list_alerts_by_env", { "args": { "env_name": envName } }))
}
export function deleteAll() {
    return (axios.post("/actors/alerta/delete_all_alerts"))

}
export function deleteAlert(alertId) {
    return (axios.post("/actors/alerta/delete_alert", { "args": { "alert_id": alertId } }))
}

