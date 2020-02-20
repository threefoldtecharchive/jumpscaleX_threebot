module.exports = new Promise(async (resolve, reject) => {
  const vuex = await import(
    "../../../web_modules/vuex/dist/vuex.esm.browser.js"
  );

  resolve({
    name: "App",
    components: {
      navigation: "url:../Components/Navigation/index.vue"
    },
    data() {
      return{
      alreadyAddedStores: []
      }
    },
    computed: {
      ...vuex.mapGetters([
        'apps'
      ])
    },
    mounted() {
      this.getApps();
    },
    methods: {
      ...vuex.mapActions(["getApps","registerRoutes"])
    },
    watch: {
      apps(apps) {
        console.log('apps', apps)
        for (const app of apps) {
          const storeName = `${app.source.name.toLowerCase()}`;

          if (!this.alreadyAddedStores.some(x => x === storeName)) {
            this.alreadyAddedStores.push(storeName);

            import(app.store).then(store => {
              console.log(`herre`)
              this.$store.registerModule(storeName, store);
              this.registerRoutes(app)
            })
          }
        }
      }
    }
  })
})
