import { Service } from "../common/api";

const BASE_URL = "/tfgrid_solutions/tfgrid_solutions/actors/tfgrid_solutions";


class SolutionsService extends Service {
    constructor() {
        super(BASE_URL);
    }


    list(opts) {
        opts = opts || {};
        return this.getCall("solutions_list");
    }

    listSolution(solutionType){
        return this.postCall("solutions_list",{solution_type: solutionType})
    }


    cancel(wids) {
        return this.postCall("solution_cancel", { wids: wids });

    }

}

export const solutions = new SolutionsService();
