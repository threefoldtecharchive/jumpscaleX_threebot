import { JetView } from "webix-jet";

export default class JobsView extends JetView {
    config() {


        const view = {
            rows: [
                {
                    view: "template",
                    type: "header", template: "Jobs",
                },
            ]
        };

        return view;
    }

    init(view) {

    }
}
