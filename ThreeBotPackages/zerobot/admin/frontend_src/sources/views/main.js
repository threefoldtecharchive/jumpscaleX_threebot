import { JetView, plugins } from "webix-jet";
import { auth } from "../services/auth";


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

        const sidebarData = [{
            id: "dash",
            value: "Dashboard",
            icon: "mdi mdi-view-dashboard"
        },
        {
            id: "wikis",
            value: "Packages Docs",
            icon: "mdi mdi-newspaper"
        },
        {
            id: "alerts",
            value: "Alerts",
            icon: "mdi mdi-bell-alert"
        },
        {
            id: "logs",
            value: "Logs",
            icon: "mdi mdi-history"
        },
        {
            id: "myjobs_main",
            value: "My jobs",
            icon: "mdi mdi-animation-play",
            data: [{
                id: "myjobs",
                icon: "mdi mdi-book-open",
                value: "Jobs"
            }, {
                id: "workers",
                icon: "mdi mdi-worker",
                value: "Workers"
            }]
        },
        {
            id: "tfwikis_main",
            value: "TF Wikis",
            icon: "mdi mdi-animation-play",
            data: [{
                id: "tfgridsdk",
                icon: "mdi mdi-book-open",
                value: "TFGridSDK"
            }, {
                id: "threefold",
                icon: "mdi mdi-worker",
                value: "Threefold"
            }]
        },

        {
            id: "packages",
            value: "Packages",
            icon: "mdi mdi-package"
        },
        {
            id: "deployedSolutions",
            value: "Deployed Solutions",
            icon: "mdi mdi-animation-play",
            data: [{
                id: "deployed_network",
                value: '<span><img class="solutions-icon" src="static/img/network.png"/>Network</span>'
            }, {
                id: "deployed_ubuntu",
                value: '<span><img class="solutions-icon" src="static/img/ubuntu.png"/>Ubuntu</span>'
            }, {
                id: "deployed_flist",
                value: '<span><img class="solutions-icon" src="static/img/flist.png"/>Generic flist</span>'
            }, {
                id: "deployed_minio",
                value: '<span><img class="solutions-icon" src="static/img/minio.png"/>Minio / S3</span>'
            }, {
                id: "deployed_k8s_cluster",
                value: '<span><img class="solutions-icon" src="static/img/k8s.png"/>Kubernetes Cluster</span>'
            } , {
                id: "deployed_domain_delegation",
                value: 'Domain Delegation',
                icon: 'mdi mdi-dns'
            }, {
                id: "deployed_solution_expose",
                value: 'Solution expose',
                icon: 'mdi mdi-wan'
            }, {
                id: "deployed_gateway_4to6",
                value: '4 to 6 Gateway',
                icon: 'mdi mdi-ip-network'
            }
            ]
        },
        {
            id: "walletsManager",
            value: "Wallets Manager",
            icon: "mdi mdi-wallet"
        },
        {
            id: "capacity",
            value: "Capacity",
            icon: "mdi mdi-server"
        },
        {
            id: "farmmanagement",
            value: "Farm Management",
            icon: "mdi mdi-server"
        },
        {
            id: "sdkexamples",
            value: "SDK Examples",
            icon: "mdi mdi-file"
        },
        {
            id: "codeserver",
            value: "Codeserver",
            icon: "mdi mdi-code-tags"
        },
        {
            id: "jupyter",
            value: "TF Simulator",
            icon: "mdi mdi-play"
        },
        {
            id: "settings",
            value: "Settings",
            icon: "mdi mdi-settings"
        },
        ]

        const response = webix.ajax().sync().get("/zerobot/admin/actors/package_manager/packages_list", { has_frontend_args: true, status: "installed" });
        let packages;

        try {
            packages = JSON.parse(response.responseText).packages;
        } catch (error) {
            packages = [];
        }

        for (const p of packages) {
            sidebarData.push(p.frontend_args);
        }

        const sidebar = {
            localId: "menu",
            view: "sidebar",
            css: "webix_dark",
            width: 200,
            data: sidebarData,
        };

        const toolbar = {
            view: "toolbar",
            padding: 9,
            height: 58,
            cols: [{
                id: "button_show_menu",
                view: "icon",
                icon: "mdi mdi-menu",
                click: this.showMenu,
                hidden: true, // hidden by default
                tooltip: "Show menu",
            },
            {
                view: "template",
                template: `<img class="webix_icon" src="static/img/3bot.png"/>`,
                borderless: true,
                height: 40,
            },
            {
                id: "username_label",
                view: "label",
                label: "username",
                borderless: true,
                align: "right",
            },
            {
                id: "user_icon",
                view: "icon",
                icon: "mdi mdi-account-circle",
                borderless: true,
                popup: "user_menu"
            }
            ]
        };

        return {
            type: "clean",
            cols: [{
                rows: [header, sidebar]
            },
            {
                rows: [
                    toolbar,
                    {
                        $subview: true
                    }
                ]
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
        var self = this;

        this.use(plugins.Menu, {
            id: "menu",
            urls: {
                myjobs: "myjobs.jobs",
                workers: "myjobs.workers",
                tfgridsdk: "tfwikis.tfgridsdk",
                threefold: "tfwikis.threefold",
                threebot: "solutions.chatflow?author=tfgrid&package=threebot_provisioning&chat=threebot_reservation",
                deployed_network:"deployedSolutions.network",
                deployed_ubuntu:"deployedSolutions.ubuntu",
                deployed_flist:"deployedSolutions.flist",
                deployed_minio:"deployedSolutions.minio",
                deployed_k8s_cluster:"deployedSolutions.k8s_cluster",
                deployed_domain_delegation:"solutions.chatflow?author=tfgrid_solutions&package=tfgrid_solutions&chat=domain_delegation",
                deployed_solution_expose:"solutions.chatflow?author=tfgrid_solutions&package=tfgrid_solutions&chat=solution_expose",
                deployed_gateway_4to6:"solutions.chatflow?author=tfgrid_solutions&package=tfgrid_solutions&chat=four_to_six_gateway"
            }
        });

        this.menu = this.$$("menu");
        this.header = this.$$("header");

        this.buttonShowMenu = this.$$("button_show_menu");
        this.buttonHideMenu = this.$$("button_hide_menu");


        this.webix.ui({
            view: "submenu",
            id: "user_menu",
            autowidth: true,
            data: []
        });

        this.userMenu = $$("user_menu");
        this.userMenu.attachEvent("onItemClick", function (id, e, node) {
            if (id == "logout") {
                auth.logout();
            }
        });

        this.usernameLabel = $$("username_label");

        auth.getCurrentUser().then(data => {
            const info = data.json()
            let username = info.username;

            if (info.devmode) {
                username += " [development]"
            }

            self.usernameLabel.config.label = username;
            self.usernameLabel.config.width = webix.html.getTextSize(username) + 10;
            self.usernameLabel.refresh();

            self.userMenu.add({ id: 'email', value: info.email })
            self.userMenu.add({ id: 'logout', value: "Logout" })
        }).catch(() => {
            auth.logout();
        });
    }

}
