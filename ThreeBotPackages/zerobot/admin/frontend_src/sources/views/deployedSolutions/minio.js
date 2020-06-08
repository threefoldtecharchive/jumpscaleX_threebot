import { BaseView } from './baseview'
import { solutions } from '../../services/deployedSolutions'

const CHAT = "solutions.chatflow?author=tfgrid_solutions&package=tfgrid_solutions&chat=minio_deploy"
export default class DeployedMinioView extends BaseView {
    constructor(app, name) {
        super(app, name, CHAT, "minio.png");
    }

    init(view) {
        super.init(view)
        let self = this
        self.parseData = []
        solutions.listSolution('minio').then((data) => {
            const solutions = data.json().solutions
            for (let i = 0; i < solutions.length; i++) {
                const solution = solutions[i];
                let dict = JSON.parse(solution.form_info)
                let reservation = JSON.parse(String(solution.reservation))
                let ip = reservation.data_reservation.containers[0].network_connection[0].ipaddress
                console.log(ip)
                dict._type = 'minio'
                dict['IP address']=ip
                dict.id = reservation.id
                dict._name = dict['Solution name'].length > self.maxTitleLength ?
                    dict['Solution name'].substring(0, self.maxTitleLength) + '...' : dict['Solution name'];
                dict._ip = ip

                delete dict['chatflow']
                self.parseData.push(dict)
            }
            self.solutionlist.parse(self.parseData);
            self.solutionlist.showProgress({hide: true});
        });
    }
}

