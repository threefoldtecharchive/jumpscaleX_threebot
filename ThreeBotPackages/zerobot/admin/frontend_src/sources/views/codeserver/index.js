import { JetView } from "webix-jet";

export default class CodeserverView extends JetView {
    config() {
        return {
            view: "iframe",
            id: "iframe-codeserver",
            src: "/codeserver"
        };
    }
}
