import { Service } from "../common/api";

const BASE_URL = "/zerobot/packagemanager/actors/package_manager";


class PackagesService extends Service {
    constructor() {
        super(BASE_URL);
    }

    list() {
        return this.getCall("packages_list");
    }

    add(path, gitUrl) {
        return this.postCall("package_add", {
            path: path,
            git_url: gitUrl
        });
    }

    delete(packageName) {
        return this.postCall("package_delete", { name: packageName });

    }

    start(packageName) {
        return this.postCall("package_start", { name: packageName });
    }

    stop(packageName) {
        return this.postCall("package_stop", { name: packageName });

    }

    disable(packageName) {
        return this.postCall("package_disable", { name: packageName });

    }

    enable(packageName) {
        return this.postCall("package_enable", { name: packageName });
    }
}


export const packages = new PackagesService();
