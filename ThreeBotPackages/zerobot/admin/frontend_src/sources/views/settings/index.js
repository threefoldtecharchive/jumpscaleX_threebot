import { JetView } from "webix-jet";

import AdminsView from "./admins";

export default class SettingsView extends JetView {
    config() {
        const view = {
            view: "tabview",
            cells: [{
                header: "Administrators",
                body: AdminsView
            }]
        };

        return view;
    }

    init(view) {
    }
}
