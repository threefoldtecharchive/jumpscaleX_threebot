import { JetView } from "webix-jet";


import AdminsView from "./admins";
import GeneralView from "./general";

export default class SettingsView extends JetView {
    config() {
        const view = {
            view: "tabview",
            cells: [{
                header: "General",
                body: GeneralView,
            }, {
                header: "Administrators",
                body: AdminsView
            }]
        };

        return view;
    }

    init(view) {
    }
}
