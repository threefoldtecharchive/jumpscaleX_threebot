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
            console.log('exposed : >>>',solutions)
            for (let i = 0; i < solutions.length; i++) {
                const solution = solutions[i];
                let dict = JSON.parse(solution.form_info)
                let reservation = JSON.parse(String(solution.reservation))
                dict.id = reservation.id
                dict._name = dict['Solution name'];
                dict._ip = ""

                self.parseData.push(dict)
            }
            self.solutionlist.parse(self.parseData)
        });
    }
}


