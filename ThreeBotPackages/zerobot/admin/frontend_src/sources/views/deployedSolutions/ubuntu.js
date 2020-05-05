
import { BaseView } from './baseview'
import { solutions } from '../../services/deployedSolutions'

const CHAT ="solutions.chatflow?author=tfgrid_solutions&package=tfgrid_solutions&chat=ubuntu_deploy"

export default class DeployedUbuntuView extends BaseView {
    constructor(app, name) {
        
        super(app, name, CHAT, "ubuntu.png");
    }

    init(view) {
        super.init(view)
        let self = this
        self.parseData = []
        solutions.listSolution('ubuntu').then((data) => {
            const solutions = data.json().solutions
            for (let i = 0; i < solutions.length; i++) {
                const solution = solutions[i];
                let dict = JSON.parse(solution.form_info)
                let reservation = JSON.parse(String(solution.reservation))
                dict.id = reservation.id
                
                // Assign new key
                dict.name = dict['Solution name'];
                dict.ip = dict['IP Address']
                delete dict['IP Address']  
                delete dict['Solution name'];
                
                self.parseData.push(dict)
            }
            self.solutionlist.parse(self.parseData)
        });
    }
}