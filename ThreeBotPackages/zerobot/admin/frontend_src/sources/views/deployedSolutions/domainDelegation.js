import { BaseView } from './baseview'
import { solutions } from '../../services/deployedSolutions'

const CHAT = "solutions.chatflow?author=tfgrid_solutions&package=tfgrid_solutions&chat=domain_delegation"
export default class DeployedDomainDelegationView extends BaseView {
    constructor(app, name) {
        super(app, name, CHAT, "domain.png");
    }
    init(view) {
        super.init(view)
        let self = this
        self.parseData = []
        solutions.listSolution('delegated_domain').then((data) => {
            const solutions = data.json().solutions
            console.log('delegation : >>>',solutions)
            for (let i = 0; i < solutions.length; i++) {
                const solution = solutions[i];
                let dict = JSON.parse(solution.form_info)
                let reservation = JSON.parse(String(solution.reservation))
                dict['Expiration Provisioning'] = reservation.data_reservation.expiration_provisioning
                dict['Currencies'] = reservation.data_reservation.currencies
                dict.id = dict.rid
                dict._name = dict.domain;
                dict._ip = ""

                delete dict['rid']
                self.parseData.push(dict)
            }
            self.solutionlist.parse(self.parseData)
        });
    }
}


