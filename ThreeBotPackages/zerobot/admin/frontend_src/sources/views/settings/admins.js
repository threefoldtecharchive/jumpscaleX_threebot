import { JetView } from "webix-jet";

import { inputDialog } from "../../common/dialogs";

export default class AdminsView extends JetView {
    config() {
        var self = this;

        return {
            cols: [{
                rows: [{
                    view: "template",
                    template: "All of the following 3Bot names can access dashboard, you can add or remove them from here",
                    autoheight: true,
                }, {
                    localId: "add-admin",
                    view: "button",
                    value: "Add new administrator",
                    click: self.addAdmin.bind(self),
                }]
            }, {
                localId: "admins-table",
                view: "datatable",
                autoheight: true,
                columns: [{
                    id: "name",
                    header: [
                        "Name",
                        {
                            content: "textFilter"
                        }
                    ],
                    sort: "string",
                }, {
                    template: function (obj) {
                        return "<span class='webix_icon mdi mdi-trash-can webix_danger delete_admin'></span>";
                    }
                }],
                onClick: {
                    delete_admin: function (e, id) {
                        this.$scope.deleteAdmin(id);
                    },
                }
            }]
        }
    }

    handleResult() {

    }

    addAdmin() {
        const self = this;

        inputDialog("Add admin", "3Bot name", "Add", (input) => {
            // TODO: call actor.add
            // TODO: check if already exists (can be actor too, other session may have added or removed it)
            self.table.add({ name: input });
        });
    }

    deleteAdmin(itemId) {
        const self = this;

        const item = self.table.getItem(itemId);

        webix.confirm({
            title: "Delete admin",
            ok: "Yes",
            text: `Are you sure you want to delete "${item.name}"?`,
            cancel: "No",
        }).then(() => {
            // TODO: call actor.delete
            self.table.remove(itemId);
        });
    }

    init() {
        this.table = this.$$("admins-table");

        webix.extend(this.table, webix.ProgressBar);
    }
}
