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


    delete(solutionType, solutionName) {
        return this.postCall("solution_delete", { solution_type: solutionType, solution_name: solutionName });

    }

}

export const solutions = new SolutionsService();
