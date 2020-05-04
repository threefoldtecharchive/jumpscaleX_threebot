import { JetView } from "webix-jet";
import { solutions } from '../../services/deployedSolutions'
import SolutionDetailsView from './SolutionDetails'

export default class DeployedNetworkView extends JetView {
    config() {

        const logo = {
            view: "template",
            template: '<img class="deployed-solution-icon" src="static/img/network.png"/>',
            css: 'deployed-solution-logo-view',
            align: "center",
            borderless: true,
            height: 250
        }

        const view = {
            view: "dataview",
            id: "networklist",
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
        let self = this
        self.networkList = $$("networklist")
        self.SolutionDetailsView = self.ui(SolutionDetailsView)


        solutions.listSolution('network').then((data) => {
            const solutions = data.json().solutions
            self.parseData = []
            for (let i = 0; i < solutions.length; i++) {
                const solution = solutions[i];
                let dict = {}
                let reservation = JSON.parse(String(solution.reservation))
                let nodes = reservation.data_reservation.networks[0].network_resources
                dict.id = reservation.id
                dict.name = solution.name
                dict.expiration_provisioning = reservation.data_reservation.expiration_provisioning
                dict.expiration_reservation = reservation.data_reservation.expiration_reservation
                dict.currencies = reservation.data_reservation.currencies.join(' ')
                dict.expiration = JSON.parse(solution.form_info)['Solution expiration']
                dict.iprange = reservation.data_reservation.networks[0].iprange
                dict.nodes = []
                for (let i = 0; i < nodes.length; i++) {
                    const node = nodes[i];
                    dict.nodes.push({'node_id':node.node_id,'iprange':node.iprange})
                }
                self.parseData.push(dict)
            }
            self.networkList.parse(self.parseData)

        });
        
        self.networkList.attachEvent("onItemDblClick", function (id) {
            let ret = self.parseData.find(network => network.id == id)
            self.SolutionDetailsView.showInfo(ret)
        });
    }
}