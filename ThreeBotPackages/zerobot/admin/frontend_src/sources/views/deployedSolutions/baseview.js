import { JetView } from "webix-jet";
import SolutionDetailsView from './SolutionDetails'


export class BaseView extends JetView {
    constructor(app, name, logo) {
        super(app, name);

        this.logo = logo || "3bot.png";
        console.log("baseview:  ",this.data)
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
            view: "dataview",
            id: "solutionlist",
            data: this.data,
            width: 1000,
            height: 600,
            scroll:false,
            select: 1,
            css: "solutions-list",
            type: {
                width: 480,
                height: 120,
                template: "<div class='overall'><div class='title'>#name#</div><div class='ip'>#iprange# </div> </div>"
            }
        }
        
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
        let self = this;
        self.solutionlist = $$("solutionlist")
        self.SolutionDetailsView = self.ui(SolutionDetailsView)
    }
}
