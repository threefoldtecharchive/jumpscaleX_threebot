import { BaseView } from './baseview'

let data = [
    {
        id: "1", type: "folder", value: "solution1", data: [
            { id: "p_0_1", type: "file", value: "ID" },
            { id: "p_0_0", type: "file", value: "name" }
        ]
    },
    {
        id: "2", type: "folder", value: "solution2", data: [
            { id: "p_1_1", type: "file", value: "ID" },
            { id: "p_1_0", type: "file", value: "name" }
        ]
    },
    {
        id: "3", type: "folder", value: "solution3", data: [
            { id: "p_2_1", type: "file", value: "ID" },
            { id: "p_2_0", type: "file", value: "name" }
        ]
    }
];

export default class DeployedSolutionExposeView extends BaseView {

    constructor(app, name) {
        super(app, name, data);
    }
}

