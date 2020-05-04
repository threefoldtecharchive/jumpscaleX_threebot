import { JetView } from "webix-jet";

export class BaseView extends JetView {
    constructor(app, name, data, logo) {
        super(app, name);

        this.logo = logo || "3bot.png";
        this.data = data;
    }

    config() {
        const logo = {
            view: "template",
            template: `<img class="deployed-solution-icon" src="static/img/${this.logo}">`,
            css: 'deployed-solution-logo-view',
            align: "center",
            borderless: true,
            height: 250
        }

        const view = {
            view: "grouplist",
            data: this.data,
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
                    { cols: [{}, view, {}] }
                ]
        };
    }

    init(view) {
    }
}
