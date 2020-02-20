
module.exports = new Promise(async (resolve, reject) => {
  const vuex = await import(
    "../../../web_modules/vuex/dist/vuex.esm.browser.js"
  );

  resolve({
    name: "Navigation",
    Components: {},
    computed: {
        ...vuex.mapGetters([
            'apps',
            'routes'
        ])
      //    topRoutes() {
      //      return this.routes.filter(r => r.meta.position === 'top')
      //    },
      // bottomRoutes() {
      //   return this.routes.filter(r => r.meta.position === 'bottom')
      // },
      // bottomNavApps() {
      //   return this.topRoutes.concat(this.bottomRoutes)
      // },
      // showOverlay() {
      //   var hasApps = this.apps && !!this.apps.length
      //   var isLoading = false
      //   return !hasApps && isLoading
      // }
    },
    async mounted() {
      console.log("test123");
      console.log(this.routes);
      console.log(vuex);
    }
  });
});
