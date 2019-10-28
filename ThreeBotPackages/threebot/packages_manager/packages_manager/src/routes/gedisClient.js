import axios from 'axios';

const baseUrl = "/web/gedis/http/package_manager"

export function getPackages() {
    return (axios.post(baseUrl + "/packages_list"))
}

export function addPackage(method, value) {
    let args = {};
    args[method] = value;
    console.log(JSON.stringify(args))
    return (axios.post(baseUrl + "/package_add", { "args": args}))
}

export function enablePackage(name) {
    return (axios.post(baseUrl + "/package_enable", { "args": { "name": name } }))
}

export function disablePackage(name) {
    return (axios.post(baseUrl + "/package_disable", { "args": { "name": name } }))
}

export function stopPackage(name) {
    return (axios.post(baseUrl + "/package_stop", { "args": { "name": name } }))
}

export function startPackage(name) {
    return (axios.post(baseUrl + "/package_start", { "args": { "name": name } }))
}

export function deletePackage(name) {
    return (axios.post(baseUrl + "/package_delete", { "args": { "name": name } }))
}