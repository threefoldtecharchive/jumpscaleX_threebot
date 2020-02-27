import {
    JetView,
    plugins
} from "webix-jet";

export default class TopView extends JetView {
    config() {
        const header = {
            cols: [
                {
                    id: "button_hide_menu",
                    view: "icon", icon: "mdi mdi-menu",
                    css: "custom_dark", height: 58,
                    click: this.hideMenu,
                    tooltip: "Hide menu",
                },
                {
                    id: "header",
                    type: "header",
                    css: "custom_dark", height: 58,
                    template: "ADMIN",
                    borderless: true,
                },
            ]
        };

        const sidebar = {
            localId: "menu",
            view: "sidebar",
            css: "webix_dark",
            width: 200,
            data: [{
                id: "dash",
                value: "Dashboard",
                icon: "mdi mdi-view-dashboard"
            },
            {
                id: "wikis",
                value: "Wikis",
                icon: "mdi mdi-chart-areaspline"
            },
            {
                id: "alerts",
                value: "Alerts",
                icon: "mdi mdi-table"
            },
            {
                id: "logs",
                value: "Logs",
                icon: "mdi mdi-format-line-style"
            },
            {
                id: "myjobs",
                value: "Jobs",
                icon: "mdi mdi-format-line-style"
            },
            {
                id: "packages",
                value: "Packages",
                icon: "mdi mdi-format-line-style"
            },
            {
                id: "codeserver",
                value: "Codeserver",
                icon: "mdi mdi-format-line-style"
            },
            {
                id: "juypter",
                value: "Juypter",
                icon: "mdi mdi-format-line-style"
            },
            ]
        };

        const toolbar = {
            view: "toolbar",
            padding: 9,
            height: 58,
            cols: [{
                id: "button_show_menu",
                view: "icon", icon: "mdi mdi-menu",
                click: this.showMenu,
                hidden: true, // hidden by default
                tooltip: "Show menu",
            },
            {
                css: "logo"
            },
            {
                view: "icon",
                icon: "mdi mdi-bell",
                badge: "5"
            },
            {
                view: "icon",
                icon: "mdi mdi-settings"
            },
            {
                template: `<image class="mainphoto" src="data/images/morgan_yu.jpg">
                    <span class="webix_icon mdi mdi-circle status green"></span>`,
                width: 60,
                css: "avatar",
                borderless: true
            }
            ]
        };

        return {
            type: "clean",
            cols: [{
                rows: [header, sidebar]
            },
            {
                rows: [toolbar, {
                    $subview: true
                }]
            }
            ]
        };
    }

    showMenu() {
        this.$scope.menu.show();
        this.$scope.header.show();
        this.$scope.buttonHideMenu.show();

        this.$scope.buttonShowMenu.hide();
    }

    hideMenu() {
        this.$scope.menu.hide();
        this.$scope.header.hide();
        this.$scope.buttonHideMenu.hide();

        this.$scope.buttonShowMenu.show();
    }

    init() {
        this.use(plugins.Menu, "menu");
        this.menu = this.$$("menu");
        this.header = this.$$("header");

        this.buttonShowMenu = this.$$("button_show_menu");
        this.buttonHideMenu = this.$$("button_hide_menu");
    }

}
