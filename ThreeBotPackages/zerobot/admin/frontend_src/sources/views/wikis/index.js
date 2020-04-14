import { JetView } from "webix-jet";
import { packages } from "../../services/packages";

export default class WikisView extends JetView {
    config() {
        const view = {
            view: "datatable",
            id: "wikis_table",
            resizeColumn: true,
            select: true,
            multiselect: true,
            css: "webix_header_border webix_data_border",
            columns: [{
                id: "index",
                header: "#",
                sort: "int",
                autowidth: true,
            },
            {
                id: "name",
                header: "Package",
                sort: "string",
                width: 300
            },
            {
                id: "actions",
                header: "Actions",
                sort: "string",
                width: 200,
                template:function(obj){ 
                    return "<div class='webix_el_button'><button class='btn_view'> View </button></div>";
                },
            }],
            onClick:{
                btn_view:function(ev, id){
                    var item = this.getItem(id);
                    window.open(`/wiki/${item.name}`)
                }
              },
            autoConfig: true,
            scheme: {
                $init: function (obj) {
                    obj.index = this.count();
                }
            },
        };

        return view;
    }

    init(view) {
        packages.list().then(data => {
            view.parse(data.json().packages)
        });
    }
}
