import { BaseView } from './baseview'
import { solutions } from '../../services/deployedSolutions'

const CHAT = "solutions.chatflow?author=tfgrid_solutions&package=tfgrid_solutions&chat=network_deploy"

export default class DeployedNetworkView extends BaseView {
    constructor(app, name) {
        super(app, name, CHAT, "network.png");
    }

    init(view) {
        super.init(view)
        let self = this
        self.parseData = []
        solutions.listSolution('network').then((data) => {
            const solutions = data.json().solutions
            for (let i = 0; i < solutions.length; i++) {
                const solution = solutions[i];
                let dict = {}
                let reservation = JSON.parse(String(solution.reservation))
                let nodes = reservation.data_reservation.networks[0].network_resources
                dict.id = reservation.id
                dict['Solution name']=solution.name
                dict.expiration_provisioning = reservation.data_reservation.expiration_provisioning
                dict.expiration_reservation = reservation.data_reservation.expiration_reservation
                console.log("expiration: >> ",solution)
                dict.currencies = reservation.data_reservation.currencies.join(' ')
                dict.expiration = JSON.parse(String(solution.form_info))['Solution expiration']
                dict['IP Address'] = reservation.data_reservation.networks[0].iprange
                dict._ip = reservation.data_reservation.networks[0].iprange
                dict._name = solution.name
                dict.nodes = []
                for (let i = 0; i < nodes.length; i++) {
                    const node = nodes[i];
                    dict.nodes.push({ 'node_id': node.node_id, 'iprange': node.iprange })
                }
                self.parseData.push(dict)
            }
            self.solutionlist.parse(self.parseData)
        });
    }
}
