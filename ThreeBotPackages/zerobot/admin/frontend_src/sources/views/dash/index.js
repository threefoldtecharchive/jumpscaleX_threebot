import {
	JetView
} from "webix-jet";

import NetworkInfoView from "./networkInfo";

export default class TopView extends JetView {
	config() {
		return {
			type: "space",
			rows: [
				// {
				// 	type:"wide",
				// 	cols:[ { $subview:"dash.currencies" }, { $subview:"dash.progress" } ]
				// },
				// { type:"wide", cols:[
				// 	{ $subview:"dash.reviews" },
				// 	{ type:"wide", rows:[
				// 		{ $subview:"dash.stats" },
				// 		{ $subview:"dash.projects" }
				// 	]}
				// ]}
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