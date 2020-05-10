import { BaseView } from './baseview'
import { solutions } from '../../services/deployedSolutions'

const CHAT = "solutions.chatflow?author=tfgrid_solutions&package=tfgrid_solutions&chat=gitea_deploy"
export default class DeployedGiteaView extends BaseView {
    constructor(app, name) {
        super(app, name, CHAT, "gitea.png");
    }
    init(view) {
        super.init(view)
        let self = this
        self.parseData = []
        solutions.listSolution('gitea').then((data) => {
            const solutions = data.json().solutions
            for (let i = 0; i < solutions.length; i++) {
                const solution = solutions[i];
                let dict = JSON.parse(solution.form_info)
                let reservation = JSON.parse(String(solution.reservation))
                dict['Network'] = reservation.data_reservation.containers[0].network_connection[0].network_id
                dict.id = reservation.id
                dict._name = dict['Solution name'].length > self.maxTitleLength ?
                    dict['Solution name'].substring(0, self.maxTitleLength) + '...' : dict['Solution name'];
                dict._ip = dict['IP Address']

                delete dict['chatflow']
                self.parseData.push(dict)
            }
            self.solutionlist.parse(self.parseData)
            self.solutionlist.showProgress({hide: true});
        });
    }
}