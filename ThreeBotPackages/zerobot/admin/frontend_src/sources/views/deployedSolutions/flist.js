import { BaseView } from './baseview'
import { solutions } from '../../services/deployedSolutions'

const CHAT = "solutions.chatflow?author=tfgrid_solutions&package=tfgrid_solutions&chat=your_flist"
export default class DeployedFlistView extends BaseView {
    constructor(app, name) {
        super(app, name, CHAT, "flist.png");
    }
    init(view) {
        super.init(view)
        let self = this
        let parseData = []
        solutions.listSolution('flist').then((data) => {
            const solutions = data.json().solutions
            console.log("flist:  ", solutions)
            // for (let i = 0; i < solutions.length; i++) {
            //     const solution = solutions[i];
            //     let dict = JSON.parse(solution.form_info)
            //     let reservation = JSON.parse(String(solution.reservation))
            //     dict.id = reservation.id

            //     // Assign new key
            //     dict.name = dict['Solution name'];
            //     dict.ip = dict['IP Address']
            //     delete dict['IP Address']
            //     delete dict['Solution name'];

            //     parseData.push(dict)
            // }
            // self.solutionlist.parse(parseData)
        });
    }
}


