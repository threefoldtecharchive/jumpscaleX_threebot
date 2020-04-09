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
                    body: info,
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
                // {
                //     id: "volumes",
                //     header: "Volumes",
                //     view: "datatable",
                //     resizeColumn: true,
                //     select: true,
                //     multiselect: true,
                //     css: "webix_header_border webix_data_border",
                //     scroll: true,
                //     autoConfig: true,
                //     columns: [
                //         {
                //             id: "index",
                //             header: "#",
                //             sort: "int",
                //             autowidth: true,
                //             width: 60
                //         }, {
                //             id: "node_id",
                //             header: "Node id",
                //             sort: "string",
                //             autowidth: true,
                //             width: 180
                //         }, {
                //             id: "size",
                //             header: "Size",
                //             sort: "string",
                //             autowidth: true,
                //             width: 180
                //         }, {
                //             id: "type",
                //             header: "Type",
                //             sort: "string",
                //             autowidth: true,
                //             width: 180
                //         }, {
                //             id: "farmer_tid",
                //             header: "Farmer_tid",
                //             sort: "string",
                //             autowidth: true,
                //             width: 180
                //         },

                //     ],
                //     scheme: {
                //         $init: function (obj) {
                //             obj.node_id = obj.node_id;
                //             obj.size = obj.size;
                //             obj.type = obj.type;
                //             obj.farmer_tid = obj.farmer_tid;
                //             obj.index = this.count();
                //         }
                //     }, on: {
                //         onAfterLoad: function () {
                //             if (!this.count())
                //                 this.showOverlay("No volumes in reservation");
                //             else
                //                 this.hideOverlay();
                //         }
                //     }
                // },
                {
                    header: "Volumes",
                    body: {
                        id: "volumes",
                        view: "template",
                        template: "",
                        scroll: "auto",
                    }
                },
                {
                    header: "Zdbs",
                    body: {
                        id: "zdbs",
                        view: "template",
                        template: "",
                        scroll: "auto",
                    }
                },
                {
                    header: "Kubernetes",
                    body: {
                        id: "kubernetes",
                        view: "template",
                        template: "",
                        scroll: "auto",
                    }
                },

            ]
        };

        return {
            view: "window",
            head: "Reservation",
            id: "reservation_view",
            modal: true,
            width: 600,
            height: 800,
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

        this.form.setValues(values);

        // Add networks tab content
        this.networks = $$("networks");
        this.networks.parse(values.networks);

        // Add cotainer tab content
        this.containers = $$("containers");
        this.containers.parse(values.containers);


        // Add volumes tab content
        this.volumes = $$("volumes");
        // this.volumes.parse(values.volumes);
        if (values.volumes.length !== 0) {
            this.volumes.setHTML(`<p>
<pre class="prettyprint">
${JSON.stringify(values.volumes, undefined, 4)}
</pre>
)}</p>`);
        } else {
            this.volumes.setHTML(`<p>No volumes in reservation</p>`);
        }

        // Add zdb tab content
        this.zdbs = $$("zdbs");
        if (values.zdbs.length !== 0) {
            this.zdbs.setHTML(`<p>
<pre class="prettyprint">
${JSON.stringify(values.zdbs, undefined, 4)}
</pre>
)}</p>`);
        } else {
            this.zdbs.setHTML(`<p>No zdbs in reservation</p>`);
        }

        // Add kubernetes tab content
        this.kubernetes = $$("kubernetes");
        if (values.kubernetes.length !== 0) {
            this.kubernetes.setHTML(`<p>
<pre class="prettyprint">
${JSON.stringify(values.kubernetes, undefined, 4)}
</pre>
)}</p > `);
        } else {
            this.kubernetes.setHTML(`<p>No kubernetes in reservation</p>`);
        }

        this.getRoot().show();
    }
}
