
module.exports = new Promise(async (resolve, reject) => {
  const vuex = await import(
    "/weblibs/vuex/vuex.esm.browser.js"
  );

  resolve({
    name: "Navigation",
    Components: {},
    data() {
      return{
        alreadyAddedStores: []
      }
    },
    computed: {
      ...vuex.mapGetters([
        'apps',
        'routes'
      ]),
      topRoutes() {
        return this.routes.filter(r => r.meta.position === 'top')
      },
      bottomRoutes() {
        return this.routes.filter(r => r.meta.position === 'bottom')
      },
      bottomNavApps() {
        return this.topRoutes.concat(this.bottomRoutes)
      },
    },
    mounted() {
      this.getApps();
    },
    methods: {
      ...vuex.mapActions(['getApps', 'addRoute']),
      getAppRoutes(app) {
        return app.routes.map(route => {
          return {
            path: `/${app.source.name.toLowerCase()}${route.path}`,
            component: httpVueLoader(`${app.location}${route.component}/`),
            name: `${app.source.name.toLowerCase()}${
              route.name ? "-" + route.name : ""
            }`,
            meta: {
              ...route.meta,
              app: true,
              position: route.meta.position ? route.meta.position : "top"
            }
          };
        });
      },
      registerRoutes(app) {
        this.getAppRoutes(app).forEach(route => {
          if (!this.routes.some(r => r.name === route.name)) {
            this.addRoute(route);
            this.$router.addRoutes([route]);
          }
        });
      }
    },
    watch: {
      apps(apps) {
        for (const app of apps) {
          const storeName = `${app.source.name.toLowerCase()}`;
          if (!this.alreadyAddedStores.some(x => x === storeName)) {
            this.alreadyAddedStores.push(storeName);
            import(app.store).then(store => {
              this.$store.registerModule(storeName, store);
              this.registerRoutes(app)
            })
          }
        }
      }
    }
  });
});
