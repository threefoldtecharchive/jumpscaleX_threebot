import {
	JetView
} from "webix-jet";

import NetworkInfoView from "./networkInfo";

export default class TopView extends JetView {
	config() {
		return {
			type: "space",
			responsive: true,
			rows: [
				{
					cols: [{
						$subview: "dash.networkInfo"
					},
					{
						$subview: "dash.bcdbHealth"
					},
					{
						$subview: "dash.jsxVersion"
					}
					]
				},
				{
					cols: [{
						$subview: "dash.processes"
					}, {}]
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
