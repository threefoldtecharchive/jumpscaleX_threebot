import { JetView } from "webix-jet";

export default class WikisView extends JetView {
    config() {
        return {
            view: "iframe",
            id: "iframe-wikis",
            src: "/wiki"
        };
    }
}
