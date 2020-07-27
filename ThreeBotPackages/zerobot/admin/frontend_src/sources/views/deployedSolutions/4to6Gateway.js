import { BaseView } from './baseview'
import { solutions } from '../../services/deployedSolutions'

const CHAT = "solutions.chatflow?author=tfgrid_solutions&package=tfgrid_solutions&chat=four_to_six_gateway"
export default class Deployed4to6GatewayView extends BaseView {
    constructor(app, name) {
        super(app, name, CHAT, "ip.png");
    }

    init(view) {
        super.init(view)
        let self = this
        self.parseData = []
        solutions.listSolution('4to6gw').then((data) => {
            const solutions = data.json().solutions
            for (let i = 0; i < solutions.length; i++) {
                let solution = solutions[i];
                solution._ip = ""
                solution._name = solution.Name.length > self.maxTitleLength ?
                    solution.Name.substring(0, self.maxTitleLength) + '...' : solution.Name
                self.parseData.push(solution)
            }
            self.solutionlist.parse(self.parseData);
            self.solutionlist.showProgress({ hide: true });
        });
    }
}
