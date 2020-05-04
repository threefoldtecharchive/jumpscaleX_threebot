import { BaseView } from './baseview'
import { solutions } from '../../services/deployedSolutions'
import SolutionDetailsView from './SolutionDetails'

export default class DeployedNetworkView extends BaseView {
    constructor(app, name) {
        
        super(app, name, "network.png");
    }
    
    init(view){
        super.init(view)
        let self = this
        // self.SolutionDetailsView = self.ui(SolutionDetailsView)
        let parseData = []
        solutions.listSolution('network').then((data) => {
            const solutions = data.json().solutions
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
                    dict.nodes.push({ 'node_id': node.node_id, 'iprange': node.iprange })
                }
                parseData.push(dict)
            }
            console.log(parseData)
            self.solutionlist.parse(parseData)
        });

        self.solutionlist.attachEvent("onItemDblClick", function (id) {
            let ret = parseData.find(solution => solution.id == id)
            self.SolutionDetailsView.showInfo(ret)
        });
    }
}
