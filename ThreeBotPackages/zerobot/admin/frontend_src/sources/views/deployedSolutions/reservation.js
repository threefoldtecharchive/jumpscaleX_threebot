import { JetView } from "webix-jet";

import { ansiUp } from "../../common/colors";

export default class ReservationView extends JetView {
    config() {
        const info = {
            view: "form",
            id: "form",
            elementsConfig: { labelWidth: 140 },
            elements: [
                {
                    view: "text",
                    label: "ID",
                    name: "id",
                    readonly: true
                },
                {
                    view: "text",
                    label: "Customer tid",
                    name: "customer_tid",
                    readonly: true
                },
                {
                    view: "text",
                    label: "Next action",
                    name: "next_action",
                    readonly: true
                },
                {
                    view: "text",
                    label: "expiration",
                    name: "expiration",
                    readonly: true
                }
            ]
        };

        const tab = {
            view: "tabview",
            id: "tabview",
            cells: [
                {

                    header: "Overview",
                    autowidth:true,
                    scroll:'xy',
                    rows: [
                        info,
                        {
                            id:"formInfo",
                            view:"datatable",
                            on: {
                                onAfterRender: function() {
                                    var workloads = ["networks", "zdbs", "volumes", "containers", "kubernetes"];
                                    for (var index = 0; index < workloads.length; index++) {
                                        var item = workloads[index];
                                        var selector = ".webix_item_tab[button_id='" + item  + "']";
                                        var tab = document.querySelector(selector);
                                        if (tab) {
                                            var data = $$(item);
                                            if (data) {
                                                tab.style.display = data.count() == 0 ? "none": "";
                                            }
                                        }
                                    }
                                }
                            },
                            resizeColumn: true,
                            scroll: "xy",

                            columns: [{
                                id: "key",
                                header: "Key",
                                width:130
                            },
                            {
                                id: "value",
                                header: "Value",
                                scroll: "x",
                                // ssh is too long
                                width:'4000'
                            }]
                        }
                    ]


                },
                {
                    id: "networks",
                    header: "Networks",
                    view: "datatable",
                    resizeColumn: true,
                    select: true,
                    multiselect: true,
                    css: "webix_header_border webix_data_border",
                    scroll: true,
                    autoConfig: true,
                    columns: [
                        {
                            id: "index",
                            header: "#",
                            sort: "int",
                            autowidth: true,
                            width: 60
                        },
                        {
                            id: "network_name",
                            header: "Name",
                            sort: "string",
                            width: 180
                        },
                        {
                            id: "ip_range",
                            header: "Ip range",
                            sort: "string",
                            width: 180
                        },
                        {
                            id: "farmer_tid",
                            header: "Farmer",
                            sort: "string",
                            width: 180
                        }
                    ],
                    scheme: {
                        $init: function (obj) {
                            obj.network_name = obj.name;
                            obj.ip_range = obj.iprange;
                            obj.farmer_tid = obj.farmer_tid;
                            obj.index = this.count();
                        }
                    }, on: {
                        onAfterLoad: function () {
                            if (!this.count())
                                this.showOverlay("No networks in reservation");
                            else
                                this.hideOverlay();
                        }
                    }
                },
                {
                    id: "containers",
                    header: "Containers",
                    view: "datatable",
                    resizeColumn: true,
                    select: true,
                    multiselect: true,
                    css: "webix_header_border webix_data_border",
                    scroll: true,
                    autoConfig: true,
                    columns: [
                        {
                            id: "index",
                            header: "#",
                            sort: "int",
                            autowidth: true,
                            width: 60
                        }, {
                            id: "node_id",
                            header: "Node id",
                            sort: "string",
                            autowidth: true,
                            width: 180
                        }, {
                            id: "flist",
                            header: "Flist",
                            sort: "string",
                            autowidth: true,
                            width: 180
                        }, {
                            id: "entrypoint",
                            header: "Entrypoint",
                            sort: "string",
                            autowidth: true,
                            width: 180
                        },
                        {
                            id: "hub_url",
                            header: "Hub url",
                            sort: "string",
                            autowidth: true,
                            width: 180
                        }, {
                            id: "interactive",
                            header: "Interactive",
                            sort: "string",
                            autowidth: true,
                            width: 180
                        }, {
                            id: "farmer_tid",
                            header: "Farmer_tid",
                            sort: "string",
                            autowidth: true,
                            width: 180
                        },

                    ],
                    scheme: {
                        $init: function (obj) {
                            obj.node_id = obj.node_id;
                            obj.flist = obj.flist;
                            obj.entrypoint = obj.entrypoint;
                            obj.hub_url = obj.hub_url;
                            obj.interactive = obj.interactive;
                            obj.farmer_tid = obj.farmer_tid;
                            obj.index = this.count();
                        }
                    }, on: {
                        onAfterLoad: function () {
                            if (!this.count())
                                this.showOverlay("No containers in reservation");
                            else
                                this.hideOverlay();
                        }
                    }
                },
                {
                    id: "volumes",
                    header: "Volumes",
                    view: "datatable",
                    resizeColumn: true,
                    select: true,
                    multiselect: true,
                    css: "webix_header_border webix_data_border",
                    scroll: true,
                    autoConfig: true,
                    columns: [
                        {
                            id: "index",
                            header: "#",
                            sort: "int",
                            autowidth: true,
                            width: 60
                        }, {
                            id: "node_id",
                            header: "Node id",
                            sort: "string",
                            autowidth: true,
                            width: 180
                        }, {
                            id: "size",
                            header: "Size",
                            sort: "string",
                            autowidth: true,
                            width: 180
                        }, {
                            id: "type",
                            header: "Type",
                            sort: "string",
                            autowidth: true,
                            width: 180
                        }, {
                            id: "farmer_tid",
                            header: "Farmer_tid",
                            sort: "string",
                            autowidth: true,
                            width: 180
                        },

                    ],
                    scheme: {
                        $init: function (obj) {
                            obj.node_id = obj.node_id;
                            obj.size = obj.size;
                            obj.type = obj.type;
                            obj.farmer_tid = obj.farmer_tid;
                            obj.index = this.count();
                        }
                    }, on: {
                        onAfterLoad: function () {
                            if (!this.count())
                                this.showOverlay("No volumes in reservation");
                            else
                                this.hideOverlay();
                        }
                    }
                }, {
                    id: "zdbs",
                    header: "Zdbs",
                    view: "datatable",
                    resizeColumn: true,
                    select: true,
                    multiselect: true,
                    css: "webix_header_border webix_data_border",
                    scroll: true,
                    autoConfig: true,
                    columns: [
                        {
                            id: "index",
                            header: "#",
                            sort: "int",
                            autowidth: true,
                            width: 60
                        }, {
                            id: "node_id",
                            header: "Node id",
                            sort: "string",
                            autowidth: true,
                            width: 180
                        }, {
                            id: "size",
                            header: "Size",
                            sort: "string",
                            autowidth: true,
                            width: 180
                        }, {
                            id: "disk_type",
                            header: "Disk type",
                            sort: "string",
                            autowidth: true,
                            width: 180
                        }, {
                            id: "mode",
                            header: "Mode",
                            sort: "string",
                            autowidth: true,
                            width: 180
                        }, {
                            id: "public",
                            header: "public",
                            sort: "string",
                            autowidth: true,
                            width: 180
                        }, {
                            id: "farmer_tid",
                            header: "Farmer_tid",
                            sort: "string",
                            autowidth: true,
                            width: 180
                        },

                    ],
                    scheme: {
                        $init: function (obj) {
                            obj.index = this.count();
                        }
                    }, on: {
                        onAfterLoad: function () {
                            if (!this.count())
                                this.showOverlay("No zdbs in reservation");
                            else
                                this.hideOverlay();
                        }
                    }
                }, {
                    id: "kubernetes",
                    header: "Kubernetes",
                    view: "datatable",
                    resizeColumn: true,
                    select: true,
                    multiselect: true,
                    css: "webix_header_border webix_data_border",
                    scroll: true,
                    autoConfig: true,
                    columns: [
                        {
                            id: "index",
                            header: "#",
                            sort: "int",
                            autowidth: true,
                            width: 60
                        }, {
                            id: "node_id",
                            header: "Node id",
                            sort: "string",
                            autowidth: true,
                            width: 180
                        }, {
                            id: "size",
                            header: "Size",
                            sort: "string",
                            autowidth: true,
                            width: 180
                        }, {
                            id: "network_id",
                            header: "Network id",
                            sort: "string",
                            autowidth: true,
                            width: 180
                        }, {
                            id: "ipaddress",
                            header: "Ip address",
                            sort: "string",
                            autowidth: true,
                            width: 180
                        }, {
                            id: "master_ips_str",
                            header: "Master ips",
                            sort: "string",
                            autowidth: true,
                            width: 180
                        }, {
                            id: "farmer_tid",
                            header: "Farmer_tid",
                            sort: "string",
                            autowidth: true,
                            width: 180
                        },

                    ],
                    scheme: {
                        $init: function (obj) {
                            obj.master_ips_str = obj.master_ips.toString()
                            obj.index = this.count();
                        }
                    }, on: {
                        onAfterLoad: function () {
                            if (!this.count())
                                this.showOverlay("No kubernetes in reservation");
                            else
                                this.hideOverlay();
                        }
                    }
                },

            ]
        };

        return {
            view: "window",
            head: "Reservation",
            id: "reservation_view",
            modal: true,
            width: window.innerWidth * .8,
            height: window.innerHeight * .8,
            position: "center",
            body: {
                rows: [
                    tab,
                    {
                        view: "button",
                        value: "OK",
                        css: "webix_primary",
                        click: function () {
                            this.getTopParentView().hide();
                        }
                    }
                ]
            }
        }
    }


    init() {
        var self = this;
        this.form = $$("form");

    }


    showFor(item) {
        let values = Object.assign({}, item);
        this.reservation_view = $$("reservation_view");
        this.reservation_view.getHead().setHTML("Reservation: " + item.solutionName);

        let reservation = item.reservation
        values.id = reservation.id
        values.customer_tid = reservation.customer_tid
        values.next_action = reservation.next_action
        values.results = reservation.results
        values.expiration = reservation.data_reservation.expiration_reservation

        values.containers = reservation.data_reservation.containers
        values.volumes = reservation.data_reservation.volumes
        values.zdbs = reservation.data_reservation.zdbs
        values.networks = reservation.data_reservation.networks
        values.kubernetes = reservation.data_reservation.kubernetes
        values.form_info = item.form_info

        this.form.setValues(values);
        this.form_info = $$("formInfo");
        this.form_info.clearAll();

        let form_list = [];
        let form_keys = Object.keys(values.form_info)
        let form_values = Object.values(values.form_info)
        for (let index = 0; index < form_keys.length; index++) {
            let form_dict = new Object();
            form_dict['key'] = form_keys[index];
            form_dict['value'] = form_values[index];
            form_list.push(form_dict)

        }
        this.form_info.parse(form_list);

        // Add networks tab content
        this.networks = $$("networks");
        this.networks.clearAll()
        this.networks.parse(values.networks);

        // Add cotainer tab content
        this.containers = $$("containers");
        this.containers.clearAll()
        this.containers.parse(values.containers);


        // Add volumes tab content
        this.volumes = $$("volumes");
        this.volumes.clearAll()
        this.volumes.parse(values.volumes);

        // Add zdb tab content
        this.zdbs = $$("zdbs");
        this.zdbs.clearAll()
        this.zdbs.parse(values.zdbs);


        // Add kubernetes tab content
        this.kubernetes = $$("kubernetes");
        this.kubernetes.clearAll()
        this.kubernetes.parse(values.kubernetes);


        this.getRoot().show();
    }
}
