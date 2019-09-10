
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

export function deleteAll() {
    let info = {
        "namespace": "default",
        "actor": "alerta",
        "command": "delete_all_alerts",
        "headers": {
            "response_type": "json",
            "content_type": "json",
        }
    }

    console.log(info);
    return GEDIS_CLIENT.execute(info);
}

export function deleteAlert(alertId) {
    let info = {
        "namespace": "default",
        "actor": "alerta",
        "command": "delete_alert",
        "args": {
            'alert_id': alertId
        },
        "headers": {
            "response_type": "json",
            "content_type": "json",
        }
    }

    console.log(info);
    return GEDIS_CLIENT.execute(info);
}

