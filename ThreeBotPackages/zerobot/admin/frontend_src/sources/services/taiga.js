import { Service } from "../common/api";

const BASE_URL = "/tfgrid/taiga/actors/taiga";


class TaigaService extends Service {
    constructor() {
        super(BASE_URL);
    }

    userCircles(username) {
        return this.postCall("get_user_circles", { username: username, output_type: "json" });
    }

    userStories(username) {
        return this.postCall("get_user_stories", { username: username, output_type: "json" });
    }

    userTasks(username) {
        return this.postCall("get_user_tasks", { username: username, output_type: "json" });
    }

}


export const taiga = new TaigaService();
