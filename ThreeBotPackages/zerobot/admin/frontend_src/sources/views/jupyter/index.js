import {
    JetView
} from "webix-jet";

export default class JupyterView extends JetView {
    config() {
        const view = {
            rows: [{
                view: "template",
                type: "header",
                template: "Jupyter",
            },
            {
                view: "template",
                template: "2nd row",
            },
            {
                cols: [{
                    view: "template",
                    template: "1st col",
                },
                {
                    view: "template",
                    template: "2nd col",
                },
                {
                    rows: [{
                        view: "list",
                        id: "mylist",
                        template: "#id# - #title#",
                        data: [{
                            id: 1,
                            title: "Item 1"
                        },
                        {
                            id: 2,
                            title: "Item 2"
                        },
                        {
                            id: 3,
                            title: "Item 3"
                        }
                        ]
                    },
                    {
                        view: "button",
                        value: "add",
                        click: function () {
                            this.$scope.addToList();
                        }
                    }
                    ]
                }
                ]
            }
            ]
        };

        return view;
    }

    addToList() {
        this.mylist.add({
            id: 5,
            title: "hamada"
        }, 0);
    }

    init(view) {
        this.mylist = $$("mylist");
    }
}
