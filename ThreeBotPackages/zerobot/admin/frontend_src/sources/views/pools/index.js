import { JetView } from "webix-jet";

import { pools } from "../../services/pools";

const CHAT = "solutions.chatflow?author=tfgrid_solutions&package=tfgrid_solutions&chat=pool_reservation"

export default class PoolsView extends JetView {
    config() {
        const view = {
            rows: [{
                cols: [{
                //Header
                view: "template",
                type: "header",
                template: "Pools",
                },
                { batch: "default" },
                //Add/extend button
                {
                    view: "button",
                    id: "create_pool",
                    value: "Create/Extend pool",
                    autowidth: true,
                    click: function () {
                        this.$scope.show(CHAT)
                    }
                }
                ]
            },
            { //DataTable
                view: "datatable",
                id: "pools_table",
                resizeColumn: true,
                type: {
                    height: 200,
                },
                scroll: "xy",
                autoConfig: true,
                view: "datatable",
                select: true,
                css: "webix_header_border webix_data_border",
                onContext: {},
                columns: [{
                    id: "index",
                    header: "#",
                    sort: "int",
                },
                {
                    id: "pool_id",
                    header: "Pool ID",
                    sort: "string",
                }, {
                    id: "sus",
                    header: "Storage units",
                    sort: "string",
                    width: 170
                },
                {
                    id: "available_su",
                    header: "Available storage units",
                    sort: "string",
                    width: 170
                },
                {
                    id: "active_su",
                    header: "Active storage units",
                    sort: "string",
                    width: 170
                },
                {
                    id: "cus",
                    header: "Cloud units",
                    sort: "string",
                    width: 170
                },
                {
                    id: "available_cu",
                    header: "Available cloud units",
                    sort: "string",
                    width: 170
                },
                {
                    id: "active_cu",
                    header: "Active cloud units",
                    sort: "string",
                    width: 170
                },
                {
                    id: "empty_at",
                    header: "Expiration",
                    sort: "string",
                    width: 170
                }
                ],
                scheme: {
                    $init: function (obj) {
                        obj.available_cu = obj.cus - obj.active_cu
                        obj.available_su = obj.sus - obj.active_su
                        if (obj.empty_at < 9223372036854775807) {
                            var d = new Date(0)
                            d.setUTCSeconds(obj.empty_at)
                            obj.empty_at = d
                        } else {
                            obj.empty_at = "_"
                        }

                        obj.index = this.count();
                    }
                }
            }
            ]
        };
        return view;
    }

    init(view) {
        const self = this;
        this.poolsTable = this.$$("pools_table");
        pools.list().then(data => {
            this.poolsTable.parse(data.json());
        });
    }
}
