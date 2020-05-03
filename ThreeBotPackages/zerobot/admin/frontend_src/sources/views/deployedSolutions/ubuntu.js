import { JetView } from "webix-jet";

export default class DeployedUbuntuView extends JetView {
    config() {

        let data = [
            {
                id: "1", type: "folder", value: "Ubuntu1", data: [
                    { id: "p_0_1", type: "file", value: "ID" },
                    { id: "p_0_0", type: "file", value: "name" },
                    { id: "p_0_2", type: "file", value: "network" },
                    { id: "p_0_3", type: "file", value: "hostname" },
                    { id: "p_0_4", type: "file", value: "SSh-key" },
                    { id: "p_0_5", type: "file", value: "ip-address" },
                    { id: "p_0_6", type: "file", value: "CPU" },
                    { id: "p_0_7", type: "file", value: "Memory" }
                ]
            },
            {
                id: "2", type: "folder", value: "Ubuntu2", data: [
                    { id: "p_1_1", type: "file", value: "ID" },
                    { id: "p_1_0", type: "file", value: "name" },
                    { id: "p_1_2", type: "file", value: "network" },
                    { id: "p_1_3", type: "file", value: "hostname" },
                    { id: "p_1_4", type: "file", value: "SSh-key" },
                    { id: "p_1_5", type: "file", value: "ip-address" },
                    { id: "p_1_6", type: "file", value: "CPU" },
                    { id: "p_1_7", type: "file", value: "Memory" }
                ]
            },
            {
                id: "3", type: "folder", value: "Ubuntu3", data: [
                    { id: "p_2_1", type: "file", value: "ID" },
                    { id: "p_2_0", type: "file", value: "name" },
                    { id: "p_2_2", type: "file", value: "network" },
                    { id: "p_2_3", type: "file", value: "hostname" },
                    { id: "p_2_4", type: "file", value: "SSh-key" },
                    { id: "p_2_5", type: "file", value: "ip-address" },
                    { id: "p_2_6", type: "file", value: "CPnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnU" },
                    { id: "p_2_7", type: "file", value: "Memory" }
                ]
            }
        ];

        const logo = {
            view: "template",
            template: '<img class="solutions-icon" src="static/img/ubuntu.png"/>'
        }

        const view = {
            view: "grouplist",
            scroll: false,
            data: data,
            css: 'solutions_list',
            scroll: 'xy'
        };
        return {
            type: "space",
            rows: [

                logo
                ,

                view

            ]
        };
    }

    init(view) {

    }
}