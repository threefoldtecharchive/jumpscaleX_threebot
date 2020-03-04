import {
	JetView
} from "webix-jet";

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
					{ $subview: "dash.runningPorts" }]
				},
			]
		};
	}


	init(view) {
		// this.use(plugins.ProgressBar, "progress");
		var self = this;

		// webix.ready(function () {
		// 	webix.ajax().get("/zerobot/admin/actors/health/get_", function (data) {
		// 		console.log(data)
		// 	});
		// });
	}
}
