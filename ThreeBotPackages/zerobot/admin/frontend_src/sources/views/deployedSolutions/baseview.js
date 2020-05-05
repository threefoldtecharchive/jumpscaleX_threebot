import { JetView, plugins } from "webix-jet";
import SolutionDetailsView from './SolutionDetails'


export class BaseView extends JetView {
    constructor(app, name ,chat, logo) {
        super(app, name);
        this.logo = logo || "3bot.png";
        this.chat = chat;
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
            localId:"solutionMenu",
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
                template: "<div class='overall'><div class='title'>#name#</div><div class='ip'>#ip# </div> </div>"
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

        self.solutionlist.add({
            name:"Create new",
            ip:"",
            id:'-1'
        }, 0);
        self.solutionlist.addCss(self.solutionlist.getFirstId(),'createnewdiv')

        self.solutionlist.attachEvent("onItemClick", function (id) {
            if(id == -1){
                self.show(self.chat)
            }
        });

        self.solutionlist.attachEvent("onItemDblClick", function (id) {
            if(id != -1){
                let ret = self.parseData.find(solution => solution.id == id)
                self.SolutionDetailsView.showInfo(ret)
            }
        });
    }
}
