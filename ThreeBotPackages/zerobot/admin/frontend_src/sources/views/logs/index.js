import { JetView } from "webix-jet";

export default class LogsView extends JetView {
    config() {


        const view = {
            rows: [
                {
                    view: "template",
                    type: "header", template: "Logs",
                },
            ]
        };

        return view;
    }

    init(view) {

    }
}
