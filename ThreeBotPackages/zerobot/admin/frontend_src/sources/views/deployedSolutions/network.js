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
                let solution = solutions[i];
                solution._ip = solution["IP Range"]
                solution._name = solution.Name.length > self.maxTitleLength ?
                    solution.Name.substring(0, self.maxTitleLength) + '...' : solution.Name
                let nodes = []
                for (const [key, value] of Object.entries(solution.nodes)) {
                    nodes.push({ 'node_id': key, 'iprange': value })
                }
                solution.nodes = nodes;
                self.parseData.push(solution)
            }
            self.solutionlist.parse(self.parseData);
            self.solutionlist.showProgress({ hide: true });
        });
    }
}
