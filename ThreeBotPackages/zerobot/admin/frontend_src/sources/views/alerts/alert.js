import AnsiUp from "ansi_up";
import { JetView } from "webix-jet";

const MAX_MSG_LEN = 100;

export default class AlertView extends JetView {
    config() {
        return {
            view: "window",
            modal: true,
            position: "center",
            body: {
                view: "form",
                elements: [
                    {
                        view: "text",
                        label: "ID",
                        readonly: true
                    },
                    {
                        view: "text",
                        label: "Type",
                        readonly: true
                    },
                ]
            }
        };
    }

    showFor(item) {
        this.getRoot().show();
    }
}
