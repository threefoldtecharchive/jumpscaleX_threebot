import { BaseView } from './baseview'
import { solutions } from '../../services/deployedSolutions'

const CHAT = "solutions.chatflow?author=tfgrid_solutions&package=tfgrid_solutions&chat=solution_expose"
export default class DeployedSolutionExposeView extends BaseView {
    constructor(app, name) {
        super(app, name, CHAT, "wan.png");
    }

    init(view) {
        super.init(view)
        let self = this
        self.parseData = []
        solutions.listSolution('exposed').then((data) => {
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
