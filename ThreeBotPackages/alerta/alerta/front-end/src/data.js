export function getAlerts(envName = "all") {
    let info = {
        "namespace": "default",
        "actor": "alerta",
        "command": "list_alerts_by_env",
        "args": {
            'env_name': envName
        },
        "headers": {
            "response_type": "json",
            "content_type": "json",
        }
    }
    console.log(info);
    return GEDIS_CLIENT.execute(info);
}