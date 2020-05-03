import { JetView } from "webix-jet";

export default class DeployedSolutionExposeView extends JetView {
    config() {

        let data = [
            {
                id: "1", type: "folder", value: "solution1", data: [
                    { id: "p_0_1", type: "file", value: "ID" },
                    { id: "p_0_0", type: "file", value: "name" }
                ]
            },
            {
                id: "2", type: "folder", value: "solution2", data: [
                    { id: "p_1_1", type: "file", value: "ID" },
                    { id: "p_1_0", type: "file", value: "name" }
                ]
            },
            {
                id: "3", type: "folder", value: "solution3", data: [
                    { id: "p_2_1", type: "file", value: "ID" },
                    { id: "p_2_0", type: "file", value: "name" }
                ]
            }
        ];

        const logo = {
            view: "template",
            template: '<img class="deployed-solution-icon" src="static/img/3bot.png"/>',
            css: 'deployed-solution-logo-view',
            align: "center",
            borderless: true,
            height: 250
        }

        const view = {
            view: "grouplist",
            data: data,
            css: 'solutions-list',
            scroll: 'auto',
            width: 700,
            borderless: true
        };

        return {
            type: "space",
            rows:
            [
                logo,
                {cols:[{}, view, {}]}
            ]
        };
    }

    init(view) {

    }
}