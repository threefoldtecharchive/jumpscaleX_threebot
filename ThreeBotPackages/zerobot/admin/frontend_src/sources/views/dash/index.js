import { JetView } from "webix-jet";

export default class TopView extends JetView {
	config() {
		return {
			type: "space",
			responsive: true,
			rows: [
				{
					cols: [{
						$subview: "dash.jsxInfo"
					},
					{
						$subview: "dash.health"
					},
					{
						$subview: "dash.diskSpace"
					}
					]
				},
				{
					cols: [{
						$subview: "dash.processes"
					},
					{ $subview: "dash.processesList" },
					{ $subview: "dash.runningPorts" }
				]
				},
			]
		};
	}
}
