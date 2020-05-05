import { BaseView } from './baseview'
import { solutions } from '../../services/deployedSolutions'

const CHAT = "solutions.chatflow?author=tfgrid_solutions&package=tfgrid_solutions&chat=solution_expose"
export default class DeployedSolutionExposeView extends BaseView {
    constructor(app, name) {
        super(app, name, CHAT);
    }

    init(view) {
        super.init(view)
        let self = this
        // let parseData = []
        // solutions.listSolution('ubuntu').then((data) => {
        //     const solutions = data.json().solutions
        //     for (let i = 0; i < solutions.length; i++) {
        //         const solution = solutions[i];
        //         let dict = JSON.parse(solution.form_info)
        //         let reservation = JSON.parse(String(solution.reservation))
        //         dict.id = reservation.id
                
                
        //         parseData.push(dict)
        //     }
        //     self.solutionlist.parse(parseData)
        // });
    }
}

