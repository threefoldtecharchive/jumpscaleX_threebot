import { Service } from "../common/api";

const BASE_URL = "/zerobot/webinterface/actors/mdbook";

class WikisService extends Service {
    constructor() {
        super(BASE_URL);
    }

    list(opts) {
        opts = opts || {};
        return this.getCall("books_list");
    }
}


export const packages = new WikisService();