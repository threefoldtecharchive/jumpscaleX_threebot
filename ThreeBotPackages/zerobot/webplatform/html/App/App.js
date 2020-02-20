module.exports = new Promise(async (resolve, reject) => {
  const vuex = await import(
    "../../../web_modules/vuex/dist/vuex.esm.browser.js"
  );

  resolve({
    name: "App",
    components: {
      navigation: "url:../Components/Navigation/index.vue"
    },
    mounted() {
      this.getApps();
    },
    methods: {
      ...vuex.mapActions([
          'getApps'
      ])
    }
  });
});
