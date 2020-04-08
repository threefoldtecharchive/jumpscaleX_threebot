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
            cells: [
                {
                    header: "Overview",
                    body: info,
                },
                {
                    id: "networks",
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
                    },
                },
                {
                    header: "Containers",
                    body: {
                        id: "containers",
                        view: "template",
                        template: "",
                        scroll: "auto",
                    }
                },
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

        this.networks = $$("networks");
        this.networks.parse(values.networks);


        // this.networks.setHTML(`<p>${ansiUp.ansi_to_html(JSON.stringify(values.networks))}</p>`);
        // $$('networks').load("data.json", "json");

        this.getRoot().show();
    }
}
