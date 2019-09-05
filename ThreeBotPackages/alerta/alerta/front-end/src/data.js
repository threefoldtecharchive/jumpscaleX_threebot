export function getAlerts() {
    return GEDIS_CLIENT.execute(info = {
        "namespace": "default",
        "actor": "alerta",
        "command": "list_alerts"
    })
}